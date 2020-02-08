import React, { Component } from "react";

class ToDoDetail extends Component {
  render() {
    if (!this.props.todo) {
      return (
        <div>
          <p>No ToDo Selected</p>
        </div>
      );
    }

    return (
      <div>
        <p>{this.props.todo.id}</p>
      </div>
    );
  }
}

export default ToDoDetail;
