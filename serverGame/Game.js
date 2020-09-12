let Player = require('./Player');
let Enemy = require('./Enemy');
let Loot = require('./Loot');
let BossEnemy = require('./BossEnemy');
let TypeManager = require('./TypeManager');
const shortid = require('shortid');
const typingConsts = require('./constants/TypingConstants');
const gameConsts = require('./constants/GameConstants');

class Game {
    constructor() {
        this.players = [];
        this.enemies = [];
        this.loot = [];
        this.tManager = new TypeManager();
        this.timer = 0;
        this.freqCoef = gameConsts.INITIAL_FREQUENCY;
        this.gameOver = false;
        this.winner = 1;
        this.gameMap = "Green Desert";
    }

    onKey = (id, key) => {
        const playerIndex = this.players.findIndex(player => player.id === id);
        if (playerIndex === -1) {
            return "err";
        }
        this.players[playerIndex].shoot();
        const result = this.players[playerIndex].setKey(key);
        switch(result) {
            case typingConsts.TM_TYPING_FULLMATCH:
                this.players[playerIndex].registerKill(gameConsts.POINTS_ENEMY_KILLED);
                break;
            case typingConsts.TM_TYPING_PARTMATCH:
                this.players[playerIndex].registerKill(gameConsts.POINTS_ENEMY_INJURED);
                break;
            case typingConsts.TM_TYPING_TYPO:
                this.players[playerIndex].registerKill(gameConsts.POINTS_ENEMY_MISSED);
                break;
            case typingConsts.TM_TYPING_TYPO_RESET:
                this.players[playerIndex].registerKill(gameConsts.POINTS_ENEMY_MISSED_RESET);
                break;
            case typingConsts.TM_TYPING_TYPO_NO_MATCH:
                this.players[playerIndex].registerKill(gameConsts.POINTS_NOBODY_HIT);
                break;
        }
    };

    determineWinner = () => {
        const playerWinner = this.players.reduce((prevPlayer, curPlayer) => {
            return prevPlayer.getScore() > curPlayer.getScore() ? prevPlayer : curPlayer;
        });

        this.winner = playerWinner.getSide() + 1;
    };

    removePlayer = (id) => {
        this.players = this.players.filter(player => player.id !== id);
        this.shiftPlayers();
        this.enemies.forEach(enemy => enemy.updatePlayer(this.getRandomItem(this.players)));
    };

    shiftPlayers = () => {
        switch (this.players.length) {
            case 1:
                this.players[0].updatePosition(gameConsts.SINGLE_PLAYER_POSITION);
                break;
            case 2:
                this.players[0].updatePosition(gameConsts.PLAYER_POSITIONS_2[0]);
                this.players[1].updatePosition(gameConsts.PLAYER_POSITIONS_2[1]);
                break;
            case 3:
                this.players[0].updatePosition(gameConsts.PLAYER_POSITIONS_3[0]);
                this.players[1].updatePosition(gameConsts.PLAYER_POSITIONS_3[1]);
                this.players[2].updatePosition(gameConsts.PLAYER_POSITIONS_3[2]);
                break;
            case 4:
                this.players[0].updatePosition(gameConsts.PLAYER_POSITIONS_4[0]);
                this.players[1].updatePosition(gameConsts.PLAYER_POSITIONS_4[1]);
                this.players[2].updatePosition(gameConsts.PLAYER_POSITIONS_4[2]);
                this.players[3].updatePosition(gameConsts.PLAYER_POSITIONS_4[3]);
                break;
        }
    };

    addPlayer = (id) => {
        let newPlayer = new Player(id, gameConsts.SINGLE_PLAYER_POSITION, this.players.length, this.tManager);
        this.tManager.registerPlayer(newPlayer);
        this.players.push(newPlayer);
        this.shiftPlayers();
        this.enemies.forEach(enemy => enemy.updatePlayer(this.getRandomItem(this.players)));
    };

    addLoot = () => {
        let newLoot = new Loot(shortid.generate(), this.enemies);
        this.loot.push(newLoot);
        this.tManager.registerTypeble(newLoot);
    };

    addEnemy = () => {
        let enemy = new Enemy(shortid.generate(), this.getRandomItem(this.players));
        this.enemies.push(enemy);
        this.tManager.registerTypeble(enemy);
        return enemy;
    };

    addBossEnemy = () => {
        let enemy = new BossEnemy(shortid.generate(), this.getRandomItem(this.players));
        this.enemies.push(enemy);
        this.tManager.registerTypeble(enemy);
    };

    updateFrequencyCoef = () => {
        if(this.freqCoef<=gameConsts.LOWEST_FREQUENCY){
            this.freqCoef=gameConsts.LOWEST_FREQUENCY;
        } else {
            this.freqCoef-=gameConsts.FREQUENCY_STEP;
            if(this.freqCoef <= gameConsts.LOWEST_FREQUENCY) {
                this.freqCoef = gameConsts.LOWEST_FREQUENCY;
            }
        }
    };

    distributeDamage = (enemy) => {
        if(this.isTimeTo(gameConsts.DAMAGE_COEF)) {
            if(enemy.getIsInHitArea()){
                this.players.forEach(player => {
                    if(player.id === enemy.getPlayerId()){
                        player.hit(enemy.getHitPower());
                    }
                });
            }
        }
    };

    getEmitable = () => {
        return {
            'players': this.players,
            'enemies': this.enemies,
            'loot': this.loot,
            'gamestatus': this.gameOver,
            'gamemap': this.gameMap,
            'winner': this.winner
        }
    };

    updateEnemies = () => {
        this.enemies.forEach((enemy) => {
            if(!this.enemyHasPlayer(enemy) && !this.gameOver){
                enemy.updatePlayer(this.getRandomItem(this.players));
            }
            enemy.update();
            this.distributeDamage(enemy);
        });
    };

    enemyHasPlayer = (enemy) => {
        let enemyHasPlayer = false;
        this.players.forEach(player => {
            if(player.getId() === enemy.getPlayerId()){
                if(!player.getIsDead()) {
                    enemyHasPlayer = true;
                }
            }
        });
        return enemyHasPlayer;
    };

    updateLoot = () => {
        this.loot.forEach((lootLoc) => {
            if(lootLoc.getToExplode()){
                lootLoc.explode(this.enemies);
            }
        });
    };

    isCreationTime = (coef) => {
        return this.isTimeTo(this.freqCoef * coef);
    };

    isTimeTo = (coef) => {
        return Math.floor(this.timer % coef) === 0;
    };

    getIsAllDead = () => {
        let allDead = true;
        this.players.forEach(player => {
            if(!player.getIsDead()){
                allDead = false;
            }
        });
        return allDead;
    };

    updateNPCs = () => {
        this.createBossEnemiesIfTime();
        this.createLootIfTime();
        this.updateLoot();
        this.updateEnemies();
        this.createEnemiesIfTime();
    };

    createBossEnemiesIfTime = () => {
        if (this.isCreationTime(gameConsts.BOSS_ENEMY_COEF)) {
            this.addBossEnemy();
            this.updateFrequencyCoef();
        }
    };

    createLootIfTime = () => {
        if(this.isCreationTime(gameConsts.LOOT_COEF)) {
            this.addLoot();
        }
    };

    createEnemiesIfTime = () => {
        if (this.isCreationTime(gameConsts.ENEMY_COEF)) {
            this.enemies.forEach(enemy => {
                if(enemy instanceof BossEnemy) {
                    enemy.giveBirth(this.addEnemy());
                }
            });
            this.addEnemy();
        }
    };

    update = () => {
        this.timer++;
        if (this.players[0]) {
            const allDead = this.getIsAllDead();
            if(allDead){
                this.gameOver = true;
                this.determineWinner();
            }
            this.updateNPCs();
        }
        if (this.timer > gameConsts.MAX_TIME) {
            this.timer -= gameConsts.MAX_TIME;
        }
    };

    getRandomItem = (arrayOfItems) => {
        return arrayOfItems[Math.floor(Math.random() * arrayOfItems.length)];
    };
}

module.exports = Game;