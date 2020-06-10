const rooms = [];

//maybe make these return room ID

const addUser = ({ id, name, room }) => {

    const existingRoom = rooms.find((rooms) => rooms.name == room);

    if(!existingRoom) {
        return { error: 'Room does not exist' };
    }

    const users = existingRoom.users;

    const existingUser = users.find((user) => user.name === name);

    if(existingUser) {
        return { error: 'Username is taken' };
    }

    const user = { id, name };

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

module.exports= { addUser, removeUser, getUser, getUsersInRoom };