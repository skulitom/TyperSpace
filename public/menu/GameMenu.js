class GameMenu {
    constructor() {
        this.buttonExit = undefined;
        this.buttonSettings = undefined;
        this.buttonResume = undefined;
        this.buttonRestart = undefined;
        this.menuShow = false;
        this.settings = new Settings(this.backButtonClicked);
        this.currentMenuItem = 0;
        this.menuUtils = new MenuUtils();
    }

    toggleMenu = () => {
        this.menuShow = !this.menuShow;
        this.currentMenuItem = 0;
        this.settings.removeSettings();
    };

    draw = () => {
        if(this.menuShow) {
            let menuColor = color(40,40,40);
            fill(menuColor);
            rect(...menuLoc, ...menuDimentions);
            this.displayCurrentMenuItems();
        } else {
            this.removeAllButtons();
        }
    };

    displayCurrentMenuItems = () => {
        switch (this.currentMenuItem) {
            case 0:
                this.buttonResume = this.menuUtils.createButton(this.buttonResume, 'Resume', this.resumeButtonClicked, 1);
                this.buttonSettings = this.menuUtils.createButton(this.buttonSettings, 'Settings', this.settingsButtonClicked, 2);
                this.buttonRestart = this.menuUtils.createButton(this.buttonRestart, 'Restart', this.restartButtonClicked, 3);
                this.buttonExit = this.menuUtils.createButton(this.buttonExit, 'Exit', this.exitButtonClicked, 4);
                break;
            case 1:
                this.settings.draw();
                break;
            default:
                break;

        }
    };

    backButtonClicked = () => {
        this.settings.removeSettings();
        if(this.currentMenuItem>0) {
            this.currentMenuItem -= 1;
        }
    };

    restartButtonClicked = () => {
        socket.emit('disconnect');
    };

    resumeButtonClicked = () => {
        this.currentMenuItem = 0;
        this.menuShow = false;
    };

    exitButtonClicked = () => {
        quitApplication();
    };

    settingsButtonClicked = () => {
        this.currentMenuItem = 1;
        this.removeAllButtons();
    };

    removeAllButtons = () => {
        this.buttonResume = this.menuUtils.removeItem(this.buttonResume);
        this.buttonExit = this.menuUtils.removeItem(this.buttonExit);
        this.buttonSettings = this.menuUtils.removeItem(this.buttonSettings);
        this.buttonRestart = this.menuUtils.removeItem(this.buttonRestart);
    };

}