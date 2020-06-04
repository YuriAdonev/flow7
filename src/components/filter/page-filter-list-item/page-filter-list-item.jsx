import React, {useEffect, useState} from 'react';
import Select from '@atlaskit/select';

import './page-filter-list-item.scss';

const PageFilterListItem = ({ name, addFilter, filters, filterCategory, filterList }) => {
  const [newFilterList, setNewFilterList] = useState([]);

  useEffect(() => {
    if (filterList !== []) {
      const arr = [];
      filterList.forEach(item => {
        arr.push({label: item.attributes.name, value: item.id});
      });
      setNewFilterList(arr);
    }
  }, [filterList]);

  const onItemClick = (filter) => {
    addFilter(filter, filterCategory);
  };

  return (
    <div style={{ flex: '0 0 200px', marginLeft: 20 }}>
      <Select
        className="single-select"
        classNamePrefix="page-filter-select"
        options={newFilterList}
        placeholder={name}
        value=""
        onChange={value => onItemClick(value)}
      />
    </div>
  );
};

export default PageFilterListItem;
