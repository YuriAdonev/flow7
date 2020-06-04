import React from 'react';
import { NavLink } from 'react-router-dom';

import './slave-nav-item.scss';

const SlaveNavItem = ({ name, link }) => {

  return (
    <li
      key={name}
      className="slave-nav-item"
    >
      <NavLink
        to={`/${link}`}
        className="slave-nav-item__link"
        exact
      >
        {name}
      </NavLink>
    </li>
  );
};

export default SlaveNavItem;
