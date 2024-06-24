import React from "react";
import "./Profile.css";

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-btn">
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
