import React from 'react';
import { NavLink } from 'react-router-dom';

import SlaveNavLayout from '../../slave-nav-layout/slave-nav-layout';

const SlaveNavWorks = () => {
  return (
    <SlaveNavLayout
      title="Производство работ"
    >
      <ul className="slave-nav__list">
        <li
          className="slave-nav-item"
        >
          <NavLink to="/works/shifts" exact className="slave-nav-item__link">
            Календарь смен
          </NavLink>
        </li>
        <li
          className="slave-nav-item"
        >
          <NavLink to="/works/calendar" className="slave-nav-item__link">
            Календарь работ
          </NavLink>
        </li>
        <li
          className="slave-nav-item"
        >
          <NavLink to="/works/add" className="slave-nav-item__link">
            Добавить работы
          </NavLink>
        </li>
        <li
          className="slave-nav-item"
        >
          <NavLink to="/works/logs" className="slave-nav-item__link">
            Сварочный журнал
          </NavLink>
        </li>
        <li
          className="slave-nav-item"
        >
          <NavLink to="/works/report" className="slave-nav-item__link">
            Отчеты по работам
          </NavLink>
        </li>
      </ul>
    </SlaveNavLayout>
  );
};

export default SlaveNavWorks;
