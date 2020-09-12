const express = require('express');
const socket = require('socket.io');
const app = express();
const PORT = process.env.PORT || 8080;
let GameManager = require('./GameManager');

let server = app.listen(PORT);

let io = socket(server);
let gameManager = new GameManager();
let timerList = new Map();

io.sockets.on('connection', socket => {
    socket.on('room', (room) => {
        if(!(io.sockets.adapter.rooms[room])) {
            gameManager.createGame(room);
            let interval = setInterval(() => updateGame(room), 16);
            timerList.set(room, interval);
        }
        socket.join(room);
        gameManager.addPlayer(room, socket.id);

        socket.on('set key', (msg) => {
            gameManager.onKey(room, msg.id, msg.key);
        });

        socket.on('restart', () => {
            gameManager.restartGame(room);
        });

        socket.on('disconnect', () => {
            console.log('disconnected');
            io.sockets.in(room).emit("disconnect", socket.id);
            gameManager.removePlayer(room, socket.id);
            if(!(io.sockets.adapter.rooms[room])) {
                gameManager.closeGame(room);
                clearInterval(timerList.get(room));
                timerList.delete(room);
            }
        });
    });
});

updateGame = (room) => {
    gameManager.updateGame(room);
    io.sockets.in(room).emit("heartbeat", gameManager.getEmitable(room));
};




