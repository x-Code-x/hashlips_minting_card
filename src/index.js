import React from "react";
import ReactDOM from "react-dom";

import "./styles/styles.css";

import Minter from "./components/Minter";
import Reveal from "./components/Reveal";
import LaunchBtn from "./components/launchBtn";

ReactDOM.render(
  <React.StrictMode>
    <Minter />
    <Reveal />
  </React.StrictMode>,
  document.getElementById("root")
);
