import React, { useState, useEffect } from 'react';

import {useStore} from "../../../hooks-store/store";

const AccountingSelect = ({ selectedId, placeholder, setCurrentSelect, selectList, empty = false, type = 'name', attributes = true }) => {
  const [state, dispatch] = useStore();
  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(selectList === []);
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    dispatch('SET_DROP_OPENED', isActive);
  }, [isActive]);

  useEffect(() => {
    if (state.isDropOpened) {
      return;
    }
    setIsActive(false);
  }, [state.isDropOpened]);

  useEffect(() => {
    if (selectedId === null) {
      return;
    }
    if (attributes) {
      setSelectedItem(selectList.find(it => it.id === selectedId).attributes[type]);
    } else {
      setSelectedItem(selectList.find(it => it.id === selectedId)[type]);
    }

  }, []);

  useEffect(() => {
    if (selectedId === null) {
      setSelectedItem('');
    }
  }, [selectedId]);

  const onItemClick = (value, id) => {
    setSelectedItem(value);
    setCurrentSelect(id);
    setIsActive(!isActive);
    dispatch('SET_DROP_OPENED', isActive);
  };

  const listItems = selectList.map((item) => {
    return (
      <li
        key={item.id}
        className={`form-select-list__item${selectedItem === item.id ? ' selected' : ''}`}
        onClick={() => onItemClick(attributes ? item.attributes[type] : item[type], item.id)}
      >{attributes ? item.attributes[type] : item[type]}</li>
    )
  });

  return (
    <div className={`form-select${isActive ? ' active' : ''}${empty ? ' empty' : ''}`}>
      <div
        className="form-select__input"
        onClick={() => {
          if (!isDisabled) {
            setIsActive(true);
          }
        }}
      >
        <div
          className={`form-select__placeholder${selectedItem === '' ? '' : ' active'}`}
        >
          {selectedItem === '' ? placeholder : selectedItem}
        </div>
        <div className="form-select__drop">
          <svg width="10" height="6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.44531 0.433594L9.5 1.48828L5 5.98828L0.5 1.48828L1.55469 0.433594L5 3.87891L8.44531 0.433594Z"/>
          </svg>
        </div>
        <ul
          className="form-select-list"
          onClick={evt => evt.stopPropagation()}
        >
          {listItems}
        </ul>
      </div>
    </div>
  )
};

export default AccountingSelect;
