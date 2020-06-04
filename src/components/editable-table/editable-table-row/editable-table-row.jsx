import React, { useState, useEffect } from 'react';

import TableActions from '../../table/table-actions/table-actions';

const EditableTableRow = ({ tableItem, tableStructure, onItemDelete, onItemUpdate, onItemSave }) => {
  const { colsList, tableClass } = tableStructure;
  const [rowItem, setRowItem] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setRowItem(tableItem);
  }, [tableItem]);

  useEffect(() => {
    setIsLoaded(true);
  }, [rowItem]);

  const tableActions = {
    title: 'Действия',
    itemsList: [
      {
        name: 'Удалить',
        onClick: onItemDelete
      }
    ]
  };

  const onColChange = (evt, name, id) => {
    setRowItem({
      ...rowItem,
      attributes: {
        ...rowItem.attributes,
        [name]: evt.target.value
      }
    });
  };

  const cols = colsList.map((item, index) => {
    if (item.isActive && isLoaded) {
      if (rowItem.id === 'new') {
        return (
          <div
            key={item.name}
            className={`${tableClass}__${item.colClass} table__col`}
          >
            <input
              autoFocus={index === 0}
              type="text"
              placeholder={item.placeholder}
              onChange={(evt) => onColChange(evt, item.name, rowItem.id)}
              onKeyPress={(evt) => {
                if (evt.key === 'Enter') {
                  onItemSave(rowItem);
                }
              }}
              value={rowItem.attributes[item.name]}
            />
          </div>
        )
      } else {
        let textInput = null;
        return (
          <div
            key={item.name}
            className={`${tableClass}__${item.colClass} table__col`}
          >
            <input
              autoFocus={rowItem.id === 'new' && index === 0}
              type="text"
              placeholder={item.placeholder}
              ref={(input) => { textInput = input; }}
              onChange={(evt) => onColChange(evt, item.name, rowItem.id)}
              onBlur={() => onItemUpdate(rowItem)}
              onKeyPress={(evt) => {
                if (evt.key === 'Enter') {
                  onItemUpdate(rowItem);
                  textInput.blur()
                }
              }}
              value={rowItem.attributes[item.name]}
            />
          </div>
        )
      }
    }
    return '';
  });

  return (
    <div
      className={`table__row${rowItem.id === 'new' ? ' animate' : ''}`}
    >
      <div className="table__col table__col--actions">
        <TableActions
          tableActions={tableActions}
          id={rowItem.id}
        />
      </div>
      {cols}
      <div className="table__col table__col--save">
        {rowItem.id === 'new' ? (
            <button
              className="table__btn btn"
              onClick={() => onItemSave(rowItem)}
            >Сохранить</button>
        ) : ''}
      </div>
    </div>
  );
};

export default EditableTableRow;
