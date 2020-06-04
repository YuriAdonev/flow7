import React, { useState, useEffect } from 'react';

import useFetch from "../../../hooks/use-fetch";
import {useStore} from "../../../hooks-store/store";

const DirectoriesSelectMultiple = ({ slug, uuid, idList, label, placeholder, setCurrentSelect }) => {
  const [state, dispatch] = useStore();
  const [isActive, setIsActive] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedString, setSelectedString] = useState('');
  const [selectedId, setSelectedId] = useState([]);
  const [selectList, setSelectList] = useState([]);

  const [{response}, doFetchDirectories] = useFetch(`/directories/${slug}`);

  useEffect(() => {
    doFetchDirectories();
  }, []);

  useEffect(() => {
    if (!response) {
      return;
    }
    setSelectList(response.data);
    const newSelectedItems = [];
    if (idList !== null) {
      idList.forEach(id => {
        newSelectedItems.push(response.data.find(it => Number(it.id) === Number(id)).attributes.name)
      });
      setSelectedId(idList);
    }
  }, [response]);

  useEffect(() => {
    if (!response) {
      return;
    }
    setCurrentSelect(uuid, selectedId);
    const newSelectedItems = [];
    selectedId.forEach(id => {
      newSelectedItems.push(selectList.find(it => Number(it.id) === Number(id)).attributes.name)
    });
    setSelectedString(newSelectedItems.join(', '));
  }, [selectedId]);

  useEffect(() => {
    dispatch('SET_DROP_OPENED', isActive);
  }, [isActive]);

  useEffect(() => {
    if (state.isDropOpened) {
      return;
    }
    setIsActive(false);
  }, [state.isDropOpened]);

  const onItemClick = (uuid, itemId) => {
    if (selectedId.find(item => Number(item) === Number(itemId)) === undefined) {
      setSelectedId([...selectedId, itemId]);
    } else {
      const index = selectedId.findIndex(item => Number(item) === Number(itemId));
      const beforeItems = selectedId.slice(0, index);
      const afterItems = selectedId.slice(index + 1);
      setSelectedId([...beforeItems, ...afterItems]);
    }
  };

  const listItems = selectList.map((item, index) => {
    return (
      <li
        key={item.id}
        className={`form-select-list__item${selectedId.find(it => Number(it) === Number(item.id)) === undefined ? '' : ' selected'}`}
        onClick={() => onItemClick(uuid, item.id)}
      >{item.attributes.name}</li>
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
          className={`form-select__placeholder${isActive || selectedString !== '' ? ' active' : ''}`}
        >
          {selectedString === '' ? placeholder : selectedString}
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

export default DirectoriesSelectMultiple;
