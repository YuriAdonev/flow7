import React from 'react';

import './page-filter-list.scss';

import PageFilterListItem from '../page-filter-list-item/page-filter-list-item';

const PageFilterList = ({ filtersList, filters, addFilter }) => {
  const items = filtersList.map((item, index) => {
    return (
      <PageFilterListItem
        key={index}
        name={item.name}
        filterCategory={item.category}
        filterList={item.list}
        filters={filters}
        addFilter={addFilter}
      />
    );
  });

  return (
    <div className="page-filter-list">
      {items}
    </div>
  );
};

export default PageFilterList;
