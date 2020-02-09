import React, { Component } from "react";
import ToDoListItem from "./todolistitem";

class ToDoList extends Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  render() {
    return (
      <div>
        <div className="list-group">
          {this.props.todos !== undefined ? (
            this.props.todos.map(m => (
              <ToDoListItem
                key={m.id}
                todo={m}
                isToDoCompleted={this.props.isToDoCompleted}
                isToDoOverdue={this.props.isToDoOverdue}
              ></ToDoListItem>
            ))
          ) : (
            <span>No todos!</span>
          )}
        </div>
      </div>
    );
  }
}

export default ToDoList;
