const rooms = [];
const ROOMNAMELENGTH = 4;

//maybe make these return room ID

const createRoom = () => {
			
    var roomName = "";

    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    do {
        text = ''

        for(let i = 0; i < ROOMNAMELENGTH; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
    
        var existingRoom = rooms.find((rooms) => rooms.name == roomName);
    }
    while (existingRoom);
    
    const room = { name: text, users: [] };

    rooms.push(room);

    console.log(rooms)

    return { room };
}

const addUser = ({ name, room }) => {

    const existingRoom = rooms.find((rooms) => rooms.name == room);

    if(!existingRoom) {
        return { error: 'Room does not exist' };
    }

    const users = existingRoom.users;

    const existingUser = users.find((user) => user.name === name);

    if(existingUser) {
        return { error: 'Username is taken' };
    }

    const user = { name };

    users.push(user);

    return { user };
}

const removeUser = ({ id, room }) => {

    const existingRoom = rooms.find((rooms) => rooms.name == room);

    if(!existingRoom) {
        return { error: 'Room does not exist' };
    }

    const index = existingRoom.users.findIndex((user) => user.id === id);
    
    if(index == -1) {
        return { error: 'User does not exist' }
    }

    return users.splice(index, 1)[0];
}

const getUser = ({ id, room }) => {

    const existingRoom = rooms.find((rooms) => rooms.name == room);

    if(!existingRoom) {
        return { error: 'Room does not exist' };
    }
    
    const existingUser = existingRoom.users.find((user) => user.id === id);
    
    if(existingUser) {
        return { error: 'User does not exist' }
    }

    return existingUser;
}

const getUsersInRoom = (room) => {

    const existingRoom = rooms.find((rooms) => rooms.name == room);

    if(!existingRoom) {
        return { error: 'Room does not exist' };
    }

    return existingRoom.users;
}

module.exports= { createRoom, addUser, removeUser, getUser, getUsersInRoom };