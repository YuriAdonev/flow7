import React from 'react';
import { NavLink } from 'react-router-dom';

import SlaveNavLayout from '../../slave-nav-layout/slave-nav-layout';

const SlaveNavEquipmentsAndMaterials = () => {
  return (
    <SlaveNavLayout
      title="Оборудование и материалы"
    >
      <ul className="slave-nav__list">
        <li
          className="slave-nav-item"
        >
          <NavLink to="/equipment-and-materials" exact className="slave-nav-item__link">
            Учет оборудования
          </NavLink>
        </li>
        <li
          className="slave-nav-item"
        >
          <NavLink to="/equipment-and-materials/manufacturers" className="slave-nav-item__link">
            Производители
          </NavLink>
        </li>
        {/*<li*/}
        {/*  className="slave-nav-item"*/}
        {/*>*/}
        {/*  <NavLink to="/equipment-and-materials/experience" className="slave-nav-item__link">*/}
        {/*    Испытания*/}
        {/*  </NavLink>*/}
        {/*</li>*/}
        <li
          className="slave-nav-item"
        >
          <NavLink to="/equipment-and-materials/material-types" className="slave-nav-item__link">
            Типы материалов
          </NavLink>
        </li>
        <li
          className="slave-nav-item"
        >
          <NavLink to="/equipment-and-materials/equipment-types" className="slave-nav-item__link">
            Типы оборудования
          </NavLink>
        </li>
      </ul>
    </SlaveNavLayout>
  );
};

export default SlaveNavEquipmentsAndMaterials;
