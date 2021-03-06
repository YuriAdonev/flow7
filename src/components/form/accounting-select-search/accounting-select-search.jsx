import React, { useState, useEffect, useRef } from 'react';

import {useStore} from "../../../hooks-store/store";

const AccountingSelectSearch = ({ selectedId, placeholder, setCurrentSelect, selectList, empty = false, type = 'name' }) => {
  const [state, dispatch] = useStore();
  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(selectList === []);
  const [selectedItem, setSelectedItem] = useState('');
  const [searchString, setSearchString] = useState('');
  const [filteredSelectList, setFilteredSelectList] = useState(selectList);

  const inputRef = useRef(null);

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
    if (isDisabled) {
      return;
    }
    if (selectedId !== '' && selectList.length > 0) {
      setSelectedItem(selectList.find(it => it.id.toString() === selectedId.toString()).attributes[type]);
      setSearchString(selectList.find(it => it.id.toString() === selectedId.toString()).attributes[type]);
    }
  }, []);

  useEffect(() => {
    if (isDisabled) {
      return;
    }
    if (selectedId === '') {
      return;
    }
    if (selectList.length > 0) {
      setSelectedItem(selectList.find(it => it.id.toString() === selectedId.toString()).attributes[type]);
    }
  }, [selectedId]);

  useEffect(() => {
    if (selectList === []) {
      setIsDisabled(true);
      return;
    }
    setFilteredSelectList(selectList);
    setIsDisabled(false);
  }, [selectList]);

  const onItemClick = (value, id) => {
    setSelectedItem(value);
    setSearchString(value);
    setCurrentSelect(id);
    setIsActive(!isActive);
    dispatch('SET_DROP_OPENED', isActive);
  };

  const handlerInput = (evt) => {
    setSearchString(evt.target.value);
    let newSelectList = [];
    const regex = new RegExp(evt.target.value.toLowerCase(), 'g');
    newSelectList = selectList.slice().filter((item) => item.attributes[type].toLowerCase().match(regex));
    setFilteredSelectList(newSelectList);
  };

  const listItems = filteredSelectList.map((item) => {
    return (
      <li
        key={item.id}
        className={`form-select-list__item${selectedItem === item.id ? ' selected' : ''}`}
        onClick={() => onItemClick(item.attributes[type], item.id)}
      >{item.attributes[type]}</li>
    )
  });

  return (
    <div className={`form-select${isActive ? ' active' : ''}${empty ? ' empty' : ''}`}>
      <div
        className="form-select__input"
        onClick={() => {
          if (!isDisabled) {
            setIsActive(true)
          }
        }}
      >
        <input
          ref={inputRef}
          type="text"
          className={`form-select__placeholder${selectedItem === '' ? '' : ' active'}`}
          placeholder={placeholder}
          onChange={handlerInput}
          value={searchString}
          // disabled={!isActive}
        />
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

export default AccountingSelectSearch;
