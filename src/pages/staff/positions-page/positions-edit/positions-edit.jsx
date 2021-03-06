import React, { useContext, useState, useRef, useEffect } from 'react';

import './positions-edit.scss';

import Modal from "../../../../components/modal/modal";
import {CurrentUserContext} from "../../../../contexts/current-user";
import useFetch from "../../../../hooks/use-fetch";
import PositionsEditTable from "../positions-edit-table/positions-edit-table";

const PositionsEdit = ({ onClose, itemId, reloadTable }) => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [nameEmpty, setNameEmpty] = useState(false);
  const [directoriesList, setDirectoriesList] = useState([]);
  const [fieldTypes, setFieldTypes] = useState([]);

  const [{response: directoriesListResponse, isLoading: directoriesListIsLoading, error: directoriesListError}, doFetchDirectoriesList] = useFetch('/directories/directories');
  const [{response, isLoading, error}, doFetchItem] = useFetch(`/directories/posts/${itemId}`);
  const [{response: itemUpdateResponse, isLoading: itemUpdateIsLoading, error: itemUpdateError}, doFetchItemUpdate] = useFetch(`/directories/posts/${itemId}`);
  const [{response: itemSaveResponse, isLoading: itemSaveIsLoading, error: itemSaveError}, doFetchItemSave] = useFetch(`/directories/posts`);

  const nameInputRef = useRef(null);
  const isNewItem = itemId === 'new';

  const headerData = {
    title: isNewItem ? 'Создание' : 'Редактирование',
    breadcrumbsList: [
      {
        name: currentUserState.currentSite ? currentUserState.currentSite.name : '',
        link: '/'
      },
      {
        name: 'Персонал',
        link: '/staff'
      },
      {
        name: 'Должности',
        link: '/staff/positions'
      },
    ],
    buttonsList: [
      {
        text: 'Сохранить',
        action: () => onSaveClick()
      }
    ],
  };

  useEffect(() => {
    doFetchDirectoriesList();
  }, []);

  useEffect(() => {
    if (!directoriesListResponse) {
      return;
    }
    setDirectoriesList(directoriesListResponse.data);
    if (isNewItem) {
      return;
    }
    doFetchItem();
  }, [directoriesListResponse]);

  useEffect(() => {
    if (!response) {
      return;
    }
    const newFieldTypes = [];
    setName(response.data.attributes.name);
    response.data.attributes.field_types.forEach((item) => {
      if (item.type === 'select' || item.type === 'select_multiple') {
        if (item.options.length > 0) {
          const options = item.options.map(it => it.label).join(', ');
          newFieldTypes.push({
            ...item,
            default_value: options
          });
        } else {
          newFieldTypes.push({
            ...item,
            default_value: ''
          });
        }
        if (item.children.length > 0) {
          const newChild = [];
          item.children.forEach((childItem) => {
            if (childItem.type === 'select' || childItem.type === 'select_multiple') {
              if (childItem.options.length > 0) {
                const childOptions = childItem.options.map(it => it.label).join(', ');
                newChild.push({
                  ...childItem,
                  default_value: childOptions
                });
              } else {
                newChild.push({
                  ...childItem,
                  default_value: ''
                });
              }
            }
          });
          newFieldTypes.push({
            ...item,
            children: newChild
          });
        }
      } else {
        newFieldTypes.push(item);
      }
    });
    setFieldTypes(newFieldTypes);
  }, [response]);

  useEffect(() => {
    if (itemUpdateResponse) {
      onClose();
    }
    if (itemSaveResponse) {
      onClose();
    }
    reloadTable();
  }, [itemUpdateResponse, itemSaveResponse]);

  const setItem = (index, id, col, parent) => {
    const newData = fieldTypes.slice();
    if (parent === undefined) {
      newData[index][col] = id;
    } else {
      newData[parent].children[index][col] = id;
    }
    setFieldTypes(newData);
  };

  const onAddRow = () => {
    const item = {
      label: '',
      required: false,
      type: '',
      unit_id: 1,
      default_value: '',
      children: []
    };
    const data = fieldTypes.slice();
    data.push(item);
    setFieldTypes(data);
  };

  const onAddChildren = (index) => {
    const item = {
      label: '',
      required: false,
      type: '',
      unit_id: 1,
      default_value: '',
    };
    const data = fieldTypes.slice();
    data[index].children.push(item);
    setFieldTypes(data);
  };

  const onInputChange = (value, name, index, parent) => {
    const newData = fieldTypes.slice();
    if (parent === undefined) {
      newData[index][name] = value;
    } else {
      newData[parent].children[index][name] = value;
    }
    setFieldTypes(newData);
  };

  const genFieldTypesItem = (item) => {
    const baseItem = item.uuid === undefined ? {
      "type": item.type,
      "label": item.label,
      "unit_id": item.unit_id,
      "required": item.required,
      "children": []
    } : {
      "uuid": item.uuid,
      "type": item.type,
      "label": item.label,
      "unit_id": item.unit_id,
      "required": item.required,
      "children": []
    };
    switch (item.type) {
      case 'checkbox':
        return {
          ...baseItem,
          "default_value": item.default_value
        };
      case 'collection':
        return {
          ...baseItem,
          "collection_name": item.collection_name
        };
      case 'collection_multiple':
        return {
          ...baseItem,
          "collection_name": item.collection_name
        };
      case 'select':
        const newSelectOptions = [];
        if (item.default_value) {
          const selectOptions = item.default_value.split(',');
          selectOptions.forEach((option) => {
            newSelectOptions.push({"label": option.trim()});
          });
        }
        return {
          ...baseItem,
          "options": newSelectOptions
        };
      case 'select_multiple':
        const newSelectMultipleOptions = [];
        if (item.default_value) {
          const selectMultipleOptions = item.default_value.split(',');
          selectMultipleOptions.forEach((option) => {
            newSelectMultipleOptions.push({"label": option.trim()});
          });
        }
        return {
          ...baseItem,
          "options": newSelectMultipleOptions
        };
      case 'folder':
        return {
          "type": item.type,
          "label": item.label,
          "children": []
        };
      case 'file':
        return {
          "type": item.type,
          "label": item.label,
          "required": item.required,
        };
      default:
        return {
          ...baseItem,
          "default_value": item.default_value,
        };
    }
  };

  const onItemDelete = (id) => {
    const index = id.toString().split('-');
    if (index.length > 1) {
      if (index[1] === '0') {
        const newFieldTypes = fieldTypes.slice();
        newFieldTypes[index[0]].children = newFieldTypes[index[0]].children.slice(1);
        setFieldTypes(newFieldTypes);
      } else {
        const newFieldTypes = fieldTypes.slice();
        const children = newFieldTypes[index[0]].children.slice();
        const before = children.slice(0, Number(index[1]));
        const after = children.slice(Number(index[1]) + 1);
        newFieldTypes[index[0]].children = [...before, ...after];
        setFieldTypes(newFieldTypes);
      }
    } else {
      if (index[0] === '0') {
        setFieldTypes(fieldTypes.slice(1));
      } else {
        const before = fieldTypes.slice(0, Number(index[0]));
        const after = fieldTypes.slice(Number(index[0]) + 1);
        setFieldTypes([...before, ...after]);
      }
    }
  };

  const onSaveClick = () => {
    if (name === '') {
      setNameEmpty(true);
      nameInputRef.current.focus();
    } else {
      const newFieldTypes = fieldTypes.map((it) => {
        const fieldItem = genFieldTypesItem(it);
        if (it.children) {
          it.children.forEach((childrenItem) => {
            fieldItem.children.push(genFieldTypesItem(childrenItem));
          });
        }
        return fieldItem;
      });
      const item = {
        data: {
          name: name,
          field_types: newFieldTypes,
        }
      };
      if (isNewItem) {
        doFetchItemSave({method: 'POST', data: item});
      } else {
        doFetchItemUpdate({method: 'PUT', data: item});
      }
    }
  };

  console.log('fieldTypes --->', fieldTypes);

  return (
    <Modal
      headerData={headerData}
      onClose={onClose}
      isWide={true}
    >
      <div className="positions-edit">
        <div className="positions-edit-name">
          <input
            ref={nameInputRef}
            autoFocus={nameEmpty}
            type="text"
            placeholder="Введите название должности"
            className={`positions-edit-name__input${nameEmpty ? ' error' : ''}`}
            onChange={(evt) => setName(evt.target.value)}
            value={name}
          />
          {nameEmpty ? (
            <span className="positions-edit__error">Введите название должности</span>
          ) : ''}
        </div>
        <PositionsEditTable
          id={itemId}
          fieldTypes={fieldTypes}
          onAddRow={onAddRow}
          onItemDelete={onItemDelete}
          onAddChildren={onAddChildren}
          setItem={setItem}
          unitsList={[]}
          onInputChange={onInputChange}
          directoriesList={directoriesList}
        />
        <button
          className="positions-edit__btn btn"
          type="button"
          onClick={onAddRow}
        >Добавить</button>
      </div>

    </Modal>
  )
};

export default PositionsEdit;
