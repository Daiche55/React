import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: [

      ],
    };
  };

  submitToDo = (e) => {
    e.preventDefault();
    const title = e.target.elements['title'].value;
    this.setState(
      {
        toDoList: this.state.toDoList.concat({title: title})
      }
    )
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitToDo}>
          <input type="text" name="title" placeholde="title" />
          <input type="submit" value="Submit" ></input>
        </form>
        <ToDo value={this.state.toDoList}/>
      </div>
    )
  }
}

function ToDo(props) {
  return (
    <div>{props.toDoList}</div>
  );
}

// ========================================
ReactDOM.render(
  <List />,
  document.getElementById('root')
);
