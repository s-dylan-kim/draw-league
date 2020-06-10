import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import SelectName from './SelectName';

let socket;

const Game = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [state, setState] = useState(0);
  const ENDPOINT = 'localhost:5000';

  const submitName = (e) => {
    e.preventDefault();

    socket.emit('join', { name, room }, ({ error }) => {
      if (error) {
        alert(error);
      } else {
        setState(1);
      }
    });
  };

  useEffect(() => {
    const { room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  return (
    <React.Fragment>
      {state === 0 ? (
        <SelectName submitName={submitName} setName={setName} />
      ) : null}
      <h1>Game</h1>
    </React.Fragment>
  );
};

export default Game;
