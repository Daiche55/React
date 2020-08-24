import React from 'react';
import './index.css';

function Form(props) {
  return (
    <div>
      <form onSubmit={(e) => props.editToDo(e, props.index)}>
        <input type="text" name="title" placeholde="title" />
				<input type="text" name="description" placeholde="description" />
        <select name="date">
          <option selected value="today">今日</option>
          <option value="tomorrow">明日</option>
          <option value="after_tomorrow">明後日</option>
        </select>
        <input type="submit" value="編集する"></input>
      </form>
    </div>
  )
}

export default Form;
