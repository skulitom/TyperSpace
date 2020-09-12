class Settings {
    constructor(backFnc) {
        this.menuUtils = new MenuUtils();
        this.backBtn = undefined;
        this.resolutionDropdown = undefined;
        this.checkBoxFullscreen = undefined;
        this.volumeSlider = undefined;
        this.backFnc = backFnc;
    }

    removeSettings = () => {
        if(this.volumeSlider) {
            soundLevel = this.volumeSlider.value();
        }
        adjustSounds();
        this.backBtn = this.menuUtils.removeItem(this.backBtn);
        this.resolutionDropdown = this.menuUtils.removeItem(this.resolutionDropdown);
        this.checkBoxFullscreen = this.menuUtils.removeItem(this.checkBoxFullscreen);
        this.volumeSlider = this.menuUtils.removeItem(this.volumeSlider);
    };

    draw = () => {
        this.resolutionDropdown = this.menuUtils.createDropdown(
            this.resolutionDropdown,
            ['1920 x 1080','1600 x 900', '1366 x 768', '1280 x 720'],
            resolution.join(' x '),
            this.selectResolution,
            1
        );

        this.checkBoxFullscreen = this.menuUtils.createCheckbox(
            this.checkBoxFullscreen,
            'Fullscreen',
            this.checkFullscreenClicked,
            fullScreenVal,
            2
        );
        textSize(32);
        fill(255,255,255);
        text('Volume Level', ...this.menuUtils.calculatePosition(2.8));

        this.volumeSlider = this.menuUtils.createSlider(
            this.volumeSlider,
            0,
            100,
            soundLevel,
            3
        );

        this.backBtn = this.menuUtils.createButton(this.backBtn, 'Back', this.backFnc, 4);
    };

    checkFullscreenClicked = () => {
        changeFullScreen(this.checkBoxFullscreen.checked());
        if(this.checkBoxFullscreen.checked()) {
            this.changeResolution(getScreenSize());
            fullScreenVal = true;
            this.removeSettings();
        } else {
            fullScreenVal = false;
            this.selectResolution();
        }
    };

    changeResolution = (newRes) => {
        changeGlobalRes(newRes);
        resizeCanvas(...newRes);
        changeWindowResolution(newRes);
    };

    selectResolution = () => {
        switch (this.resolutionDropdown.value()) {
            case '1920 x 1080':
                this.changeResolution([1920,1080]);
                break;
            case '1600 x 900':
                this.changeResolution([1600, 900]);
                break;
            case '1366 x 768':
                this.changeResolution([1366,768]);
                break;
            case '1280 x 720':
                this.changeResolution([1280, 720]);
                break;
            default:
                break;
        }
        this.removeSettings();
    };

}