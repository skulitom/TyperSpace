const consts = require('./constants/EnemyConstants');
let Typeble = require('./Typeble');
const gameConsts = require('./constants/GameConstants');

class Enemy extends Typeble {
    constructor(id, player) {
        super(id);
        this.size = 15;
        this.setRandomPositionOnTheEdge();
        this.words = consts.CHARACTERS.charAt(Math.floor(Math.random() * consts.CHARACTERS.length));
        this.speed = gameConsts.ENEMY_SPEED;
        this.typedWords = "";
        this.bDead = false;
        this.inHitArea = false;
        this.hitPower = 1;
        this.playerX = player.x;
        this.playerY = player.y;
        this.playerId = player.id;
        this.rotate();
        this.speedTop = this.speed;
        this.texture = 'frodo';
        this.fillRGB = gameConsts.RED;
        this.rgb = gameConsts.RED;
        this.inBirth = false;
    }

    setRandomPositionOnTheEdge = () => {
        let random = Math.random();
        if(random <= 0.25){
            this.x = 0 - this.size;
            this.y = Math.random()*gameConsts.GAME_HEIGHT + 1;
        } else if(random <= 0.5) {
            this.x = gameConsts.GAME_WIDTH + 1 + this.size;
            this.y = Math.random()* gameConsts.GAME_HEIGHT + 1;
        } else if(random <= 0.75) {
            this.y = 0 - this.size;
            this.x = Math.random()*gameConsts.GAME_WIDTH +1;
        } else {
            this.y = gameConsts.GAME_HEIGHT + 1 + this.size;
            this.x = Math.random()*gameConsts.GAME_WIDTH +1;
        }
    };

    updatePlayer = (player) => {
        this.playerX = player.x;
        this.playerY = player.y;
        this.playerId = player.id;
        this.rotate()
    };

    getX = () => {
        return this.x;
    };

    setSpeed = (speed) => {
        this.speed = speed;
    };

    setPosition = (position) => {
        this.x = position[0];
        this.y = position[1];
        this.rotate();
    };

    getY = () => {
      return this.y;
    };

    rotate = () => {
        this.direction = Math.atan2(this.playerY - this.y, this.playerX - this.x);
        this.direction += Math.PI/2;
    };

    getPlayerId = () =>  {
        return this.playerId;
    };

    getSpeed = () =>  {
        return this.speed;
    };

    getIsInHitArea = () =>  {
        return this.inHitArea;
    };

    getHitPower = () =>  {
        return this.hitPower;
    };

    getIsDead = () => {
        return this.bDead;
    };

    update = () => {
        if(this.bDead) {
            return;
        }

        if(this.speedTop >= this.speed) {
            this.speed+=0.1;
        }

        if(Math.abs(this.playerY-this.y) < gameConsts.PLAYER_HIT_RADIUS && Math.abs(this.playerX-this.x) < gameConsts.PLAYER_HIT_RADIUS) {
            this.inHitArea = true;
        } else {
            const rotation = Math.atan2(this.playerY - this.y, this.playerX - this.x);
            this.x += Math.cos(rotation) * this.speed;
            this.y += Math.sin(rotation) * this.speed;
        }
    };

    destroy() {
        super.destroy();
        this.killEnemy();
    }

    kill = (killer) => {
        super.kill(killer);
        this.killEnemy();
    };

    killEnemy = () => {
        this.bDead = true;
        this.speed = 0;
        this.hitPower = 0;
        this.inHitArea = false;
    };
}

module.exports = Enemy;