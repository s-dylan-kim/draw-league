import React from 'react';

const SelectName = (props) => {
  return (
    <form>
      <label>
        Name:
        <input
          type='text'
          name='name'
          onChange={(event) => props.setName(event.target.value)}
        />
      </label>
      <input type='submit' value='Submit' onClick={props.submitName} />
    </form>
  );
};

export default SelectName;
