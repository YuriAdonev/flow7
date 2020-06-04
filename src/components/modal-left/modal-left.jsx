import React from 'react';

import './modal-left.scss';
import Logo from "../nav/logo/logo";

const ModalLeft = ({ children, title, onModalClose, isOpen }) => {
  return (
    <div
      className={`modal-left${isOpen ? ' modal-left--active' : ''}`}
      onClick={onModalClose}
    >
      <div
        className="modal-left__wrap"
        onClick={(evt) => evt.stopPropagation()}
      >
        <div className="modal-left__left">
          <div
            className="logo"
            onClick={onModalClose}
          >
            <svg width="31" height="19" viewBox="0 0 31 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.2 18.096H11.496V3.984H4.704V18.096H0V0H16.2V18.096Z" />
              <path d="M23.256 3.984H15.696V0H30.552L20.184 18.096H15L23.256 3.984Z" fillOpacity="0.5"/>
            </svg>
          </div>
          <button
            className="modal-left__close"
            type="button"
            onClick={onModalClose}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.0117 6.26172V7.73828H3.87109L8.05469 11.957L7 13.0117L0.988281 7L7 0.988281L8.05469 2.04297L3.87109 6.26172H13.0117Z"/>
            </svg>
          </button>
        </div>
        <div className="modal-left__content">
          <div className="modal-left__title">{title}</div>
          {children}
        </div>
      </div>
    </div>
  )
};

export default ModalLeft;
