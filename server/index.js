const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('New Connction');

    socket.on('join', ({ name, room }, callback) => {

        const { error } = addUser({ id: socket.id, name, room });

        if (error) {
            callback({ error });
        }

        console.log(socket.id, name, room);

        socket.join(room);

        callback({});
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
})

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
