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
const TicketBar = ({ message = "Hello world!", dismiss }) => (
  <div className="ticketbar__container">
    <span className="ticketbar__message">{message}</span>
    <span className="ticketbar__dismiss" icon="fa-close" onClick={dismiss}>
      x
    </span>
  </div>
);

export default TicketBar;
