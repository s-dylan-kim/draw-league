const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('New Connction');

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);

        const error = true;

        if(error) {
            callback({ error: 'error' });
        }
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
})

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
