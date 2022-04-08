import React, { Component } from "react";
import ReactDOM, { createPortal } from "react-dom";

export default class Portal extends Component {
  render() {
    const { selector } = this.props;
    return ReactDOM.createPortal(
      this.props.children,
      document.querySelector(selector)
    );
  }
}
