const consts = require('./constants/LootConstants');
let Typeble = require('./Typeble');
const gameConsts = require('./constants/GameConstants');

class Loot extends Typeble {
    constructor(id, enemies) {
        super(id);
        this.y = Math.random()*gameConsts.GAME_HEIGHT;
        this.x = Math.random()*gameConsts.GAME_WIDTH;
        this.words = consts.CHARACTERS.charAt(Math.floor(Math.random() * consts.CHARACTERS.length));
        this.isOpen = false;
        this.toExplode = false;
        this.size = 20;
        this.radius = gameConsts.EXPLOSION_RADIUS;
        this.fillRGB = gameConsts.YELLOW;
        this.rgb = gameConsts.YELLOW;
        this.killerColor = gameConsts.RED;
        enemies.forEach(enemy => {
            if(Math.abs(enemy.getX()-this.x)< this.size*2 && Math.abs(enemy.getY()-this.y)< this.size*2) {
                enemy.destroy();
            }
        });
    }

    getToExplode = () => {
        return this.toExplode;
    };

    explode = (enemies) => {
        enemies.forEach(enemy => {
            if(Math.abs(enemy.getX()-this.x)< this.radius && Math.abs(enemy.getY()-this.y)< this.radius) {
                enemy.destroy();
            }
        });
        this.toExplode = false;
    };

    kill = (killer) => {
        this.isOpen = true;
        this.toExplode = true;
    };
}

module.exports = Loot;