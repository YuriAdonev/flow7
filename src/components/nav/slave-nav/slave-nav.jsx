import React from 'react';

// import './slave-nav.scss';

import SlaveNavList from '../slave-nav-list/slave-nav-list';

const SlaveNav = (props) => {
  const currentNav = props.mainNavSecondary[props.currentItem];

  return (
    <div className={`slave-nav${props.currentItem === 'home' || props.currentItem === 'account' ? ' slave-nav--light' : ''}`}>
      <div className="slave-nav__header">
        <div className="slave-nav__title">{currentNav.title}</div>
        <div className="slave-nav__close">
          <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.9844 1.42188L8.40625 7L13.9844 12.5781L12.5781 13.9844L7 8.40625L1.42188 13.9844L0.015625 12.5781L5.59375 7L0.015625 1.42188L1.42188 0.015625L7 5.59375L12.5781 0.015625L13.9844 1.42188Z"/>
          </svg>
        </div>
      </div>
      <SlaveNavList
        currentPage={props.currentPage}
        slaveNavList={currentNav.list}
        slaveNavExtended={currentNav.extended}
        slaveNavSublist={currentNav.sublist}
      />
    </div>
  );
};

export default SlaveNav;
