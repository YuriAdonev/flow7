import React, { useState } from 'react';

import './page-filter.scss';

import PageFilterList from '../page-filter-list/page-filter-list';
import PageFilterTagList from '../page-filter-tag-list/page-filter-tag-list';
import PageFilterDate from '../page-filter-date/page-filter-date';
import PageFilterAdditionally from '../page-filter-additionally/page-filter-additionally';

const PageFilter = ({ filters, pageFilters, setFilters, pageSearch, setPageSearch }) => {
  const {search, defaultFiltersCount, filtersList, calendarShow, onDateChoice = '', currentDate = {}} = pageFilters;
  const [currentFilters, setCurrentFilters] = useState([]);
  const [additionallyShow, setAdditionallyShow] = useState(false);

  const addFilter = (filter, filterCategory) => {
    const newFilters = currentFilters.slice();
    if (newFilters.findIndex(item => item.filter.value === filter.value) === -1) {
      newFilters.push({
        filter,
        filterCategory
      });
      setFilters(newFilters);
      setCurrentFilters(newFilters);
    }
  };

  const removeFilter = (filter, filterCategory) => {
    const newFilters = currentFilters.slice();
    const index = newFilters.slice().findIndex(item => item.filter.value === filter && item.filterCategory === filterCategory);
    console.log('index', index);
    console.log('filter', typeof filter);
    console.log('newFilters', newFilters);
    if (index !== -1) {
      newFilters.splice(index, 1);
    }
    setFilters(newFilters);
    setCurrentFilters(newFilters);
  };

  const clearPageFilter = () => {
    setPageSearch('');
  };

  const onPageSearchChange = (value) => {
    setPageSearch(value);
  };

  const onAdditionallyClick = () => {
    setAdditionallyShow(!additionallyShow);
  };

  let mainFiltersList = [];
  let additionallyFiltersList = [];

  if (filtersList.length > defaultFiltersCount - 1) {
    mainFiltersList = filtersList.slice(0, defaultFiltersCount);
    additionallyFiltersList = filtersList.slice(defaultFiltersCount);
  } else {
    mainFiltersList = filtersList.slice();
  }

  return (
    <div className="page-filter">
      <div className="page-filter__wrap">
        <div className="page-filter__actions">
          <div className="page-filter-search">
            <input
              type="text"
              className="page-filter-search__input"
              placeholder={search.placeholder}
              onChange={(evt) => onPageSearchChange(evt.target.value)}
              value={pageSearch}
            />
            {pageSearch !== '' && (
              <div
                className="page-filter-search__clear"
                onClick={clearPageFilter}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.07422 1.74609L5.82031 5L9.07422 8.25391L8.25391 9.07422L5 5.82031L1.74609 9.07422L0.925781 8.25391L4.17969 5L0.925781 1.74609L1.74609 0.925781L5 4.17969L8.25391 0.925781L9.07422 1.74609Z"/>
                </svg>
              </div>
            )}
          </div>
          <PageFilterList
            filtersList={mainFiltersList}
            filters={filters}
            addFilter={addFilter}
          />
          {calendarShow ? (
            <PageFilterDate
              onDateChoice={onDateChoice}
              currentDate={currentDate}
            />
          ) : ''}
          {filtersList.length > defaultFiltersCount ? (
            <button
              className="page-filter__btn btn"
              type="button"
              onClick={() => onAdditionallyClick()}
            >
              <svg width="14" height="10" viewBox="0 0 14 10" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 5.73828V4.26172H11.5V5.73828H2.5ZM0.25 0.5H13.75V2.01172H0.25V0.5ZM5.48828 9.5V7.98828H8.51172V9.5H5.48828Z"/>
              </svg>
            </button>
          ) : ''}
        </div>
        {additionallyShow ? (
          <PageFilterAdditionally
            filtersList={additionallyFiltersList}
            addFilter={addFilter}
          />
          ) : ''}
        {currentFilters.length === 0 ? '' : (
          <PageFilterTagList
            filters={currentFilters}
            removeFilter={removeFilter}
          />
        )}
      </div>
    </div>
  );
};

export default PageFilter;
