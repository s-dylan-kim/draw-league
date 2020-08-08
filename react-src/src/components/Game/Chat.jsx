import React, { useEffect, useState, useRef } from 'react';

import socket from './Socket';

import './Chat.css';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [scrolledDown, setScrolledDown] = useState(true);
  const messageWrapperRef = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    socket.on('message', (data) => {
      console.log(data);
      setMessageList([
        ...messageList,
        { name: data.name, message: data.message },
      ]);
    });
  });

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    socket.emit('message', { message: message });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (message === '') return;
      sendMessage();
      setScrolledDown(
        messageWrapperRef.current.scrollHeight -
          messageWrapperRef.current.scrollTop ===
          messageWrapperRef.current.clientHeight
      );
      setMessageList([...messageList, { name: 'Me', message: message }]);
      setMessage('');
    }
  };

  useEffect(() => {
    if (scrolledDown) {
      messageEndRef.current.scrollIntoView();
    }
  }, [messageList, scrolledDown]);

  return (
    <div id='chat-container'>
      <div id='message-wrapper' ref={messageWrapperRef}>
        {messageList.map((message, index) => (
          <p key={index}>
            {message.name}: {message.message}
          </p>
        ))}
        <div ref={messageEndRef} style={{ float: 'left', clear: 'both' }} />
      </div>
      <input
        type='text'
        value={message}
        id='message'
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Chat;
