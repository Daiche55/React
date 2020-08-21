import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whatToDo: [{
        tasks: Array(3).fill(null),
      }]
    };
  };
  displayTasks(i) {
    return (
      <Task />
    )
  }
  render() {
    return (
      <div>{this.displayTasks(1)}</div>
    )
  }
}
function Task(props) {
  return (
    <div>aa</div>
  )
}
// ========================================
ReactDOM.render(
  <ToDoList />,
  document.getElementById('root')
);
