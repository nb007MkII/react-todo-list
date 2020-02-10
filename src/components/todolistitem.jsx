import React, { Component } from "react";
import Octicon, { Pencil, Trashcan } from "@primer/octicons-react";

class ToDoListItem extends Component {
  render() {
    let bgColorSyle = { backgroundColor: "#ffffff" };

    if (this.props.todo.color) {
      bgColorSyle.backgroundColor = this.props.todo.color;
    }

    return (
      <div
        key={this.props.todo.id}
        className="list-group-item list-group-item-action flex-column align-items-start"
        style={bgColorSyle}
      >
        <div className="d-flex w-100 justify-content-between">
          {this.renderDescription()}
          {this.renderDueDate()}
        </div>
        {this.renderDollarValue()}
        {this.renderPills()}
        {this.renderNotes()}
        <div
          key={"todolistitem_deletebutton_" + this.props.todo.id}
          onClick={() => this.props.showDeleteModal(this.props.todo)}
          className="float-right"
        >
          <Octicon icon={Trashcan} />
        </div>
        <div
          key={"todolistitem_editbutton_" + this.props.todo.id}
          onClick={() => this.props.showEditModal(this.props.todo)}
          className="float-right"
        >
          <Octicon icon={Pencil} />
        </div>
      </div>
    );
  }

  renderDescription() {
    return (
      <h5 key={"todolistitem_h5_" + this.props.todo.id} className="mb-1">
        {this.props.todo.description}
      </h5>
    );
  }

  renderNotes() {
    return (
      <div key={"todolistitem_notes_" + this.props.todo.id} className="mb-1">
        {this.props.todo.notes}
      </div>
    );
  }

  renderDueDate() {
    let jsx = [];

    if (this.props.todo.dueDate) {
      jsx.push(
        <div key={"todolistitem_duedate_" + this.props.todo.id}>
          <small>Due: {this.props.todo.dueDate.toDateString()}</small>
        </div>
      );
    }

    return jsx;
  }

  renderPills() {
    let jsx = [];

    if (this.props.isToDoCompleted(this.props.todo)) {
      jsx.push(
        <span
          key={"todolistitem_completedbadge_" + this.props.todo.id}
          className="badge badge-pill badge-primary float-right"
        >
          Completed
        </span>
      );
    }

    if (this.props.isToDoOverdue(this.props.todo)) {
      jsx.push(
        <span
          key={"todolistitem_overduebadge_" + this.props.todo.id}
          className="badge badge-pill badge-danger float-right"
        >
          Overdue
        </span>
      );
    }

    return jsx;
  }

  renderDollarValue() {
    let jsx = [];

    if (this.props.todo.dollarValue && this.props.todo.dollarValue !== 0) {
      const displayValue =
        "$" +
        this.props.todo.dollarValue
          .toFixed(0)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,");
      let badgeClass = "badge badge-pill badge-info";

      if (this.props.isToDoHighDollarValue(this.props.todo)) {
        badgeClass = "badge badge-pill badge-success";
      }

      jsx.push(
        <span
          key={"todolistitem_dollarvaluebadge_" + this.props.todo.id}
          className={badgeClass}
        >
          {displayValue}
        </span>
      );
    }

    return jsx;
  }
}

export default ToDoListItem;
