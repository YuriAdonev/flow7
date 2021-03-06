import React from 'react';

import './modal.scss';

import Header from '../header/header';

const Modal = ({ onClose, headerData, isWide = false, children }) => {
  return (
    <div className={`modal${isWide ? ' modal--wide' : ''}`}>
      <div className="modal__wrap">
        <div
          className="modal__close"
          onClick={onClose}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.4023 1.88672L8.28906 7L13.4023 12.1133L12.1133 13.4023L7 8.28906L1.88672 13.4023L0.597656 12.1133L5.71094 7L0.597656 1.88672L1.88672 0.597656L7 5.71094L12.1133 0.597656L13.4023 1.88672Z"/>
          </svg>
        </div>
        <Header
          headerData={headerData}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
