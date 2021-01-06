import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ onDismiss, title, content, actions, streamTitle }) => {
  return ReactDOM.createPortal(
    <div onClick={onDismiss} className="ui dimmer visible modals active">
      <div
        onClick={(e) => e && e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{title}</div>
        <div className="content">Stream Title: {streamTitle}</div>
        <div className="content">{content}</div>
        <div className="actions">{actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
