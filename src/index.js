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
    e.target.elements['title'].value = '';
    e.target.elements['description'].value = '';
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

  eachToDo() {
    return (
      this.state.toDoList.map((todo, index) => (
        <ToDo index={index}
              key={todo.index}
              title={todo.title}
              description={todo.description}
              deleteToDo={this.deleteToDo}
              editToDo={this.editToDo}
        />
      ))
    )
  }

  render() {
    return (
      <div>
        <h2>君にとっての最高のToDoリストを！</h2>
        <form onSubmit={this.submitToDo}>
          <input type="text" name="title" placeholde="title" />
          <input type="text" name="description" placeholde="title" />
          <input type="submit" value="送信"></input>
        </form>
        {this.eachToDo()}
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
      <div key={props.key}>
        <h1>タスクNo. {props.index+1}</h1>
        <h2>今日すること:</h2><br></br>
        {props.title}<br></br>
        <h2>詳しい内容:</h2><br></br>
        {props.description}<br></br>
        <button onClick={() => props.deleteToDo(props.index)}>Delete</button>
        {this.state.editToDo ?
          <div>
            <p><Form index={props.index} editToDo={props.editToDo}/></p>
            <button onClick={this.eachToDoEdit}>戻る</button>
          </div>
          :
          <button onClick={this.eachToDoEdit}>Edit</button>
        }
      </div>
    );
  }
}

class Form extends React.Component {
  render(props) {
    var props = this.props;
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
}

// ========================================
ReactDOM.render(
  <List />,
  document.getElementById('root')
);
