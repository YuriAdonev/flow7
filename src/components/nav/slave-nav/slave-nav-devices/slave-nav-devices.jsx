import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import SlaveNavLayout from '../../slave-nav-layout/slave-nav-layout';
import {CurrentUserContext} from "../../../../contexts/current-user";

const SlaveNavDevices = () => {

  return (
    <SlaveNavLayout
      title="Устройства"
    >
      <ul className="slave-nav__list">
        <li
          className="slave-nav-item"
        >
          <NavLink to="/devices" exact className="slave-nav-item__link">
            Список устройств
          </NavLink>
        </li>
        {/*<li*/}
        {/*  className="slave-nav-item"*/}
        {/*>*/}
        {/*  <NavLink to="/devices/report" className="slave-nav-item__link">*/}
        {/*    Отчет по устройствам*/}
        {/*  </NavLink>*/}
        {/*</li>*/}
        {/*<li*/}
        {/*  className="slave-nav-item"*/}
        {/*>*/}
        {/*  <NavLink to="/devices/panel" className="slave-nav-item__link">*/}
        {/*    Панель устройств*/}
        {/*  </NavLink>*/}
        {/*</li>*/}
      </ul>
    </SlaveNavLayout>
  );
};

export default SlaveNavDevices;
