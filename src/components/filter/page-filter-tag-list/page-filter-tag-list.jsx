import React from 'react';

import './page-filter-tag-list.scss';

const PageFilterTagList = ({ filters, removeFilter }) => {

  const tags = filters.map((item, index) => {
    return (
      <div
        key={index}
        className="page-filter-tag-list-item"
      >
        <span>{item.filter.label}</span>
        <div
          className="page-filter-tag-list-item__delete"
          onClick={() => removeFilter(item.filter.value, item.filterCategory)}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.07422 1.74609L5.82031 5L9.07422 8.25391L8.25391 9.07422L5 5.82031L1.74609 9.07422L0.925781 8.25391L4.17969 5L0.925781 1.74609L1.74609 0.925781L5 4.17969L8.25391 0.925781L9.07422 1.74609Z"/>
          </svg>
        </div>
      </div>
    );
  });

  return (
    <div className="page-filter-tag-list">
      {tags}
    </div>
  );
};

export default PageFilterTagList;
