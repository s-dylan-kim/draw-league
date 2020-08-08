import React, { useState } from 'react';
import axios from 'axios';

// const serverURL = 'localhost:5000';

const Create = () => {
  const [name, setName] = useState('');
  // const [joined, setJoined] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5000/create', { name }).then(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='name'
        onChange={(event) => setName(event.target.value)}
      />
      <button type='submit'>Create</button>
    </form>
  );
};

export default Create;
