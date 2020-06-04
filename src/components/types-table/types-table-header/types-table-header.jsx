import React from 'react';

import TableActions from '../../table/table-actions/table-actions';

const TypesTableHeader = ({ tableStructure }) => {
  const { colsList, tableClass } = tableStructure;

  const tableActions = {
    title: 'Действия',
    itemsList: [
      {
        name: 'Добавить строку',
        onClick: () => {}
      }
    ]
  };

  const cols = colsList.map((item) => {
    if (item.isActive) {
      return (
        <div
          key={item.name}
          className={`${tableClass}__${item.colClass} table__col`}
        >
          {item.header}
        </div>
      )
    }
    return '';
  });

  return (
    <div className="table__head">
      <div className="table__col table__col--actions">
        <TableActions
          tableActions={tableActions}
          id="head"
        />
      </div>
      {cols}
    </div>
  );
};

export default TypesTableHeader;
