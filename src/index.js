import React from "react";
import ReactDOM from "react-dom";

import "./styles/styles.css";

import Minter from "./components/Minter";
import TooltipPopover from "./components/TooltipPopover";
import Reveal from "./components/Reveal";
import Image from "./components/Image";

ReactDOM.render(
  <React.StrictMode>
    <Minter />
  </React.StrictMode>,
  document.getElementById("root")
);
