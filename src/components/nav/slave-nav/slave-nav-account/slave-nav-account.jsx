import React from 'react';
import { NavLink } from 'react-router-dom';

import SlaveNavLayout from '../../slave-nav-layout/slave-nav-layout';

const SlaveNavAccount = () => {
  return (
    <SlaveNavLayout
      title="Аккаунт"
      isLight={true}
    >
      <ul className="slave-nav__list">
        <li
          className="slave-nav-item"
        >
          <NavLink to="/account" exact className="slave-nav-item__link">
            Профиль
          </NavLink>
        </li>
        <li
          className="slave-nav-item"
        >
          <NavLink to="/account/sessions" className="slave-nav-item__link">
            Сессии
          </NavLink>
        </li>
        <li
          className="slave-nav-item"
        >
          <NavLink to="/account/logs" className="slave-nav-item__link">
            Журнал
          </NavLink>
        </li>
        <li
          className="slave-nav-item"
        >
          <NavLink to="/account/notification" className="slave-nav-item__link">
            Оповещения
          </NavLink>
        </li>
        <li
          className="slave-nav-item"
        >
          <NavLink to="/account/organizations" className="slave-nav-item__link">
            Мои организации
          </NavLink>
        </li>
      </ul>
    </SlaveNavLayout>
  );
};

export default SlaveNavAccount;
