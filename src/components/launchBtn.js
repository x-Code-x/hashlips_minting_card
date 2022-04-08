import React, { useState } from "react";
import { createPortal } from "react-dom";
import Reveal from "./Reveal";

const LaunchBtn = props => {
  const [showTicket, setShowTicket] = useState(false);
  const [fixedTicket, setFixedTicket] = useState(false);

  const dismissFn = () => setShowTicket(false);
  const toggleFixedTicket = () => setFixedTicket(!fixedTicket);

  return (
    <div className="launcher__container">
      <span className="launcher__message">Click to trigger a message!</span>
      <button
        className="launcher__button"
        onClick={() => {
          setShowTicket(true);
          if (!fixedTicket) {
            setTimeout(() => {
              setShowTicket(false);
            }, 2500);
          }
        }}
      >
        Click me!
      </button>
      <div className="launcher__fixed-selector">
        <input id="fixedticketbar" type="checkbox" onChange={toggleFixedTicket} />
        <label htmlFor="fixedticketbar">Fixed</label>
      </div>
      {showTicket &&
        createPortal(
          <Reveal dismiss={dismissFn} />,
          document.getElementById("superticketcontainer")
        )}
    </div>
  );
};

export default LaunchBtn;
