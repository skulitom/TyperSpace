class Loot {
    constructor(loot) {
        this.id = loot.id;
        this.drawManager = new DrawManager();
        this.modifyCommonParameters(loot);
        this.rgb = loot.rgb;
        this.words = loot.words;
        this.radius = loot.radius;
        this.timer = 0;
        this.drawManager.uploadAnimation('rocketLand', rocketAnimation, 0.032, false);
        this.drawManager.startAnimation('rocketLand');
        landingRocketSound.play();
        this.drawManager.uploadAnimation('rocketExplode',rocketExplodeAnim, 0.02, false);
    }

    modify = (loot) => {
        if(this.isOpen !== loot.isOpen) {
            explosionSound.play();
            this.drawManager.startAnimation('rocketExplode');
        }
        this.modifyCommonParameters(loot);
    };

    modifyCommonParameters = (loot) => {
        this.x = loot.x*resolutionMultipleX;
        this.y = loot.y*resolutionMultipleY;
        this.size = this.drawManager.getAdjustedSize(loot.size);
        this.typedWords = loot.typedWords;
        this.fillRGB = loot.fillRGB;
        this.isOpen = loot.isOpen;
        this.killerColor = loot.killerColor;
    };

    getId = () =>  {
        return this.id;
    };

    getWords = () =>  {
        return this.words;
    };

    setTypedText = (text) => {
        this.typedWords = text;
    };

    drawBody = () => {
        if (!this.isOpen) {
            if (this.drawManager.getIsAcriveAnimations('rocketLand')) {
                this.drawManager.putAnimation('rocketLand', [this.x, this.y], this.size*3);
            } else {
                this.drawManager.putImage(rocketSkin, [this.x, this.y], this.size*3);
            }
        } else {
            if(this.drawManager.getIsAcriveAnimations('rocketExplode')) {
                this.drawManager.putAnimation('rocketExplode', [this.x, this.y], this.size*6);
            }
        }
    };

    drawUI = () =>  {
        if (this.isOpen || this.drawManager.getIsAcriveAnimations('rocketLand')) {
            return;
        }
        textFont(fontOxygenMono);
        this.drawManager.putInputText(this.words, this.typedWords,[this.x, this.y], this.size, this.fillRGB);
    };

}