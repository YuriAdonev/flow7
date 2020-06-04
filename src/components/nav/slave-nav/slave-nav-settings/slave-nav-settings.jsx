import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { CurrentUserContext } from '../../../../contexts/current-user'
import SlaveNavLayout from '../../slave-nav-layout/slave-nav-layout';

const SlaveNavSettings = ({ onMainNavItemClick }) => {
  const [currentUserState, ] = useContext(CurrentUserContext);

  return (
    <SlaveNavLayout
      title="Настройки организации"
    >
      <ul className="slave-nav__list">
        <li
          className="slave-nav-item"
        >
          <NavLink to="/settings/users" className="slave-nav-item__link">
            Участники
          </NavLink>
        </li>
        <li
          className="slave-nav-item"
        >
          <NavLink to="/settings/apps" className="slave-nav-item__link">
            Приложения
          </NavLink>
        </li>
        <li
          className="slave-nav-item"
        >
          <NavLink to="/settings/widgets" className="slave-nav-item__link">
            Виджеты
          </NavLink>
        </li>
        <li
          className="slave-nav-item"
        >
          <NavLink to="/settings/logs" className="slave-nav-item__link">
            Журнал
          </NavLink>
        </li>
        <li
          className="slave-nav-item"
        >
          <NavLink to="/settings/notification" className="slave-nav-item__link">
            Настройка оповещений
          </NavLink>
        </li>
      </ul>
    </SlaveNavLayout>
  );
};

export default SlaveNavSettings;
