const cors = require('cors');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
// const schedule = require('node-schedule');
const bodyParser = require('body-parser')

const { createRoom, addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000

// var j = schedule.scheduleJob('*/1 * * * *', function(){  // this for one hour
//     console.log('maybe add purge here?');
// });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('New Connction');

    socket.on('error', function (err) {
        console.log(err)
    })

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

    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
    socket.on('message', (data) => socket.broadcast.emit('message', data));
})

app.post('/create', (req, res) => {
    console.log(req)
    console.log(req.body.name)
    const room = createRoom();
    // addUser(  )


    res.send(
        room.name
    );
});

app.get('/', (req, res) => {
    res.send({message: 'online'});
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));