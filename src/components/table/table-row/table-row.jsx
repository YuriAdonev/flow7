import React from 'react';

import TableActions from "../table-actions/table-actions";

const TableRow = ({ tableStructure, tableItem, onItemEdit, onItemDelete })=> {
  const { colsList, tableClass } = tableStructure;

  const tableActions = {
    title: 'Действия',
    itemsList: [
      {
        name: 'Редактировать',
        onClick: onItemEdit
      },
      {
        name: 'Удалить',
        onClick: onItemDelete
      },
    ]
  };

  const cols = colsList.map((item, index) => {
    if (item.isActive) {
      return (
        <div
          key={index}
          className={`${tableClass}__${item.colClass} table__col`}
          onClick={() => {
            onItemEdit(tableItem.id, tableItem.type);
          }}
        >
          {tableItem.attributes[item.name]}
        </div>
      )
    }
    return '';
  });

  return (
    <div className="table__row">
      <div className="table__col table__col--actions">
        <TableActions
          tableActions={tableActions}
          id={tableItem.id}
          type={tableItem.type}
        />
      </div>
      {cols}
    </div>
  );
};

export default TableRow;
