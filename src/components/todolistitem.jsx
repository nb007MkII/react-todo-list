import React, { Component } from "react";

class ToDoListItem extends Component {
  render() {
    return (
      <div
        key={this.props.todo.id}
        className="list-group-item list-group-item-action flex-column align-items-start"
      >
        <div className="d-flex w-100 justify-content-between">
          {this.renderDescription()}
          {this.renderDueDate()}
        </div>
        <p className="mb-1">{this.props.todo.notes}</p>
      </div>
    );
  }

  renderDescription() {
    let jsx = [
      <h5
        key={"todolistitem_h5_" + this.props.todo.id}
        className="mb-1"
        onClick={this.props.editTodo}
      >
        {this.props.todo.description}
      </h5>
    ];

    if (this.props.isToDoCompleted(this.props.todo)) {
      jsx.push(
        <span
          key={"todolistitem_completedbadge_" + this.props.todo.id}
          className="badge badge-pill badge-success"
        >
          Completed
        </span>
      );
    }

    if (this.props.isToDoOverdue(this.props.todo)) {
      jsx.push(
        <span
          key={"todolistitem_overduebadge_" + this.props.todo.id}
          className="badge badge-pill badge-danger"
        >
          Overdue
        </span>
      );
    }

    return jsx;
  }

  renderDueDate() {
    if (this.props.todo.dueDate) {
      return (
        <div>
          <small>Due: {this.props.todo.dueDate.toDateString()}</small>
        </div>
      );
    }

    return <div></div>;
  }
}

export default ToDoListItem;
