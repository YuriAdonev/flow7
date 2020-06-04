import React, { useState, useEffect } from 'react';

import './directories-table.scss';

import SortItem from "../../../../components/sort-item/sort-item";
import Spinner from "../../../../components/spinner/spinner";
import TableActions from "../../../../components/table/table-actions/table-actions";

const DirectoriesTable = ({ tableData, onItemDelete, onItemEdit, isLoading, error, sortedBy, sortedDown, onSortClick }) => {
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

  const items = tableData.map(tableItem => {
    return (
      <tr
        key={tableItem.id}
        className="table__row"
      >
        <td
          className="directories-table__name table__col table__col--first"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.name}</td>
        <td className="table__col table__col--last table__col--actions">
          <TableActions
            tableActions={tableActions}
            id={tableItem.id}
          />
        </td>
      </tr>
    )
  });

  return (
    <table className={`directories-table table`}>
      <thead>
      <tr
        className="table__row table__row--head"
      >
        <th className="directories-table__name table__col table__col--first table__col--head">
          <SortItem
            label="Название"
            name="name"
            sortedBy={sortedBy}
            sortedDown={sortedDown}
            onSortClick={onSortClick}
          />
        </th>
        <th className="table__col table__col--last table__col--head table__col--actions"/>
      </tr>
      </thead>
      <tbody>
      {isLoading ? (
        <tr>
          <td colSpan="7">
            <Spinner/>
          </td>
        </tr>
      ) : error ? (
        <tr>
          <td colSpan="7">
            <div className="table__error">Ошибка загрузки</div>
          </td>
        </tr>
      ) : tableData.length === 0 ? (
        <tr>
          <td colSpan="7">
            <div className="table__empty">Данные отсутствуют</div>
          </td>
        </tr>
      ) : items}
      </tbody>
    </table>
  );
};

export default DirectoriesTable;
