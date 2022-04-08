import React from 'react';
import posed from 'react-pose';
import ReactDOM from 'react-dom';
import { Portal } from 'react-portal';

import './styles.css';
import { Transition } from './Transition';

const MODAL_NODE = document.getElementById('modal-root');

const Shade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

const Modal = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }
});

function Reveal() {
  const [isVisible, setVisible] = React.useState(true);
  const toggle = () => setVisible(!isVisible);

  React.useEffect(() => {
    const interval = setInterval(toggle, 2000);
    return () => clearInterval(interval);
  });

  return (
    <Transition isVisible={isVisible}>
      {({ poseProps }) => (
        /* Unmount after after exit */
        <Portal node={MODAL_NODE}>
          <Shade {...poseProps} className="shade">
            <Modal {...poseProps} className="modal">
              Content
            </Modal>
          </Shade>
        </Portal>
      )}
    </Transition>
  );
}

const rootElement = document.getElementById('root');

export default Reveal;
