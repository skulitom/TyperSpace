let TypeInput = require('./TypeInput');
const gameConsts = require('./constants/GameConstants');

class Player {
    constructor(id, position, side, tManager) {
        this.x = position[0];
        this.y = position[1];
        this.id = id;
        this.health = gameConsts.MAX_HEALTH;
        this.typeInput = new TypeInput(side, tManager, id);
        this.bDead = false;
        this.score = 0;
        this.size = 25;
        this.direction = 3;
        this.shotsMade = 0;
        this.side = side;

        this.rgb = gameConsts.PLAYER_SIDE_COLOR[side];
    }

    updatePosition = (position) => {
        this.x = position[0];
        this.y = position[1];
    };

    getIsDead = () => {
        return this.bDead;
    };

    shoot = () => {
        this.shotsMade+=1;
    };

    getId = () =>  {
        return this.id;
    };

    getScore = () => {
        return this.score;
    };

    getSide = () => {
        return this.side;
    };

    getColor = () =>  {
        return this.rgb;
    };

    rotate = (enemyX, enemyY) => {
        this.direction = Math.atan2(enemyY - this.y, enemyX - this.x);
    };

    registerKill = (level) => {
        if(this.score+level<=0){
            this.score = 0;
            return;
        }
        this.score += level;
    };

    hit = (damage) => {
        if(this.health<=damage){
            this.health=0;
            this.bDead = true;
        } else {
            this.health-=damage;
        }
    };

    setKey = (key) => {
        if(!this.bDead) {
            return this.typeInput.updateInKey(key);
        } else {
            return 'player dead';
        }
    };

}

module.exports = Player;