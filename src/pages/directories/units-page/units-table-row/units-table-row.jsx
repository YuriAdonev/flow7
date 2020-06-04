import React, { useState, useEffect } from 'react';

import TableActions from '../../../../components/table/table-actions/table-actions';

const UnitsTableRow = ({ tableItem, tableStructure, onItemDelete, onItemUpdate, onItemSave }) => {
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
          <td
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
              value={rowItem.attributes[item.name] === null ? '' : rowItem.attributes[item.name]}
            />
          </td>
        )
      } else {
        let textInput = null;
        return (
          <td
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
              value={rowItem.attributes[item.name] === null ? '' : rowItem.attributes[item.name]}
            />
          </td>
        )
      }
    }
    return null;
  });

  return (
    <tr
      className={`table__row${rowItem.id === 'new' ? ' animate' : ''}`}
    >
      <td className="table__col table__col--first table__col--actions">
        <TableActions
          tableActions={tableActions}
          id={rowItem.id}
        />
      </td>
      {cols}
      <td className="table__col table__col--last table__col--save">
        {rowItem.id === 'new' ? (
          <button
            className="table__btn btn"
            onClick={() => onItemSave(rowItem)}
          >Сохранить</button>
        ) : ''}
      </td>
    </tr>
  );
};

export default UnitsTableRow;
