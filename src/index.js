import React from "react";
import ReactDOM from "react-dom";

import "./styles/styles.css";

import Minter from "./components/Minter";
import TooltipPopover from "./components/TooltipPopover";
import Reveal from "./components/Reveal";

ReactDOM.render(
  <React.StrictMode>
    <Minter />
    <Reveal />
  </React.StrictMode>,
  document.getElementById("root")
);
