import React, { Component } from "react";
import Modal from "react-modal";

//http://reactcommunity.org/react-modal/

class ToDoEdit extends Component {
  toggleModal = key => event => {
    event.preventDefault();
    if (this.state.currentModal) {
      this.handleModalCloseRequest();
      return;
    }

    this.setState({
      ...this.state,
      currentModal: key
    });
  };

  handleModalCloseRequest = () => {
    // opportunity to validate something and keep the modal open even if it
    // requested to be closed
    this.setState({
      ...this.state,
      currentModal: null
    });
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} shouldCloseOnOverlayClick={false}>
        <p>edit todo {this.props.editingId}</p>
        <button onClick={this.toggleModal("todoedit")}>close</button>
      </Modal>
    );
  }
}

export default ToDoEdit;
