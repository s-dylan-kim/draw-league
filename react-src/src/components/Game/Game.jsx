import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

import socket from './Socket';

import SelectName from './SelectName';
import Canvas from './Canvas';
import Chat from './Chat';

const Game = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [state, setState] = useState(1);

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

    setRoom(room);

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [location.search]);

  return (
    <React.Fragment>
      {state === 0 ? (
        <SelectName submitName={submitName} setName={setName} />
      ) : (
        <React.Fragment>
          <Canvas socket={socket} />
          <Chat />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Game;
