import React from 'react';

import './page-filter-additionally.scss';

import PageFilterListItem from "../page-filter-list-item/page-filter-list-item";

const PageFilterAdditionally = (props) => {
  const items = props.filtersList.map((item, index) => {
    return (
      <PageFilterListItem
        key={index}
        name={item.name}
        filterCategory={item.category}
        filterList={item.list}
        addFilter={props.addFilter}
      />
    );
  });

  return (
    <div className="page-filter-additionally">
      {items}
    </div>
  );
};

export default PageFilterAdditionally;
