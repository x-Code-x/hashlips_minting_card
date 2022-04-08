import React from "react";
import "../styles/styles.css";

//export default function Reveal() {
//  return (
//    <div className="Reveal">
//      <h1>Reveal</h1>
//      <div className="coin"></div>
//    </div>
//  );
//}
const SnackBar = ({ message = "Hello world!", dismiss }) => (
  <div className="snackbar__container">
    <span className="snackbar__message">{message}</span>
    <span className="snackbar__dismiss" icon="fa-close" onClick={dismiss}>
      x
    </span>
  </div>
);

export default SnackBar;
