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
    const description = e.target.elements['description'].value;
    this.setState(
      {
        toDoList: this.state.toDoList.concat({
          title: title,
          description: description,
        })
      }
    )
  }

  eachToDo() {
    return (
      this.state.toDoList.map((todo, index) => (
        <ToDo index={index} title={todo.title} description={todo.description} />
      ))
    )
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitToDo}>
          <input type="text" name="title" placeholde="title" />
          <input type="text" name="description" placeholde="title" />
          <input type="submit" value="Submit"></input>
        </form>
        {this.eachToDo()}
      </div>
    )
  }
}

function ToDo(props) {
  return (
    <div>
      <h1>タスクNo. {props.index + 1}</h1>
      <h2>今日すること:</h2><br></br>
      {props.title}<br></br>
      <h2>詳しい内容:</h2><br></br>
      {props.description}<br></br>
    </div>
  );
}

// ========================================
ReactDOM.render(
  <List />,
  document.getElementById('root')
);
