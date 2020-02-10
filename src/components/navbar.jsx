import React, { Component } from "react";
import {
  displayOptionAll,
  displayOptionCompleted,
  displayOptionIncomplete,
  displayOptionOverdue,
  displayOptionHighDollarValue
} from "../App";
import Octicon, { Plus } from "@primer/octicons-react";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          ToDo List {this.renderPills()}
        </a>
        <div key="createNewToDoBtn" onClick={() => this.props.addButtonClick()}>
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
