import React from 'react';
import ReactDOM, { render } from 'react-dom';
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
        (todo.taskFinished === true ?
          <ToDo index={index}
                key={todo.index}
                title={todo.title}
                description={todo.description}
          />
        :
        <p>完了タスクはありません</p>
        )
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
          <p>未完タスクはありません</p>
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
          <div className="todo_done_not_yet_lists">
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

class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editToDo: false,
    };
  };

  eachToDoEdit = () => {
    this.setState({
      editToDo: !this.state.editToDo
    });
  }

  render(props) {
    var props = this.props;
    return (
      <div>
        <div className="each_todos" key={props.key}>
          <h3>タスクNo. {props.index + 1}</h3>
          <h3>今日すること:</h3><br></br>
          <h2 className="todo_content">{props.title}</h2><br></br>
          <h3>詳しい内容:</h3><br></br>
          <h2 className="todo_content">{props.description}</h2><br></br>

          <button onClick={() => props.deleteToDo(props.index)}>削除する</button>
          {this.state.editToDo ?
            <div>
              <p><Form index={props.index} editToDo={props.editToDo} /></p>
              <button onClick={this.eachToDoEdit}>戻る</button>
            </div>
            :
            <button onClick={this.eachToDoEdit}>編集する</button>
          }
          <button onClick={() => props.taskFinished(props.index)}>タスク完了！</button>
        </div>
      </div>
    );
  }
}

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

// ========================================
ReactDOM.render(
  <List />,
  document.getElementById('root')
);
