import React, { Component } from "react";
import Modal from "react-modal";

//http://reactcommunity.org/react-modal/

class ToDoEditModal extends Component {
  editingTodo = null;

  render() {
    if (!this.props.todo) {
      return <Modal isOpen={false}></Modal>;
    }

    this.editingTodo = { ...this.props.todo };

    return (
      <Modal
        isOpen={this.props.isOpen}
        shouldCloseOnOverlayClick={false}
        style={{ content: { bottom: "undefined" } }}
      >
        <h5 key="modal_header">
          {this.editingTodo
            ? this.editingTodo.id
              ? "Update Existing ToDo"
              : "Create New ToDo"
            : "error: this.editingTodo undefined"}
        </h5>
        <div className="form-group">
          <label htmlFor="todoDescription">Description</label>
          <input
            type="text"
            className="form-control"
            id="todoDescription"
            placeholder="short description of the task"
            defaultValue={this.props.todo.description}
            onChange={e => this.todoDescriptionChanged(e)}
          />
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            defaultChecked={this.props.todo.completed}
            id="todoCompleted"
            onChange={e => this.todoCompletedChanged(e)}
          />
          <label className="form-check-label" htmlFor="todoCompleted">
            Completed?
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="todoDueDate">Due Date</label>
          <input
            type="date"
            className="form-control"
            id="todoDueDate"
            defaultValue={
              this.props.todo.dueDate
                ? this.props.todo.dueDate.toISOString().split("T")[0]
                : ""
            }
            onChange={e => this.todoDueDateChanged(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="todoDollarValue">Dollar Value</label>
          <input
            type="number"
            className="form-control"
            id="todoDollarValue"
            defaultValue={
              this.props.todo.dollarValue ? this.props.todo.dollarValue : 0
            }
            onChange={e => this.todoDollarValueChanged(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="todoColor">Color</label>
          <input
            type="color"
            className="form-control"
            id="todoColor"
            defaultValue={
              this.props.todo.color ? this.props.todo.color : "#ffffff"
            }
            onChange={e => this.todoColorChanged(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="todoNotes">Notes</label>
          <textarea
            className="form-control"
            id="todoNotes"
            rows="3"
            defaultValue={this.props.todo.notes}
            onChange={e => this.todoNotesChanged(e)}
          ></textarea>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={() => this.props.saveEditTodo(this.editingTodo)}
        >
          Save
        </button>
        <button
          className="btn btn-cancel"
          onClick={() => this.props.hideModals()}
        >
          Cancel
        </button>
      </Modal>
    );
  }

  todoDescriptionChanged = e => {
    this.editingTodo.description = e.target.value;
  };

  todoNotesChanged = e => {
    this.editingTodo.notes = e.target.value;
  };

  todoCompletedChanged = e => {
    this.editingTodo.completed = e.target.checked;
  };

  todoDueDateChanged = e => {
    this.editingTodo.dueDate = new Date(e.target.value);
  };

  todoDollarValueChanged = e => {
    this.editingTodo.dollarValue = Number(e.target.value);
  };

  todoColorChanged = e => {
    this.editingTodo.color = e.target.value;
  };
}

export default ToDoEditModal;
