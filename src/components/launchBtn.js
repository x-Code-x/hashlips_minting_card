import React, { useState } from "react";
import { createPortal } from "react-dom";
import Reveal from "./Reveal";

const LaunchBtn = props => {
  const [showTicket, setShowTicket] = useState(false);

  const dismissFn = () => setShowTicket(false);
  
  return (
    <div className="launcher__container">
      <button
        className="launcher__button"
        onClick={() => {
          setShowTicket(true);
          setTimeout(() => {
            setShowTicket(false);
          }, 2500);
        }}
      >
        Reveal!
      </button>
      {showTicket &&
        createPortal(
          <Reveal dismiss={dismissFn} />,
          document.getElementById("revealarea")
        )}
    </div>
  );
};

export default LaunchBtn;
