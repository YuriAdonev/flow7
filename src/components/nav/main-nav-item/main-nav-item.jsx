import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './main-nav-item.scss';

const MainNavItem = (props) => {
  return (
    <li
      key={props.submenu}
      className={`main-nav__item${props.currentItem === props.submenu ? ' main-nav__item--active' : ''}`}
      onClick={() => props.onMainNavItemClick(props.submenu)}
    >
      {props.link !== undefined ? (
        <Link to={`/${props.link}`}>
          {props.icon}
          <span className="main-nav__tooltip">{props.name}</span>
        </Link>
      ) : (
        <Fragment>
          {props.icon}
          <span className="main-nav__tooltip">{props.name}</span>
        </Fragment>
      )}
    </li>
  );
};

export default MainNavItem;
