let playerSkin;
let deadPlayerSkin;
let deadPlayerAnim;
let rocketSkin;
let rocketExplodeAnim;
let themeSound;
let tracer;
let bg;
let frodo;
let frodoMove;
let frodoDead1;
let frodoDeadImg;
let enemyHitSound;
let gunSound;
let explosionSound;
let enemySplatSound;
let dyingManSound;
let landingRocketSound;
let testAnimation;
let fontNeucha;
let fontOxygenMono;
let playerFireAnim;
let rocketAnimation;
let currentLoadedAssets = 0;
const NUMBER_OF_ASSETS = 13;

adjustSounds = () => {
    themeSound.setVolume(0.2*(soundLevel/100));
    gunSound.setVolume(0.1*(soundLevel/100));
    explosionSound.setVolume(0.1*(soundLevel/100));
    enemySplatSound.setVolume(0.2*(soundLevel/100));
    dyingManSound.setVolume(0.1*(soundLevel/100));
    landingRocketSound.setVolume(0.2*(soundLevel/100));
    enemyHitSound.setVolume(0.01*(soundLevel/100));
};

class FileManager {

    songLoaded = (loadedSong) => {
        loadedSong.setVolume(0.2);
        loadedSong.play();
        currentLoadedAssets+=1;
    };

    sfxSoundfun = (sound) => {
        sound.setVolume(0.1);
        sound.loop = false;
        currentLoadedAssets+=1;
    };

    sfxSoundfun2 = (sound) => {
        sound.setVolume(0.2);
        sound.loop = false;
        currentLoadedAssets+=1;
    };

    somethingLoaded = () => {
        currentLoadedAssets+=1;
    };

    loadAllAssets = () => {
        fontOxygenMono = loadFont('assets/fonts/OxygenMono-Regular.ttf');
        fontNeucha = loadFont('assets/fonts/Neucha-Regular.ttf');
        bg = loadImage('assets/textures/background/Ground.jpg', this.somethingLoaded);
        explosionSound = loadSound('assets/sfx/explosion.mp3', this.sfxSoundfun);
        gunSound = loadSound('assets/sfx/gun-shot.mp3', this.sfxSoundfun);
        enemySplatSound = loadSound('assets/sfx/enemySplat.mp3', this.sfxSoundfun2);
        enemyHitSound = loadSound('assets/sfx/enemyHit.mp3', this.sfxSoundfun);
        landingRocketSound = loadSound('assets/sfx/landingRocket.mp3', this.sfxSoundfun2);
        dyingManSound = loadSound('assets/sfx/dyingMan.mp3', this.sfxSoundfun);
        themeSound = loadSound('assets/music/DST-BetaTron.mp3', this.songLoaded);
        frodo = loadImage('assets/textures/npcs/frodo/frodo.png', this.somethingLoaded);
        frodoMove = this.loadAnimation('assets/textures/npcs/frodo/moveAnim/move0001.png', 'assets/textures/npcs/frodo/moveAnim/move0016.png');
        playerSkin = loadImage('assets/textures/player/player.png', this.somethingLoaded);
        deadPlayerSkin = loadImage('assets/textures/player/deathAnim/playerDead0096.png', this.somethingLoaded);
        deadPlayerAnim = this.loadAnimation('assets/textures/player/deathAnim/playerDead0001.png','assets/textures/player/deathAnim/playerDead0096.png');
        rocketSkin = loadImage('assets/textures/rocket/LandAnim/land0022.png', this.somethingLoaded);
        tracer = loadImage('assets/textures/player/trace.png', this.somethingLoaded);
        testAnimation = this.loadAnimation('assets/textures/testAnim/anim001.png', 'assets/textures/testAnim/anim010.png');
        playerFireAnim = this.loadAnimation('assets/textures/player/FireAnim/fire0001.png', 'assets/textures/player/FireAnim/fire0013.png');
        rocketAnimation = this.loadAnimation('assets/textures/rocket/LandAnim/land0001.png','assets/textures/rocket/LandAnim/land0022.png');
        frodoDead1 = this.loadAnimation('assets/textures/npcs/frodo/deadAnim/dead0001.png','assets/textures/npcs/frodo/deadAnim/dead0016.png');
        rocketExplodeAnim = this.loadAnimation('assets/textures/rocket/explAnim/expl0001.png','assets/textures/rocket/explAnim/expl0024.png');
        frodoDeadImg = loadImage('assets/textures/npcs/frodo/deadAnim/dead0016.png');
    };

    loadAnimation = (path1, path2) => {
        let animationArr = [];
        const pathType = path1.slice(-4);
        const pathNoType1 = path1.substring(0,path1.length-4);
        const pathNoType2 = path2.substring(0,path1.length-4);
        let startPos = +(pathNoType1.slice(-3));
        const endPos = +(pathNoType2.slice(-3));
        const basePath = path1.substring(0,path1.length-7);
        if(startPos <= endPos) {
            while(startPos <= endPos) {
                animationArr.push(loadImage(basePath+this.getNumString(startPos)+pathType));
                startPos+=1;
            }
        }
        return animationArr;
    };

    getNumString = (num) => {
        if(num < 10) {
            return '00'+num;
        } else if (num < 100) {
            return '0'+num;
        } else {
            return num.toString();
        }
    }

}