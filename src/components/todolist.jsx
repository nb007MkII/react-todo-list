import React, { Component } from "react";
import ToDoListItem from "./todolistitem";

class ToDoList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="list-group">
          {this.props.todos !== undefined && this.props.todos.length > 0 ? (
            this.props.todos.map(m => (
              <ToDoListItem
                key={m.todoid}
                todo={m}
                isToDoOverdue={this.props.isToDoOverdue}
                isToDoCompleted={this.props.isToDoCompleted}
                isToDoHighDollarValue={this.props.isToDoHighDollarValue}
                showEditModal={this.props.showEditModal}
                showDeleteModal={this.props.showDeleteModal}
              ></ToDoListItem>
            ))
          ) : (
            <span id={"notodos"}>No ToDos!</span>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default ToDoList;
