import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";
import ToDoList from "./components/todolist";
import SampleDataGenerator from "./SampleData";
import NavBar from "./components/navbar";
import ToDoEdit from "./components/todoedit";

class App extends Component {
  state = {
    allTodos: [],
    todos: [],
    editingId: -1
  };

  componentDidMount() {
    const sampleDataGenerator = new SampleDataGenerator();

    const sampleTodos = sampleDataGenerator.SampleData();

    this.setState({ allTodos: sampleTodos, todos: sampleTodos });
  }

  navBarBadgeClick(option) {
    console.log(this);

    /*
      let todos = this.todos;

    switch (option) {
      case 1: {
        // completed todos
        todos = this.state.allTodos.filter(t => this.isToDoCompleted(t));
        break;
      }
      case 2: {
        // overdue todos
        todos = this.state.allTodos.filter(t => this.isToDoOverdue(t));
        break;
      }
      default: {
      }
    }

    this.setState({ todos });
  */
  }

  render() {
    return (
      <React.Fragment>
        <main className="container">
          <NavBar
            todos={this.state.todos}
            isToDoCompleted={this.isToDoCompleted}
            isToDoOverdue={this.isToDoOverdue}
            navBarBadgeClick={this.navBarBadgeClick}
            thisIsAPropOnNavBar={true}
          ></NavBar>
          <ToDoList
            todos={this.state.todos}
            editTodo={this.editTodo}
            isToDoCompleted={this.isToDoCompleted}
            isToDoOverdue={this.isToDoOverdue}
          ></ToDoList>
          <ToDoEdit
            isOpen={
              this.state.editingId && this.state.editingId > 0 ? true : true
            }
            editingId={this.state.editingId}
          ></ToDoEdit>
        </main>
      </React.Fragment>
    );
  }

  isToDoOverdue(todo) {
    if (
      todo &&
      (!todo.completed || todo.completed === false) &&
      todo.dueDate &&
      todo.dueDate < new Date()
    ) {
      return true;
    }

    return false;
  }

  isToDoCompleted(todo) {
    if (todo && todo.completed && todo.completed === true) {
      return true;
    }

    return false;
  }
}

export default App;
