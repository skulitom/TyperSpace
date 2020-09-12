class DrawManager {

    constructor() {
        this.animations = new Map();
    }

    uploadAnimation = (key, animationFrames, frameDelay, bloop = false, bStart = false) => {
        let newAnimation = new AnimationPack(animationFrames, frameDelay, bloop);
        this.animations.set(key, newAnimation);
        if (bStart) {
            newAnimation.startAnim();
        }
    };

    startAnimation = (key) => {
        this.animations.get(key).startAnim();
    };

    stopAnimation = (key) => {
        this.animations.get(key).stopAnim();
    };

    putImage = (img, position, size) => {
        imageMode(CENTER);
        image(img, position[0], position[1], size*IMAGE_RATIO, size*IMAGE_RATIO);
        imageMode(CORNER);
    };

    putImageWithDirection = (img, position, direction, size) => {
        imageMode(CENTER);
        translate(...position);
        rotate(direction);
        image(img, 0, 0, size*IMAGE_RATIO, size*IMAGE_RATIO);
        rotate(-direction);
        translate(...position.map(x => -x));
        imageMode(CORNER);
    };

    getIsAcriveAnimations = (key) => {
        return this.animations.get(key).getActive();
    };

    getAdjustedSize = (size) => {
        return size*((resolutionMultipleX + resolutionMultipleY)/2);
    };

    putInputText = (words, typedWords, position, size, fillRGB) => {
        textSize(16);
        textAlign(LEFT, TOP);
        strokeWeight(2);
        stroke(51);
        fill(255, 255, 255);
        rect(position[0] - words.length*2 -8, position[1] +5+ size, words.length*14 + 10, 20);
        strokeWeight(1);

        fill(0, 0, 0);
        text(words, position[0] - 5, position[1] +5+ size);
        fill(fillRGB.r, fillRGB.g, fillRGB.b);
        text(typedWords, position[0] - 5, position[1] +5+ size);
    };

    putAnimation = (key, position, size) => {
        const animationToDisplay = this.animations.get(key);
        if(animationToDisplay) {
            imageMode(CENTER);
            animationToDisplay.render({ x: position[0], y: position[1] }, { x: size*IMAGE_RATIO, y: size*IMAGE_RATIO });
            imageMode(CORNER);
        } else {
            console.log("Wrong Animation Key!!");
        }
    };

    putAnimationWithDirection = (key, position, direction, size) => {
        const animationToDisplay = this.animations.get(key);
        if(animationToDisplay) {
            imageMode(CENTER);
            translate(...position);
            rotate(direction);
            animationToDisplay.render({ x: 0, y: 0 }, { x: size*IMAGE_RATIO, y: size*IMAGE_RATIO });
            rotate(-direction);
            translate(...position.map(x => -x));
            imageMode(CORNER);
        } else {
            console.log("Wrong Animation Key!!");
        }
    };

}