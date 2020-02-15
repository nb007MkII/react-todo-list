import React, { Component } from "react";
import {
  filterOptionAll,
  filterOptionCompleted,
  filterOptionIncomplete,
  filterOptionOverdue,
  filterOptionHighDollarValue,
  sortOrderDueDate,
  sortOrderDueDateDesc,
  sortOrderDollarValue,
  sortOrderDollarValueDesc,
  sortOrderDescription,
  sortOrderDescriptionDesc
} from "../App";
import Octicon, { Plus, TriangleRight } from "@primer/octicons-react";
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
              {this.renderCurrentSortOrder(so.val)}
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

  renderCurrentSortOrder(thisSortOrder) {
    if (thisSortOrder === this.props.currentSortOrder) {
      return (
        <React.Fragment>
          <Octicon icon={TriangleRight} />
        </React.Fragment>
      );
    }

    return <React.Fragment></React.Fragment>;
  }

  renderPills() {
    let jsx = [];

    console.log("renderPills: this.props.summaries", this.props.summaries);

    if (this.props.summaries) {
      let summaryItem = this.props.summaries.find(
        s => s.filterOption === filterOptionAll
      );
      let totalCount = 0;

      console.log("renderPills: summaryItem", summaryItem);

      if (summaryItem && summaryItem.totalToDos) {
        totalCount = summaryItem.totalToDos;
      }

      jsx.push(
        <span
          key="navbar_totalbadge"
          className="badge badge-pill badge-secondary"
          onClick={() => this.props.navBarBadgeClick(filterOptionAll)}
        >
          {totalCount} Total
        </span>
      );

      if (totalCount > 0) {
        // overdue
        summaryItem = this.props.summaries.find(
          s => s.filterOption === filterOptionOverdue
        );

        if (
          summaryItem &&
          summaryItem.totalToDos &&
          summaryItem.totalToDos > 0
        ) {
          jsx.push(
            <React.Fragment key="navbar_overduebadge">
              <span>&nbsp;</span>
              <span
                className="badge badge-pill badge-danger"
                onClick={() => this.props.navBarBadgeClick(filterOptionOverdue)}
              >
                {summaryItem.totalToDos} Overdue
              </span>
            </React.Fragment>
          );
        }

        // incomplete
        summaryItem = this.props.summaries.find(
          s => s.filterOption === filterOptionIncomplete
        );

        if (
          summaryItem &&
          summaryItem.totalToDos &&
          summaryItem.totalToDos > 0
        ) {
          jsx.push(
            <React.Fragment key="navbar_incompletebadge">
              <span>&nbsp;</span>
              <span
                className="badge badge-pill badge-info"
                onClick={() =>
                  this.props.navBarBadgeClick(filterOptionIncomplete)
                }
              >
                {summaryItem.totalToDos} Not Completed
              </span>
            </React.Fragment>
          );
        }

        // high dollar value
        summaryItem = this.props.summaries.find(
          s => s.filterOption === filterOptionHighDollarValue
        );

        if (
          summaryItem &&
          summaryItem.totalToDos &&
          summaryItem.totalToDos > 0
        ) {
          jsx.push(
            <React.Fragment key="navbar_highdollarvaluebadge">
              <span>&nbsp;</span>
              <span
                className="badge badge-pill badge-success"
                onClick={() =>
                  this.props.navBarBadgeClick(filterOptionHighDollarValue)
                }
              >
                {summaryItem.totalToDos} $$$
              </span>
            </React.Fragment>
          );
        }

        // complete
        summaryItem = this.props.summaries.find(
          s => s.filterOption === filterOptionCompleted
        );

        if (
          summaryItem &&
          summaryItem.totalToDos &&
          summaryItem.totalToDos > 0
        ) {
          jsx.push(
            <React.Fragment key="navbar_completedbadge">
              <span>&nbsp;</span>
              <span
                className="badge badge-pill badge-primary"
                onClick={() =>
                  this.props.navBarBadgeClick(filterOptionCompleted)
                }
              >
                {summaryItem.totalToDos} Completed
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
