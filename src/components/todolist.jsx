import React, { Component } from "react";
import ToDoListItem from "./todolistitem";

class ToDoList extends Component {
  render() {
    return (
      <div>
        <div className="list-group">
          {this.props.todos.map(m => (
            <ToDoListItem
              key={m.id}
              todo={m}
              isToDoCompleted={this.props.isToDoCompleted}
              isToDoOverdue={this.props.isToDoOverdue}
            ></ToDoListItem>
          ))}
        </div>
      </div>
    );
  }
}

export default ToDoList;
