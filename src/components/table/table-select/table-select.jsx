import React, { useState, useEffect } from 'react';

import './table-select.scss';

import {useStore} from '../../../hooks-store/store';

const TableSelect = ({ selectItem, placeholder, selectList, currentValue }) => {
  const [state, dispatch] = useStore();
  const [isActive, setIsActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    if (currentValue !== undefined) {
      if (currentValue === '') {
        setSelectedItem('');
      } else {
        const currentItem = selectList.find((item) => item.id == currentValue);
        if (currentItem !== undefined) {
          setSelectedItem(currentItem.attributes.name);
        } else {
          setSelectedItem('');
        }
      }
    }
  }, []);

  useEffect(() => {
    dispatch('SET_DROP_OPENED', isActive);
  }, [isActive]);

  useEffect(() => {
    if (state.isDropOpened) {
      return;
    }
    setIsActive(false);
  }, [state.isDropOpened]);

  const onItemClick = (value, id) => {
    setSelectedItem(value);
    selectItem(id);
    setIsActive(false);
  };

  const listItems = selectList.map((item) => {
    return (
      <li
        key={item.id}
        className={`table-select__item${selectedItem === item.attributes.name ? ' selected' : ''}`}
        onClick={() => onItemClick(item.attributes.name, item.id)}
      >{item.attributes.name}</li>
    )
  });

  const toggleSelect = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`table-select${isActive ? ' active' : ''}`}>
      <span
        className="table-select__desc"
        onClick={toggleSelect}
      >
        <span
          className={`table-select__placeholder${selectedItem === '' ? '' : ' active'}`}
        >{selectedItem === '' ? placeholder : selectedItem}</span>
        <span className="table-select__drop">
          <svg width="10" height="6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.44531 0.433594L9.5 1.48828L5 5.98828L0.5 1.48828L1.55469 0.433594L5 3.87891L8.44531 0.433594Z"/>
          </svg>
        </span>
        <ul className="table-select__list" onClick={(evt) => evt.stopPropagation()}>
          {listItems}
        </ul>
      </span>
    </div>
  );
};

export default TableSelect;
