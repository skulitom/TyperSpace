class EffectsManager {
    constructor() {
        this.explosionEffectsPool = [];
    }

    createExplosion = (x, y, color, startSize) => {
        let newExplosion = new Explosion(x, y, color, startSize);
        this.explosionEffectsPool.push(newExplosion);
        //console.log(startSize);
    };

    update = () => {
        for (let explId = this.explosionEffectsPool.length - 1; explId >= 0; explId = explId - 1) {
            const needDestroy = this.explosionEffectsPool[explId].update();
            if (needDestroy) {
                this.explosionEffectsPool.splice(explId);  
            } 
        }

    };

    draw = () => {
        for (let explosion of this.explosionEffectsPool) {
            explosion.draw();    
        }

    };
  
}