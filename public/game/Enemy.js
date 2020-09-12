class Enemy {
    constructor(enemy, fxManager) {
        this.id = enemy.id;
        this.drawManager = new DrawManager();
        this.modifyComonParameters(enemy);
        this.rgb = enemy.rgb;
        this.words = enemy.words;
        this.bDead = enemy.bDead;
        this.shot = false;
        this.texture = enemy.texture;
        this.drawManager.uploadAnimation('move', frodoMove, 0.01, true, true);
        this.drawManager.uploadAnimation('dead', frodoDead1, 0.01, false, false);
    }

    modify = (enemy) => {
        if(this.typedWords.length < enemy.typedWords.length) {
            this.shot = true;
            if(!enemy.bDead) {
                enemyHitSound.play();
            }
        }
        if (enemy.bDead && !this.bDead) {
            this.bDead = enemy.bDead;
            enemySplatSound.play();
            this.drawManager.startAnimation('dead');
        }
        this.modifyComonParameters(enemy);
    };

    modifyComonParameters = (enemy) => {
        this.size = this.drawManager.getAdjustedSize(enemy.size);
        this.typedWords = enemy.typedWords;
        this.fillRGB = enemy.fillRGB;
        this.speed = enemy.speed;
        this.x = enemy.x*resolutionMultipleX;
        this.y = enemy.y*resolutionMultipleY;
        this.killerColor = enemy.killerColor;
        this.direction = enemy.direction;
    };

    getId = () =>  {
        return this.id;
    };

    getWords = () =>  {
        return this.words;
    };

    update = () =>  {
        if (this.shot) {
            this.shot = false;
        }
    };
  
    drawBody = () => {
        if(this.bDead) {
            return;
        }
        this.drawManager.putAnimationWithDirection('move', [this.x, this.y], this.direction, this.size);
    
    };

    drawDead = () => {
        if(!this.bDead) {
            return;
        }
        if(this.drawManager.getIsAcriveAnimations('dead')) {
            this.drawManager.putAnimationWithDirection('dead', [this.x, this.y], this.direction, this.size);
        } else {
            this.drawManager.putImageWithDirection(frodoDeadImg,[this.x, this.y], this.direction, this.size);
        }
    };
    
    drawUI = () => {

        if (this.bDead) {
            return;
        }
        textFont(fontOxygenMono);
        this.drawManager.putInputText(this.words, this.typedWords, [this.x, this.y], this.size, this.fillRGB);
    };
  
}