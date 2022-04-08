import React, { useState } from "react";
import { createPortal } from "react-dom";
import Reveal from "./Reveal";

const LaunchBtn = props => {
  const [showSnack, setShowSnack] = useState(false);
  const [fixedSnack, setFixedSnack] = useState(false);

  const dismissFn = () => setShowSnack(false);
  const toggleFixedSnack = () => setFixedSnack(!fixedSnack);

  return (
    <div className="launcher__container">
      <span className="launcher__message">Click to trigger a message!</span>
      <button
        className="launcher__button"
        onClick={() => {
          setShowSnack(true);
          if (!fixedSnack) {
            setTimeout(() => {
              setShowSnack(false);
            }, 2500);
          }
        }}
      >
        Click me!
      </button>
      <div className="launcher__fixed-selector">
        <input id="fixedsnackbar" type="checkbox" onChange={toggleFixedSnack} />
        <label htmlFor="fixedsnackbar">Fixed</label>
      </div>
      {showSnack &&
        createPortal(
          <SnackBar dismiss={dismissFn} />,
          document.getElementById("supersnackbarcontainer")
        )}
    </div>
  );
};

export default LaunchBtn;
