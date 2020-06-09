import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import { Link } from 'react-router-dom';

let socket;

const Game = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);

    socket.emit('join', { name, room }, ({ error }) => {
      alert(error);
    });
  }, [ENDPOINT, location.search]);

  return <h1>Game</h1>;
};

export default Game;
