class Player {
    constructor(player) {
        this.x = player.x*resolutionMultipleX;
        this.y = player.y*resolutionMultipleY;
        this.id = player.id;
        this.rgb = player.rgb;
        this.health = player.health;
        this.bDead = player.bDead;
        this.score = player.score;
        this.direction = player.direction + Math.PI / 2;
        this.shotsMade = player.shotsMade;
        this.shotsFired = player.shotsMade;
        this.drawManager = new DrawManager();
        this.size = this.drawManager.getAdjustedSize(player.size);
        this.drawManager.uploadAnimation('playerFire', playerFireAnim, 0.005, false);
        this.drawManager.uploadAnimation('playerDead', deadPlayerAnim, 0.02, false);
        this.shotFiredSounds = 0;

    }

    modify = (player) => {
        this.health = player.health;
        if(player.bDead !== this.bDead) {
            this.drawManager.startAnimation('playerDead');
            dyingManSound.play();
        }
        this.bDead = player.bDead;
        this.x = player.x*resolutionMultipleX;
        this.y = player.y*resolutionMultipleY;
        this.score = player.score;
        this.size = this.drawManager.getAdjustedSize(player.size);
        this.direction = player.direction + Math.PI / 2;
        this.shotsMade = player.shotsMade;
    };

    getX = () =>  {
        return this.x;
    };

    getY = () =>  {
        return this.y;
    };

    getScore = () =>  {
        return this.score;
    };

    getColor = () =>  {
        return this.rgb;
    };

    drawHealthBar = () => {
        fill(0,0,0);
        rect(this.x - 25, this.y + 30, 50, 5);
        fill(255, 0, 0);
        rect(this.x - 25, this.y + 30, this.health / 2, 5);
    };

    draw = () =>  {
        if(!this.bDead) {
            this.drawManager.putImageWithDirection(playerSkin, [this.x, this.y], this.direction,  this.size);

            if(this.shotsMade > this.shotsFired && this.shotsMade > this.shotFiredSounds) {
                this.drawManager.startAnimation("playerFire");
                gunSound.play();
                this.shotFiredSounds++;
            }
            if(this.shotsMade > this.shotsFired && this.drawManager.getIsAcriveAnimations("playerFire")) {
                this.drawManager.putAnimationWithDirection("playerFire", [this.x, this.y], this.direction , this.size);
            } else if(this.shotsMade > this.shotsFired) {
                this.shotsFired += 1;
            }
            this.drawHealthBar();
        } else {
            if(this.drawManager.getIsAcriveAnimations('playerDead')) {
                this.drawManager.putAnimationWithDirection('playerDead', [this.x, this.y], this.direction , this.size)
            } else {
                this.drawManager.putImageWithDirection(deadPlayerSkin, [this.x, this.y], this.direction, this.size);
            }
        }
    };
}