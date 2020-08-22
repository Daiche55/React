import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { render } from '@testing-library/react';
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: [

      ]
    };
  };

  displayTasks() {

  }

  submitToDo(e) {
    e.preventDefault();
    var title = e.target.elements['title'];

    this.setState({
      toDoList: this.state.toDoList.concat({
        title: title.value,
      })
    })

    title.value = "";
  }

  render() {
    return (
      <form>
        <input type="text" name="title" placeholde="title" />
        <input type="submit" onSubmit={this.submitToDo}></input>
      </form>
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
