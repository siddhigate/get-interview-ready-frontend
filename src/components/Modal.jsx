import React from "react";

const Modal = ({title, closeModal, children}) => {
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal">
        <div className="modal-content">
          <button className="modal-close-btn" onClick={closeModal}>
            {" "}
            <i className="fas fa-times txt-red" id="modal-dismiss-btn"></i>
          </button>
          <div className="txt-dark fs-lg fw-bold"> {title}</div>
          <div className="txt-dark-gray lh-md">
            {children}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Modal;
