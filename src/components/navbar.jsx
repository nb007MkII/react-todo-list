import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          ToDo List {this.renderPills()}
        </a>
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
          onClick={() => this.props.badgeClick(0)}
        >
          {totalCount}
        </span>
      );

      if (totalCount > 0) {
        const completedCount = this.props.todos.filter(t =>
          this.props.isToDoCompleted(t)
        ).length;

        if (completedCount > 0) {
          jsx.push(
            <span
              key="navbar_completedbadge"
              className="badge badge-pill badge-success"
              onClick={() => this.props.badgeClick(1)}
            >
              {completedCount}
            </span>
          );
        }

        const overdueCount = this.props.todos.filter(t =>
          this.props.isToDoOverdue(t)
        ).length;

        if (overdueCount > 0) {
          jsx.push(
            <span
              key="navbar_overduebadge"
              className="badge badge-pill badge-danger"
              onClick={() => this.props.badgeClick(2)}
            >
              {overdueCount}
            </span>
          );
        }
      }
    }

    return jsx;
  }
}

export default NavBar;
