import React from "react";
import ReactDOM from "react-dom";
import Minter from "./components/Minter";
import Reveal from "./components/Reveal";
import "./styles/styles.css";

ReactDOM.render(
  <React.StrictMode>
    <Minter />
    <div id="portal"></div>
  </React.StrictMode>,
  document.getElementById("root")
);
