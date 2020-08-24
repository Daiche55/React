import React from 'react';
import ReactDOM, { render } from 'react-dom';
import ToDo from './ToDo';
import './index.css';

var id = 0;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  };

  clearFields = (e) => {
    // テスト用に一旦機能削除
  }

  submitToDo = (e) => {
    e.preventDefault();
    const new_todo = {
      title: e.target.elements['title'].value,
      description: e.target.elements['description'].value,
      taskFinished: false,
      id: id,
    }
    const new_todos = [...this.state.todos, new_todo]
    this.setState({todos: new_todos})
    this.clearFields(e);
    id++;
  }

  editToDo = (e, index) => {
    e.preventDefault();
    const title = e.target.elements['title'].value;
    const description = e.target.elements['description'].value;

    const something = this.state.todos.find(({todos}) => (
      todos.index === index
    ));

    this.setState({
      todos: this.state.todos
    });
    this.clearFields(e);
  }

  deleteToDo = (index) => {
    this.state.todos.splice(index, 1);
    this.setState({todos: this.state.todos});
  }

  taskFinished = (index) => {
    const arg_index = index;
    this.state.todos.map((todo, index) => {
      if (index === arg_index) {
        this.state.todos[index].taskFinished = !this.state.todos[index].taskFinished;
      };
    });

    this.setState({
      todos: this.state.todos
    });
  };

  render() {
    const todos_done = this.state.todos.filter(({taskFinished}) => taskFinished)
    const todos_not_yet = this.state.todos.filter(({taskFinished}) => !taskFinished)
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
            {this.state.todos.map((todo) => (
              <div key={todo.id}>
                <ToDo index={todo.id}
                      title={todo.title}
                      description={todo.description}
                      is_task_finished={todo.taskFinished}
                      deleteToDo={this.deleteToDo}
                      editToDo={this.editToDo}
                      taskFinished={this.taskFinished}
                />
              </div>
            ))}
          </div>
          <div className="todo_done_and_not_yet_lists">
            <div className="todo_done_lists">
              <h3>完了タスク</h3>
              {todos_done.map((todo) => (
              <div key={todo.id}>
                <ToDo index={todo.id}
                      title={todo.title}
                      description={todo.description}
                />
              </div>
            ))}
            </div>
            <div className="todo_not_yet_lists">
              <h3>未完タスク</h3>
              {todos_not_yet.map((todo) => (
              <div key={todo.id}>
                <ToDo index={todo.id}
                      title={todo.title}
                      description={todo.description}
                />
              </div>
              ))}
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
