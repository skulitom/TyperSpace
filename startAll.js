const { exec } = require('child_process');
const process = require('process');
process.chdir('serverGame');

exec('npm start', (err, stdout, stderr) => {
    if (err) {
        // node couldn't execute the command
        return;
    }
});
process.chdir('../public');
exec('npm start', (err, stdout, stderr) => {
    if (err) {
        // node couldn't execute the command
        return;
    }
});