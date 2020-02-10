import React, { Component } from "react";
import ToDoListItem from "./todolistitem";

class ToDoList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="list-group">
          {this.props.todos !== undefined ? (
            this.props.todos.map(m => (
              <ToDoListItem
                key={m.id}
                todo={m}
                isToDoOverdue={this.props.isToDoOverdue}
                isToDoCompleted={this.props.isToDoCompleted}
                isToDoHighDollarValue={this.props.isToDoHighDollarValue}
                showEditModal={this.props.showEditModal}
                showDeleteModal={this.props.showDeleteModal}
              ></ToDoListItem>
            ))
          ) : (
            <span>No ToDos!</span>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default ToDoList;
