import React from 'react';
import Form from './Form';
import './index.css';

export default class ToDo extends React.Component {
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
          {props.is_task_finished === true ?
          <button onClick={() => props.taskFinished(props.index)}>タスク未完にする</button>
          :
          <button onClick={() => props.taskFinished(props.index)}>タスク完了にする</button>}
        </div>
      </div>
    );
  }
}
