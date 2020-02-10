import React, { Component } from "react";
import {
  displayOptionAll,
  displayOptionCompleted,
  displayOptionIncomplete,
  displayOptionOverdue,
  displayOptionHighDollarValue,
  sortOrderDueDate,
  sortOrderDueDateDesc,
  sortOrderDollarValue,
  sortOrderDollarValueDesc,
  sortOrderDescription,
  sortOrderDescriptionDesc
} from "../App";
import Octicon, { Plus } from "@primer/octicons-react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

class NavBar extends Component {
  render() {
    const sortOrders = [
      { desc: "By Due Date", val: sortOrderDueDate },
      { desc: "By Due Date Reverse", val: sortOrderDueDateDesc },
      { desc: "By Dollar Value", val: sortOrderDollarValue },
      { desc: "By Dollar Value Reverse", val: sortOrderDollarValueDesc },
      { desc: "By Description", val: sortOrderDescription },
      { desc: "By Description Reverse", val: sortOrderDescriptionDesc }
    ];

    return (
      <nav className="navbar navbar-light bg-light">
        <div className="navbar-brand" style={{ userSelect: "none" }}>
          ToDo List {this.renderPills()}
        </div>
        <DropdownButton id="dropdown-item-button" title="Sort">
          {sortOrders.map(so => (
            <Dropdown.Item
              key={"sort_order_item_" + so.val}
              as="button"
              onClick={() => {
                this.props.sortList(so.val);
              }}
            >
              {so.desc}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <div
          key="createNewToDoBtn"
          onClick={() => {
            this.props.showEditModal({ completed: false });
          }}
        >
          <Octicon icon={Plus} />
        </div>
      </nav>
    );
  }

  renderPills() {
    let jsx = [];

    if (this.props.todos) {
      const totalCount = this.props.todos.length;

      jsx.push(
        <span
          key="navbar_totalbadge"
          className="badge badge-pill badge-secondary"
          onClick={() => this.props.navBarBadgeClick(displayOptionAll)}
        >
          {totalCount} Total
        </span>
      );

      if (totalCount > 0) {
        // overdue
        const overdueCount = this.props.todos.filter(t =>
          this.props.isToDoOverdue(t)
        ).length;

        if (overdueCount > 0) {
          jsx.push(
            <React.Fragment key="navbar_overduebadge">
              <span>&nbsp;</span>
              <span
                className="badge badge-pill badge-danger"
                onClick={() =>
                  this.props.navBarBadgeClick(displayOptionOverdue)
                }
              >
                {overdueCount} Overdue
              </span>
            </React.Fragment>
          );
        }

        // incomplete
        const incompleteCount = this.props.todos.filter(
          t => !this.props.isToDoCompleted(t)
        ).length;

        if (incompleteCount > 0) {
          jsx.push(
            <React.Fragment key="navbar_incompletebadge">
              <span>&nbsp;</span>
              <span
                className="badge badge-pill badge-info"
                onClick={() =>
                  this.props.navBarBadgeClick(displayOptionIncomplete)
                }
              >
                {incompleteCount} Not Completed
              </span>
            </React.Fragment>
          );
        }

        // high dollar value
        const highDollarValueCount = this.props.todos.filter(t =>
          this.props.isToDoHighDollarValue(t)
        ).length;

        if (highDollarValueCount > 0) {
          jsx.push(
            <React.Fragment key="navbar_highdollarvaluebadge">
              <span>&nbsp;</span>
              <span
                className="badge badge-pill badge-success"
                onClick={() =>
                  this.props.navBarBadgeClick(displayOptionHighDollarValue)
                }
              >
                {highDollarValueCount} $$$
              </span>
            </React.Fragment>
          );
        }

        // complete
        const completedCount = this.props.todos.filter(t =>
          this.props.isToDoCompleted(t)
        ).length;

        if (completedCount > 0) {
          jsx.push(
            <React.Fragment key="navbar_completedbadge">
              <span>&nbsp;</span>
              <span
                className="badge badge-pill badge-primary"
                onClick={() =>
                  this.props.navBarBadgeClick(displayOptionCompleted)
                }
              >
                {completedCount} Completed
              </span>
            </React.Fragment>
          );
        }
      }
    }

    return jsx;
  }
}

export default NavBar;
