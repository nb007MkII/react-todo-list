import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";
import ToDoList from "./components/todolist";
import NavBar from "./components/navbar";
import ToDoEditModal from "./components/todoeditmodal";
import Modal from "react-modal";

class App extends Component {
  state = {
    todos: [],
    summaries: [],
    editingTodo: null
  };

  componentDidMount() {
    this.getToDos();
  }

  render() {
    return (
      <React.Fragment>
        <main className="container">
          <NavBar
            isToDoCompleted={this.isToDoCompleted}
            isToDoOverdue={this.isToDoOverdue}
            isToDoHighDollarValue={this.isToDoHighDollarValue}
            navBarBadgeClick={this.navBarBadgeClick}
            showEditModal={this.showEditModal}
            currentSortOrder={this.state.currentSortOrder}
            sortList={this.sortList}
            summaries={this.state.summaries}
          ></NavBar>
          <ToDoList
            todos={this.state.todos}
            showEditModal={this.showEditModal}
            showDeleteModal={this.showDeleteModal}
            isToDoCompleted={this.isToDoCompleted}
            isToDoOverdue={this.isToDoOverdue}
            isToDoHighDollarValue={this.isToDoHighDollarValue}
          ></ToDoList>
          {/* 'ToDoEditModal' is a react component hosting a modal */}
          <ToDoEditModal
            isOpen={
              this.state.editingTodo && !this.state.deletingTodo ? true : false
            }
            todo={this.state.editingTodo}
            saveEditTodo={this.saveEditTodo}
            hideModals={this.hideModals}
          ></ToDoEditModal>
          {/* The modal below is an in-line implementation of a modal */}
          <Modal
            isOpen={
              this.state.deletingTodo && !this.state.editingTodo ? true : false
            }
            shouldCloseOnOverlayClick={false}
            style={{ content: { bottom: "undefined" } }}
          >
            <p>
              Id:{" "}
              {this.state.deletingTodo ? this.state.deletingTodo.todoid : ""}
            </p>
            <p>Are you sure you want to delete this ToDo?</p>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={() => this.deleteTodo(this.state.deletingTodo)}
            >
              Yes, Delete
            </button>
            <button
              className="btn btn-cancel"
              onClick={() => this.hideModals()}
            >
              Nope, Do Not Delete
            </button>
          </Modal>
        </main>
      </React.Fragment>
    );
  }

  /// click event handler for the badges in the nav bar
  navBarBadgeClick = filterOption => {
    this.getToDos(filterOption);
  };

  /// sort the passed-in array of ToDos
  sortTodos = (todos, sortOrder) => {
    if (!sortOrder && sortOrder !== 0) {
      sortOrder = this.state.currentSortOrder;
    }

    if (!sortOrder) {
      sortOrder = sortOrderDueDate;
    }

    switch (sortOrder) {
      case sortOrderDueDate:
      case sortOrderDueDateDesc: {
        todos.sort(function(a, b) {
          let aa = a,
            bb = b;

          if (sortOrder === sortOrderDueDateDesc) {
            aa = b;
            bb = a;
          }

          return (
            (aa.dueDate ? aa.dueDate.getTime() : 0) -
            (bb.dueDate ? bb.dueDate.getTime() : 0)
          );
        });
        break;
      }
      case sortOrderDollarValue:
      case sortOrderDollarValueDesc: {
        todos.sort(function(a, b) {
          let aa = a,
            bb = b;

          if (sortOrder === sortOrderDollarValueDesc) {
            aa = b;
            bb = a;
          }

          return (
            (aa.dollarValue ? aa.dollarValue : 0) -
            (bb.dollarValue ? bb.dollarValue : 0)
          );
        });
        break;
      }
      case sortOrderDescription:
      case sortOrderDescriptionDesc: {
        todos.sort(function(a, b) {
          let aa = (a.description ? a.description : "").toUpperCase(),
            bb = (b.description ? b.description : "").toUpperCase();

          if (sortOrder === sortOrderDescriptionDesc) {
            aa = (b.description ? b.description : "").toUpperCase();
            bb = (a.description ? a.description : "").toUpperCase();
          }

          if (aa > bb) {
            return 1;
          }

          if (aa < bb) {
            return -1;
          }

          return 0;
        });
        break;
      }
      default: {
        // shut up es lint
      }
    }

    return { todos, sortOrder };
  };

  /// returns a boolean indicating whether a given ToDo is overdue
  isToDoOverdue = todo => {
    if (
      todo &&
      (!todo.completed || todo.completed === false) &&
      todo.dueDate &&
      todo.dueDate < new Date()
    ) {
      return true;
    }

    return false;
  };

  /// returns a boolean indicating whether a given ToDo is completed
  isToDoCompleted = todo => {
    if (todo && todo.completed && todo.completed === true) {
      return true;
    }

    return false;
  };

  /// returns a boolean indicating whether a given ToDo has a high dollar value (>= $500)
  isToDoHighDollarValue = todo => {
    if (todo && todo.dollarValue && todo.dollarValue >= 500) {
      return true;
    }

    return false;
  };

  /// shows the edit modal for a given ToDo
  showEditModal = todo => {
    if (todo) {
      // open  modal
      this.setState({ editingTodo: todo, deletingTodo: null });
    }
  };

  // saves the passed-in ToDo back to the state. used in both Creates and Updates.
  saveEditTodo = saveTodo => {
    if (saveTodo) {
      let verb = "post";

      if (saveTodo.todoid) {
        // updating an existing todo
        verb = "put";
      }

      fetch("https://localhost:44312/api/todos/", {
        method: verb,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(saveTodo)
      })
        .then(() => {
          this.getToDos();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  /// close modals without saving anything
  hideModals = () => {
    // close modal
    this.setState({ editingTodo: null, deletingTodo: null });
  };

  /// shows the edit modal for a given ToDo
  showDeleteModal = todo => {
    if (todo && todo.todoid) {
      // open  modal
      this.setState({ deletingTodo: todo, editingTodo: null });
    }
  };

  /// delete the passed-in ToDo from state
  deleteTodo = deleteTodo => {
    if (deleteTodo && deleteTodo.todoid) {
      fetch("https://localhost:44312/api/todos/" + deleteTodo.todoid, {
        method: "delete"
      })
        .then(() => {
          this.getToDos();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  // sort the current list of ToDos (called from NavBar)
  sortList = sortOrder => {
    if (sortOrder || sortOrder === 0) {
      const displayTheseDodos = this.sortTodos(this.state.todos, sortOrder);

      this.setState({
        todos: displayTheseDodos.todos,
        currentFilterOption: displayTheseDodos.filterOption,
        currentSortOrder: displayTheseDodos.sortOrder,
        editingTodo: null,
        deletingTodo: null
      });
    }
  };

  // get ToDos from API and display them
  getToDos = filterOption => {
    if (!filterOption && filterOption !== 0) {
      filterOption = this.state.currentFilterOption;
    }

    if (!filterOption) {
      filterOption = filterOptionAll;
    }

    fetch("https://localhost:44312/api/todos?filteroption=" + filterOption)
      .then(response => response.json())
      .then(apiResponse => {
        // hacky fix to change deserialized json date strings into js dates
        apiResponse.toDos.forEach(t => {
          t.dueDate = t.dueDate ? new Date(t.dueDate) : null;
        });

        const displayTheseDodos = this.sortTodos(apiResponse.toDos);

        this.setState({
          todos: displayTheseDodos.todos,
          summaries: apiResponse.summaries,
          currentFilterOption: filterOption,
          currentSortOrder: displayTheseDodos.sortOrder,
          editingTodo: null,
          deletingTodo: null
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export default App;

export const filterOptionAll = 0;
export const filterOptionCompleted = 1;
export const filterOptionIncomplete = 2;
export const filterOptionOverdue = 4;
export const filterOptionHighDollarValue = 5;

export const sortOrderDueDate = 0;
export const sortOrderDueDateDesc = 1;
export const sortOrderDollarValue = 2;
export const sortOrderDollarValueDesc = 3;
export const sortOrderDescription = 4;
export const sortOrderDescriptionDesc = 5;
