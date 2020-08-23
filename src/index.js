import React from 'react';
import ReactDOM, { render } from 'react-dom';
import ToDo from './ToDo';
import './index.css';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: [

      ],
    };
  };

  clearFields = (e) => {
    // テスト用に一旦機能削除
  }

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
    this.clearFields(e);
  }

  editToDo = (e, index) => {
    e.preventDefault();
    const title = e.target.elements['title'].value;
    const description = e.target.elements['description'].value;
    const arg_index = index;

    this.state.toDoList.map((todo, index) => {
      if (index === arg_index) {
        this.state.toDoList[index].title = title;
        this.state.toDoList[index].description = description;
      };
    });

    this.setState({
      toDoList: this.state.toDoList
    });
    this.clearFields(e);
  }

  deleteToDo = (index) => {
    this.state.toDoList.splice(index, 1);
    this.setState({toDoList: this.state.toDoList});
  }

  taskFinished = (index) => {
    const arg_index = index;
    this.state.toDoList.map((todo, index) => {
      if (index === arg_index) {
        this.state.toDoList[index].taskFinished = !this.state.toDoList[index].taskFinished;
      };
    });

    this.setState({
      toDoList: this.state.toDoList
    });
  };

  eachToDo() {
    return (
      this.state.toDoList.map((todo, index) => (
        <ToDo index={index}
              key={todo.index}
              title={todo.title}
              description={todo.description}
              is_task_finished={todo.taskFinished}
              deleteToDo={this.deleteToDo}
              editToDo={this.editToDo}
              taskFinished={this.taskFinished}
        />
      ))
    )
  }

  todo_done_lists() {
    return (
      this.state.toDoList.map((todo, index) => (
        <div>
          <p>完了タスクはありません</p>
        {todo.taskFinished === true ?
          <ToDo index={index}
                key={todo.index}
                title={todo.title}
                description={todo.description}
          />
          :
          ""
        }
        </div>



      ))
    )
  }

  todo_not_yet_lists() {
    return (
      this.state.toDoList.map((todo, index) => (
        (todo.taskFinished !== true ?
          <ToDo index={index}
            key={todo.index}
            title={todo.title}
            description={todo.description}
          />
          :
          ""
        )
      ))
    )
  }

  render() {
    return (
      <div>
        <div className="todo_form">
          <h4>君にとっての最高のToDoリストを！</h4>
          <form onSubmit={this.submitToDo}>
            <input type="text" name="title" placeholde="title" />
            <input type="text" name="description" placeholde="description" />
            <input type="submit" value="送信"></input>
          </form>
        </div>
        <div className="todos">
          <div className="each_todos">
            {this.eachToDo()}
          </div>
          <div className="todo_done_and_not_yet_lists">
            <div className="todo_done_lists">
              <h3>完了タスク</h3>
              {this.todo_done_lists()}
            </div>
            <div className="todo_not_yet_lists">
              <h3>未完タスク</h3>
              {this.todo_not_yet_lists()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// ========================================
ReactDOM.render(
  <List />,
  document.getElementById('root')
);
