import React from 'react';
import './index.css';

function Form(props) {
  return (
    <div>
      <form onSubmit={(e) => props.editToDo(e, props.index)}>
        <input type="text" name="title" placeholde="title" />
        <input type="text" name="description" placeholde="title" />
        <input type="submit" value="編集する"></input>
      </form>
    </div>
  )
}

export default Form;
