import React from 'react';

import './page-filter-drop-list.scss';

const PageFilterDropList = (props) => {
  const filterItems = props.filterList.map((item, index) => {
    return (
      <li
        key={index}
        className="page-filter-drop-list__item"
        onClick={() => props.onItemClick(item)}
      >{item}</li>
    );
  });

  return (
    <ul className={`page-filter-drop-list${props.isDisable ? ' disabled' : ''}`}>
      {filterItems}
    </ul>
  );
};

export default PageFilterDropList;
