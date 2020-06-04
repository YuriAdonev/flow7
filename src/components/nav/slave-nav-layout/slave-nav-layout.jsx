import React, {useContext} from 'react';

import './slave-nav-layout.scss';
import {CurrentUserContext} from "../../../contexts/current-user";

const SlaveNavLayout = ({ title, children, isLight = false }) => {
  const [currentUserState, ] = useContext(CurrentUserContext);
  console.log('currentUserState', currentUserState);
  return (
    <div className={`slave-nav${isLight ? ' slave-nav--light' : ''}`}>
      <div className="slave-nav__header">
        <div className="slave-nav__avatar">
          {currentUserState.currentSite.image.id === undefined ? '' : (
            <img src={`${process.env.REACT_APP_API_HTTP + process.env.REACT_APP_API_BASE_URL}/uploads/${currentUserState.currentSite.image.id}`} alt=""/>
          )}
        </div>
        <div className="slave-nav__aside">
          <div className="slave-nav__name">{currentUserState.currentSite.name}</div>
          <div className="slave-nav__title">{title}</div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default SlaveNavLayout;
