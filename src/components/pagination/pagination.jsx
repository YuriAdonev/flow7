import React from 'react';

import './pagination.scss';

const Pagination = ({ countPages, currentPage, setCurrentPage, amountItems}) => {
  let pagesList = [];
  for (let i = 1; i <= countPages; i++) {
    pagesList.push(i);
  }

  const pageIncrement = () => {
    if (currentPage < countPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pageDecrement = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const items = pagesList.map(number => {
    return (
      <div
        key={number}
        className={`pagination__item${currentPage === number - 1 ? ' current' : ''}`}
        onClick={() => setCurrentPage(number - 1)}
      >
        {number}
      </div>
    )
  });

  return (
    <div className="pagination">
      <div className="pagination__amount">Итого: {amountItems}</div>
      {countPages <= 1 ? '' : (
        <div className="pagination__wrap">
          <div
            className={`pagination__btn pagination__btn--prev${currentPage === 0 ? ' disabled' : ''}`}
            onClick={pageDecrement}
          >
            <svg width="6" height="8" viewBox="0 0 6 8" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.28125 7.0625L4.34375 8L0.34375 4L4.34375 -2.90954e-07L5.28125 0.9375L2.21875 4L5.28125 7.0625Z"/>
            </svg>
          </div>
          {countPages > 7 ? (
            <div className="pagination__list">
              <div className="pagination__item">1</div>
              <div className="pagination__item current">2</div>
              <div className="pagination__item">3</div>
              <div className="pagination__item pagination__item--dots">...</div>
              <div className="pagination__item">98</div>
              <div className="pagination__item">99</div>
              <div className="pagination__item">100</div>
            </div>
          ) : (
            <div className="pagination__list">
              {items}
            </div>
          )}
          <div
            className={`pagination__btn pagination__btn--next${currentPage === countPages - 1 ? ' disabled' : ''}`}
            onClick={pageIncrement}
          >
            <svg width="6" height="8" viewBox="0 0 6 8" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.71875 0.9375L1.65625 7.9375e-08L5.65625 4L1.65625 8L0.71875 7.0625L3.78125 4L0.71875 0.9375Z"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
