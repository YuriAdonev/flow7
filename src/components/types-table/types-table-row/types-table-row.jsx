import React from 'react';

import TableSelect from "../../table/table-select/table-select";
import TableSearchSelect from "../../table/table-search-select/table-search-select";
import TableActions from "../../table/table-actions/table-actions";

const TypesTableRow = (props) => {
  const tableActions = {
    title: 'Действия',
    itemsList: [
      {
        name: 'Редактировать',
        onClick: props.editItem
      },
      {
        name: 'Добавить дочернюю',
        onClick: props.onAddChildren
      },
      {
        name: 'Удалить',
        onClick: props.onItemDelete
      },
    ]
  };

  const tableActionsChild = {
    title: 'Действия',
    itemsList: [
      {
        name: 'Редактировать',
        onClick: props.editItem
      },
      {
        name: 'Удалить',
        onClick: props.onItemDelete
      },
    ]
  };

  const typeSelectList = [
    {
      id: 'numeric',
      attributes: {
        name: 'Число',
      }
    },
    {
      id: 'string',
      attributes: {
        name: 'Строка',
      }
    },
    {
      id: 'range',
      attributes: {
        name: 'Диапазон',
      }
    },
    {
      id: 'select',
      attributes: {
        name: 'Селект',
      }
    },
    {
      id: 'select_multiple',
      attributes: {
        name: 'Мультиселект',
      }
    },
    {
      id: 'checkbox',
      attributes: {
        name: 'Чекбокс',
      }
    },
    {
      id: 'collection',
      attributes: {
        name: 'Коллекция',
      }
    },
    {
      id: 'collection_multiple',
      attributes: {
        name: 'Мультиколлекция',
      }
    },
    {
      id: 'folder',
      attributes: {
        name: 'Группа',
      }
    },
    {
      id: 'file',
      attributes: {
        name: 'Файл',
      }
    },
  ];

  const getCollectionName = (slug) => {
    if (slug === undefined) {
      return '';
    }
    if (props.directoriesList.find(item => item.attributes.slug === slug) === undefined) {
      return '';
    }
    return props.directoriesList.find(item => item.attributes.slug === slug).id
  };

  const onTypeSelect = (id) => {
    props.setItem(props.index, id, 'type');
  };

  const onUnitSelect = (id) => {
    props.setItem(props.index, id, 'unit_id');
  };

  const onCollectionSelect = (id) => {
    const currentCollection = props.directoriesList.find(it => it.id === id);
    props.setItem(props.index, currentCollection.attributes.slug, 'collection_name');
  };

  const childs = props.fieldTypes[props.index].children.map((item, index) => {
    const onTypeSelectChild = (id) => {
      props.setItem(index, id, 'type', props.index);
    };

    const onUnitSelectChild = (id) => {
      props.setItem(index, id, 'unit_id', props.index);
    };

    const onCollectionSelectChild = (id) => {
      props.setItem(index, id, 'collection_name', props.index);
    };

    return (
      <div
        key={index}
        className={`table__row${props.id === 'new' ? ' animate' : ''}`}
      >
        <div className="table__col table__col--actions">
          <TableActions
            tableActions={tableActionsChild}
            id={`${props.index}-${index}`}
          />
        </div>
        <div className="types-table-add__characteristic table__col">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0V0z"/>
            <path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"/>
          </svg>
          <input
            autoFocus
            type="text"
            placeholder="Введите название"
            onChange={(evt) => props.onInputChange(evt.target.value, 'label', index, props.index)}
            value={item.label}
          />
        </div>
        <div className="types-table-add__required table__col">
          <label>
            <input
              type="checkbox"
              onChange={(evt) => props.onInputChange(evt.target.checked, 'required', index, props.index)}
              checked={props.fieldTypes[props.index].children[index].required}
            />
            <span className="checkbox"/>
          </label>
        </div>
        <div className="types-table-add__value-type table__col">
          <TableSelect
            placeholder="Выберите тип"
            selectList={typeSelectList}
            selectItem={onTypeSelectChild}
            currentValue={props.fieldTypes[props.index].children[index].type}
          />
        </div>
        <div className="types-table-add__default table__col">
          {props.fieldTypes[props.index].children[index].type === 'collection' || props.fieldTypes[props.index].children[index].type === 'collection_multiple' ? (
            <TableSearchSelect
              placeholder="Выберите справочник"
              selectList={props.directoriesList}
              selectItem={onCollectionSelectChild}
              currentValue={getCollectionName(props.fieldTypes[props.index].children[index].collection_name)}
            />
          ) : props.fieldTypes[props.index].children[index].type === 'checkbox' ? (
            <div>
              <label>
                <input
                  type="checkbox"
                  onChange={(evt) => props.onInputChange(evt.target.checked, 'default_value', props.index)}
                  checked={props.fieldTypes[props.index].children[index].default_value}
                />
                <span className="checkbox"/>
              </label>
            </div>
          ) : (
            <input
              type="text"
              placeholder="Введите значение"
              onChange={(evt) => props.onInputChange(evt.target.value, 'default_value', index, props.index)}
              value={props.fieldTypes[props.index].children[index].default_value ? props.fieldTypes[props.index].children[index].default_value : ''}
            />
          )}
        </div>
        <div className="types-table-add__units table__col">
          <TableSelect
            placeholder="Выберите обозначение"
            selectList={props.unitsList}
            selectItem={onUnitSelectChild}
            currentValue={Number(props.fieldTypes[props.index].children[index].unit_id)}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="table__parent">
      <div className={`table__row${props.id === 'new' ? ' animate' : ''}`}>
        <div className="table__col table__col--actions">
          <TableActions
            tableActions={props.fieldTypes[props.index].type === 'file' ? tableActionsChild : tableActions}
            id={props.index}
          />
        </div>
        <div className="types-table-add__characteristic table__col">
          <input
            autoFocus
            type="text"
            placeholder="Введите название"
            onChange={(evt) => props.onInputChange(evt.target.value, 'label', props.index)}
            value={props.fieldTypes[props.index].label}
          />
        </div>
        <div className="types-table-add__required table__col">
          <label>
            <input
              type="checkbox"
              onChange={(evt) => props.onInputChange(evt.target.checked, 'required', props.index)}
              checked={props.fieldTypes[props.index].required}
            />
            <span className="checkbox"/>
          </label>
        </div>
        <div className="types-table-add__value-type table__col">
          <TableSelect
            placeholder="Выберите тип"
            selectList={typeSelectList}
            selectItem={onTypeSelect}
            currentValue={props.fieldTypes[props.index].type}
          />
        </div>
        <div className="types-table-add__default table__col">
          {props.fieldTypes[props.index].type === 'collection' || props.fieldTypes[props.index].type === 'collection_multiple' ? (
            <TableSearchSelect
              placeholder="Выберите справочник"
              selectList={props.directoriesList}
              selectItem={onCollectionSelect}
              currentValue={getCollectionName(props.fieldTypes[props.index].collection_name)}
            />
          ) : props.fieldTypes[props.index].type === 'checkbox' ? (
            <div>
              <label>
                <input
                  type="checkbox"
                  onChange={(evt) => props.onInputChange(evt.target.checked, 'default_value', props.index)}
                  checked={props.fieldTypes[props.index].default_value}
                />
                <span className="checkbox"/>
              </label>
            </div>
          ) : props.fieldTypes[props.index].type === 'folder' || props.fieldTypes[props.index].type === 'file' ? '' : (
            <input
              type="text"
              placeholder="Введите значение"
              onChange={(evt) => props.onInputChange(evt.target.value, 'default_value', props.index)}
              value={props.fieldTypes[props.index].default_value}
            />
          )}
        </div>
        <div className="types-table-add__units table__col">
          {props.fieldTypes[props.index].type === 'folder' || props.fieldTypes[props.index].type === 'file' ? '' : (
            <TableSelect
              placeholder="Выберите обозначение"
              selectList={props.unitsList}
              selectItem={onUnitSelect}
              currentValue={props.fieldTypes[props.index].unit_id}
            />
          )}
        </div>
      </div>
      <div className="table__child">
        {childs}
      </div>
    </div>
  );
};

export default TypesTableRow;
