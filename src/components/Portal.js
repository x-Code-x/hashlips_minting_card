import React, { useEffect, Component } from "react";
import ReactDOM, { createPortal } from "react-dom";


const Portal = ({children}) => {
  const mount = document.getElementById("portal");
  const el = document.createElement("div");

  useEffect(() => {
    mount.appendChild(el);
    return () => mount.removeChild(el);
  }, [el, mount]);

  return createPortal(children, el)
};

export default Portal;
