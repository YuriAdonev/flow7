import React, {useContext, useState, useEffect} from 'react';

import SlaveNavList from '../../slave-nav-list/slave-nav-list';
import {CurrentUserContext} from "../../../../contexts/current-user";
import {NavLink} from "react-router-dom";
import SlaveNavItem from "../../slave-nav-item/slave-nav-item";
import SlaveNavLayout from "../../slave-nav-layout/slave-nav-layout";

const SlaveNavDirectories = (props) => {
  const [currentUserState, ] = useContext(CurrentUserContext);
  const [directoriesList, setDirectoriesList] = useState([]);

  useEffect(() => {
    if (currentUserState.directories === null) {
      return;
    }
    const userDirectories = [];
    currentUserState.directories.forEach(item => {
      if (item.attributes.show_in_menu) {
        userDirectories.push({ name: item.attributes.name, link: `directories/users/${item.attributes.slug}`});
      }
    });
    setDirectoriesList(userDirectories);
  }, [currentUserState.directories]);

  const directories = directoriesList.map((item) => (
    <SlaveNavItem
      key={item.name}
      { ...item }
    />)
  );

  return (
    <SlaveNavLayout
      title="Справочники"
    >
      <ul className="slave-nav__list">
        <li
          className="slave-nav-item"
        >
          <NavLink
            to="/directories"
            className="slave-nav-item__link"
            exact
          >
            Все справочники
          </NavLink>
        </li>
        {directories}
        <li
          className="slave-nav-item"
        >
          <NavLink
            to="/directories/units"
            className="slave-nav-item__link"
            exact
          >
            Условные обозначения
          </NavLink>
        </li>
      </ul>
    </SlaveNavLayout>
  );
};

export default SlaveNavDirectories;
