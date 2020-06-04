import React, { useState, useEffect } from 'react';

import {useStore} from "../../../hooks-store/store";

const FormSelect = ({ uuid, id: itemId, label, placeholder, setCurrentSelect, selectList }) => {
  const [state, dispatch] = useStore();
  const [isActive, setIsActive] = useState(false);
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
    if (itemId === null) {
      return;
    }
    setSelectedItem(selectList.find(it => it.uuid === itemId).label);
  }, []);

  const onItemClick = (uuid, value, id) => {
    setSelectedItem(value);
    setCurrentSelect(uuid, id);
    setIsActive(!isActive);
    dispatch('SET_DROP_OPENED', isActive);
  };

  const listItems = selectList.map((item) => {
    return (
      <li
        key={item.uuid}
        className={`form-select-list__item${selectedItem === item.label ? ' selected' : ''}`}
        onClick={() => onItemClick(uuid, item.label, item.uuid)}
      >{item.label}</li>
    )
  });

  return (
    <div className={`form-select${isActive ? ' active' : ''}`}>
      <div className="form-select__label">{label}</div>
      <div
        className="form-select__input"
        onClick={() => setIsActive(true)}
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

export default FormSelect;
