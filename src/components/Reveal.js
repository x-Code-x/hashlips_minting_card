import React, { Component } from "react";
import ReactDOM, { createPortal } from "react-dom";


function Reveal() {
  // Creating a portal
  return ReactDOM.createPortal(
    <h1>Reveal Portal</h1>,
    document.getElementById('portal')
 )
}
  
export default Reveal;
