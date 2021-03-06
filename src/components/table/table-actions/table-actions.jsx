import React, { useState, useContext, useEffect } from 'react';

import './table-actions.scss';

import { useStore } from "../../../hooks-store/store";

const TableActions = ({ tableActions, id, type }) => {
  const [state, dispatch] = useStore();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    dispatch('SET_DROP_OPENED', isActive);
  }, [isActive]);

  useEffect(() => {
    if (state.isDropOpened) {
      return;
    }
    setIsActive(false);
  }, [state.isDropOpened]);

  const onBtnClick = (evt) => {
    evt.preventDefault();
    setIsActive(!isActive);
    dispatch('SET_DROP_OPENED', isActive);
  };

  const closeActions = () => {
    setIsActive(false);
    dispatch('SET_DROP_OPENED', isActive);
  };

  return (
    <div
      className={`table-actions${isActive ? ' active' : ''}`}
    >
      <div
        className={`table-actions__btn${id === 'head' ? ' table-actions__btn--head' : ''}`}
        onClick={onBtnClick}
      >
        <svg width="4" height="14" viewBox="0 0 4 14" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.945312 10.4453C1.25 10.1406 1.60156 9.98828 2 9.98828C2.39844 9.98828 2.75 10.1406 3.05469 10.4453C3.35938 10.75 3.51172 11.1016 3.51172 11.5C3.51172 11.8984 3.35938 12.25 3.05469 12.5547C2.75 12.8594 2.39844 13.0117 2 13.0117C1.60156 13.0117 1.25 12.8594 0.945312 12.5547C0.640625 12.25 0.488281 11.8984 0.488281 11.5C0.488281 11.1016 0.640625 10.75 0.945312 10.4453ZM0.945312 5.94531C1.25 5.64062 1.60156 5.48828 2 5.48828C2.39844 5.48828 2.75 5.64062 3.05469 5.94531C3.35938 6.25 3.51172 6.60156 3.51172 7C3.51172 7.39844 3.35938 7.75 3.05469 8.05469C2.75 8.35938 2.39844 8.51172 2 8.51172C1.60156 8.51172 1.25 8.35938 0.945312 8.05469C0.640625 7.75 0.488281 7.39844 0.488281 7C0.488281 6.60156 0.640625 6.25 0.945312 5.94531ZM3.05469 3.55469C2.75 3.85938 2.39844 4.01172 2 4.01172C1.60156 4.01172 1.25 3.85938 0.945312 3.55469C0.640625 3.25 0.488281 2.89844 0.488281 2.5C0.488281 2.10156 0.640625 1.75 0.945312 1.44531C1.25 1.14062 1.60156 0.988281 2 0.988281C2.39844 0.988281 2.75 1.14062 3.05469 1.44531C3.35938 1.75 3.51172 2.10156 3.51172 2.5C3.51172 2.89844 3.35938 3.25 3.05469 3.55469Z"/>
        </svg>
      </div>
      <div
        className="table-actions__content"
        onClick={(evt) => evt.stopPropagation()}
      >
        <div className="table-actions__head">
          <div className="table-actions__title">{tableActions.title}</div>
          <div
            className="table-actions__close"
            onClick={closeActions}
          >
            <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.86523 1.01367L5.37891 4.5L8.86523 7.98633L7.98633 8.86523L4.5 5.37891L1.01367 8.86523L0.134766 7.98633L3.62109 4.5L0.134766 1.01367L1.01367 0.134766L4.5 3.62109L7.98633 0.134766L8.86523 1.01367Z"/>
            </svg>
          </div>
        </div>
        <ul className="table-actions__list">
          {tableActions.itemsList.map((item, index) => {
            return (
              <li
                key={index}
                className="table-actions__item"
                onClick={() => {
                  closeActions();
                  item.onClick(id, type);
                }}
              >{item.name}</li>
            )
          })}
        </ul>
      </div>
    </div>
  );
};

export default TableActions;
