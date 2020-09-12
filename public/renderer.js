// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { ipcRenderer } = require('electron');

changeWindowResolution = (newResolution) => {
    ipcRenderer.send('CHANGE_RESOLUTION', newResolution);
};

changeFullScreen = (status) => {
    ipcRenderer.send('CHANGE_FULLSCREEN', status);
};

quitApplication = () => {
    ipcRenderer.send('QUIT_APPLICATION', 'quiting')
};

getScreenSize = () => {
    return [screen.availWidth, screen.availHeight]
};
