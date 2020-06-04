import React from 'react';

import TableActions from '../../table/table-actions/table-actions';

const EditableTableHeader = ({ tableStructure, onItemAdd }) => {
  const { colsList, tableClass } = tableStructure;

  // const tableActions = {
  //   title: 'Действия',
  //   itemsList: [
  //     {
  //       name: 'Добавить строку',
  //       onClick: onItemAdd
  //     }
  //   ]
  // };

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
    <div className="catalog-table__head table__head">
      <div className="catalog-table__col catalog-table__col--drop table__col table__col--actions">
        {/*<TableActions*/}
        {/*  tableActions={tableActions}*/}
        {/*  id="head"*/}
        {/*/>*/}
      </div>
      {cols}
      <div className="catalog-table__col catalog-table__col--save table__col table__col--save"/>
    </div>
  );
}

export default EditableTableHeader;
