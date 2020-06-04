import React, { Fragment } from 'react';

import './slave-nav-list.scss';

import SlaveNavItem from "../slave-nav-item/slave-nav-item";

const SlaveNavList = (props) => {
  let slaveNavExtendedList = '';
  let slaveNavSublistList = '';

  if (props.slaveNavExtended !== '') {
    slaveNavExtendedList = props.slaveNavExtended.list.map((item) => (
      <SlaveNavItem
        key={item.name}
        { ...item }
      />)
    );
  }

  if (props.slaveNavSublist !== '') {
    slaveNavSublistList = props.slaveNavSublist.map((item) => (
      <SlaveNavItem
        key={item.name}
        {...item}
      />)
    );
  }

  const slaveNavItems = props.slaveNavList.map((item) => (
    <SlaveNavItem
      key={item.name}
      { ...item }
    />)
  );

  return (
    <Fragment>
      <ul className="slave-nav__list">
        {slaveNavItems}
      </ul>
      {props.slaveNavExtended === '' ? '' : (
        <div className="slave-nav-extended">
          <div className="slave-nav-extended__title">{props.slaveNavExtended.title}</div>
          <div className="slave-nav-extended__list">
            {slaveNavExtendedList}
          </div>
        </div>
      )}
      {props.slaveNavSublist === '' ? '' : (
        <div className="slave-nav__sublist">
          {slaveNavSublistList}
        </div>
      )}
    </Fragment>
  );
};

export default SlaveNavList;
