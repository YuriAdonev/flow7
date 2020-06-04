import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { CurrentUserContext } from '../../../../contexts/current-user'
import SlaveNavLayout from '../../slave-nav-layout/slave-nav-layout';

const SlaveNavHome = ({ onMainNavItemClick, applications }) => {
  const [currentUserState, ] = useContext(CurrentUserContext);

  return (
    <SlaveNavLayout
      title="Главная"
      isLight={true}
    >
      <ul className="slave-nav__list">
        {applications.devices ? (
          <li
            className="slave-nav-item"
            onClick={() => onMainNavItemClick('devices')}
          >
            <NavLink to="/devices" className="slave-nav-item__link">
              Устройства
            </NavLink>
          </li>
        ) : ''}
        <li
          className="slave-nav-item"
          onClick={() => onMainNavItemClick('works')}
        >
          <NavLink to="/works" className="slave-nav-item__link">
            Производство работ
          </NavLink>
        </li>
        {applications.staff ? (
          <li
            className="slave-nav-item"
            onClick={() => onMainNavItemClick('staff')}
          >
            <NavLink to="/staff" className="slave-nav-item__link">
              Персонал
            </NavLink>
          </li>
        ) : ''}
        {applications.equipment_and_materials ? (
        <li
          className="slave-nav-item"
          onClick={() => onMainNavItemClick('equipmentsAndMaterials')}
        >
          <NavLink to="/equipment-and-materials" className="slave-nav-item__link">
            Оборудование и материалы
          </NavLink>
        </li>
        ) : ''}
        {/*<li*/}
        {/*  className="slave-nav-item"*/}
        {/*  onClick={() => onMainNavItemClick('certifications')}*/}
        {/*>*/}
        {/*  <NavLink to="/certifications" className="slave-nav-item__link">*/}
        {/*    Аттестации*/}
        {/*  </NavLink>*/}
        {/*</li>*/}
        <li
          className="slave-nav-item"
          onClick={() => onMainNavItemClick('directories')}
        >
          <NavLink to="/directories" className="slave-nav-item__link">
            Справочники
          </NavLink>
        </li>
        <li
          className="slave-nav-item"
          onClick={() => onMainNavItemClick('settings')}
        >
          <NavLink to="/settings" className="slave-nav-item__link">
            Настройки организации
          </NavLink>
        </li>
        <li
          className="slave-nav-item"
        >
          <NavLink to="/upload" className="slave-nav-item__link">
            Загрузить данные
          </NavLink>
        </li>
        <li
          className="slave-nav-item"
        >
          <span className="slave-nav-item__link">
            Поиск по системе
          </span>
        </li>
      </ul>
    </SlaveNavLayout>
  );
};

export default SlaveNavHome;
