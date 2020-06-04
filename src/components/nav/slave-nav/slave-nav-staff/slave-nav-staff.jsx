import React from 'react';
import { NavLink } from 'react-router-dom';

import SlaveNavLayout from '../../slave-nav-layout/slave-nav-layout';

const SlaveNavStaff = () => {
  return (
    <SlaveNavLayout
      title="Персонал"
    >
      <ul className="slave-nav__list">
        {/*<li*/}
        {/*  className="slave-nav-item"*/}
        {/*>*/}
        {/*  <NavLink to="/staff/subdivisions" className="slave-nav-item__link">*/}
        {/*    Подразделения*/}
        {/*  </NavLink>*/}
        {/*</li>*/}
        {/*<li*/}
        {/*  className="slave-nav-item"*/}
        {/*>*/}
        {/*  <NavLink to="/staff/brigades" className="slave-nav-item__link">*/}
        {/*    Бригады*/}
        {/*  </NavLink>*/}
        {/*</li>*/}
        {/*<li*/}
        {/*  className="slave-nav-item"*/}
        {/*>*/}
        {/*  <NavLink to="/staff/welders" className="slave-nav-item__link">*/}
        {/*    Сварщики*/}
        {/*  </NavLink>*/}
        {/*</li>*/}
        <li
          className="slave-nav-item"
        >
          <NavLink to="/staff" exact className="slave-nav-item__link">
            Сотрудники
          </NavLink>
        </li>
        <li
          className="slave-nav-item"
        >
          <NavLink to="/staff/structure" className="slave-nav-item__link">
            Структура организации
          </NavLink>
        </li>
        <li
          className="slave-nav-item"
        >
          <NavLink to="/staff/positions" className="slave-nav-item__link">
            Должности
          </NavLink>
        </li>
      </ul>
      <div className="slave-nav-extended">
        <div className="slave-nav-extended__title">Отчеты</div>
        <ul className="slave-nav-extended__list">
          <li
            className="slave-nav-item"
          >
            <NavLink to="/123" className="slave-nav-item__link">
              Отчет по организации
            </NavLink>
          </li>
        </ul>
      </div>
    </SlaveNavLayout>
  );
};

export default SlaveNavStaff;
