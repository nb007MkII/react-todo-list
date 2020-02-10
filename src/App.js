import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";
import ToDoList from "./components/todolist";
import SampleDataGenerator from "./SampleData";
import NavBar from "./components/navbar";
import ToDoEditModal from "./components/todoeditmodal";
import Modal from "react-modal";

class App extends Component {
  state = {
    allTodos: [],
    todos: [],
    editingTodo: null
  };

  componentDidMount() {
    const sampleDataGenerator = new SampleDataGenerator();

    const sampleTodos = sampleDataGenerator.SampleData();

    this.setState({
      allTodos: sampleTodos,
      todos: sampleTodos,
      editingTodo: null
    });
  }

  render() {
    return (
      <React.Fragment>
        <main className="container">
          <NavBar
            todos={this.state.allTodos}
            isToDoCompleted={this.isToDoCompleted}
            isToDoOverdue={this.isToDoOverdue}
            isToDoHighDollarValue={this.isToDoHighDollarValue}
            navBarBadgeClick={this.navBarBadgeClick}
            addButtonClick={this.addButtonClick}
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
            cancelEdit={this.cancelEdit}
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
              Id: {this.state.deletingTodo ? this.state.deletingTodo.id : ""}
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
              onClick={() => this.cancelEdit()}
            >
              Nope, Do Not Delete
            </button>
          </Modal>
        </main>
      </React.Fragment>
    );
  }

  /// click event handler for the badges in the nav bar
  navBarBadgeClick = option => {
    const displayTheseDodos = this.getDisplayTodos(this.state.allTodos, option);

    console.log(displayTheseDodos);

    this.setState({ todos: displayTheseDodos });
  };

  /// get the todos to be displayed based on a passed in filter option (using constants defined at the bottom of this module)
  /// if option is null then state will be checked to see if there is a 'current' option
  getDisplayTodos = (allTodos, option) => {
    let todos = allTodos;

    if (!option && option !== 0) {
      option = this.state.currentOption;
    }

    if (!option) {
      option = displayOptionAll;
    }

    switch (option) {
      case displayOptionCompleted: {
        todos = allTodos.filter(t => this.isToDoCompleted(t));
        break;
      }
      case displayOptionIncomplete: {
        todos = allTodos.filter(t => !this.isToDoCompleted(t));
        break;
      }
      case displayOptionOverdue: {
        todos = allTodos.filter(t => this.isToDoOverdue(t));
        break;
      }
      case displayOptionHighDollarValue: {
        todos = allTodos.filter(t => this.isToDoHighDollarValue(t));
        break;
      }
      default: {
      }
    }

    this.setState({ currentOption: option });

    return todos;
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
    if (todo && todo.id) {
      // open  modal
      this.setState({ editingTodo: todo, deletingTodo: null });
    }
  };

  // saves the passed-in ToDo back to the state. used in both Creates and Updates.
  saveEditTodo = saveTodo => {
    if (saveTodo) {
      const allTodos = [...this.state.allTodos];

      if (saveTodo.id) {
        // updating existing todo
        const thisTodo = allTodos.find(t => t.id === saveTodo.id);
        const index = allTodos.indexOf(thisTodo);

        allTodos[index] = { ...saveTodo };
      } else {
        // adding a new todo
        // generate a new id here since this demo is not backed by a database or api
        allTodos
          .sort(function(a, b) {
            return a.id - b.id;
          })
          .reverse();

        saveTodo.id = allTodos[0] + 1;

        allTodos.push(saveTodo);
      }

      const displayTheseDodos = this.getDisplayTodos(allTodos, null);

      this.setState({
        allTodos,
        todos: displayTheseDodos,
        editingTodo: null,
        deletingTodo: null
      });
    }
  };

  /// close modals without saving anything
  cancelEdit = () => {
    // close modal
    this.setState({ editingTodo: null, deletingTodo: null });
  };

  /// show the edit modal for a new ToDo
  addButtonClick = () => {
    const newToDo = {
      description: "",
      completed: false
    };

    this.setState({ editingTodo: newToDo, deletingTodo: null });
  };

  /// shows the edit modal for a given ToDo
  showDeleteModal = todo => {
    if (todo && todo.id) {
      // open  modal
      this.setState({ deletingTodo: todo, editingTodo: null });
    }
  };

  /// delete the passed-in ToDo from state
  deleteTodo = deleteTodo => {
    if (deleteTodo && deleteTodo.id) {
      const newToDos = this.state.allTodos.filter(t => t.id !== deleteTodo.id);
      const displayTheseDodos = this.getDisplayTodos(newToDos, null);

      this.setState({
        allTodos: newToDos,
        todos: displayTheseDodos,
        editingTodo: null,
        deletingTodo: null
      });
    }
  };
}

export default App;
export const displayOptionAll = 0;
export const displayOptionCompleted = 1;
export const displayOptionIncomplete = 2;
export const displayOptionOverdue = 4;
export const displayOptionHighDollarValue = 5;
