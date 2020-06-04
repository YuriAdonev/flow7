import React, { useState, useEffect } from 'react';

import TableActions from '../../../../components/table/table-actions/table-actions';

const DirectoriesSlugTableHierarchicRow = ({ tableItem, tableStructure, onAddChild, onItemDelete, onItemUpdate, onItemSave }) => {
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
        name: 'Добавить дочернюю',
        onClick: () => onAddChild(rowItem.id, rowItem.attributes.depth)
      },
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
    console.log('colsList rowItem', rowItem);
    if (item.isActive && isLoaded) {
      if (rowItem.id === 'new') {
        return (
          <td
            key={item.name}
            className={`${tableClass}__${item.colClass} table__col`}
          >
            {item.name === 'name' ? (
              <div
                className="table__structure-tree"
                style={{marginLeft: rowItem.attributes.depth === 0 ? '0' : (rowItem.attributes.depth * 16) + 'px'}}
              >
                {rowItem.attributes.depth === 0 ? (
                  <svg width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.0117 11.5V4.01172H1.98828V11.5H14.0117ZM14.0117 2.5C14.4102 2.5 14.75 2.65234 15.0312 2.95703C15.3359 3.26172 15.4883 3.61328 15.4883 4.01172V11.5C15.4883 11.8984 15.3359 12.25 15.0312 12.5547C14.75 12.8594 14.4102 13.0117 14.0117 13.0117H1.98828C1.58984 13.0117 1.23828 12.8594 0.933594 12.5547C0.652344 12.25 0.511719 11.8984 0.511719 11.5V2.5C0.511719 2.10156 0.652344 1.75 0.933594 1.44531C1.23828 1.14062 1.58984 0.988281 1.98828 0.988281H6.48828L8 2.5H14.0117Z"/>
                  </svg>
                ) : (
                  <svg width="11" height="12" viewBox="0 0 11 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6562 8L6.65625 12L5.71875 11.0625L8.125 8.65625H0.65625V0.65625H2V7.34375H8.125L5.71875 4.9375L6.65625 4L10.6562 8Z"/>
                  </svg>
                )}
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
            ) : (
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
            )}
          </td>
        )
      } else {
        let textInput = null;
        return (
          <td
            key={item.name}
            className={`${tableClass}__${item.colClass} table__col`}
          >
            {item.name === 'name' ? (
              <div
                className="table__structure-tree"
                style={{marginLeft: tableItem.attributes.depth === 0 ? '0' : (tableItem.attributes.depth * 16) + 'px'}}
              >
                {rowItem.attributes.depth === 0 ? (
                  <svg width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.0117 11.5V4.01172H1.98828V11.5H14.0117ZM14.0117 2.5C14.4102 2.5 14.75 2.65234 15.0312 2.95703C15.3359 3.26172 15.4883 3.61328 15.4883 4.01172V11.5C15.4883 11.8984 15.3359 12.25 15.0312 12.5547C14.75 12.8594 14.4102 13.0117 14.0117 13.0117H1.98828C1.58984 13.0117 1.23828 12.8594 0.933594 12.5547C0.652344 12.25 0.511719 11.8984 0.511719 11.5V2.5C0.511719 2.10156 0.652344 1.75 0.933594 1.44531C1.23828 1.14062 1.58984 0.988281 1.98828 0.988281H6.48828L8 2.5H14.0117Z"/>
                  </svg>
                ) : (
                  <svg width="11" height="12" viewBox="0 0 11 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6562 8L6.65625 12L5.71875 11.0625L8.125 8.65625H0.65625V0.65625H2V7.34375H8.125L5.71875 4.9375L6.65625 4L10.6562 8Z"/>
                  </svg>
                )}
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
            ) : (
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
            )}
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

export default DirectoriesSlugTableHierarchicRow;
