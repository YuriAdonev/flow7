import React from 'react';

import './staff-table.scss';

import TableActions from "../../../../components/table/table-actions/table-actions";
import SortItem from "../../../../components/sort-item/sort-item";
import Spinner from "../../../../components/spinner/spinner";

const StaffTable = ({ error, tableData, isLoading, onItemDelete, onItemEdit, sortedBy, sortedDown, onSortClick }) => {
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
          className="staff-table__last-name table__col table__col--first"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.last_name}</td>
        <td
          className="staff-table__first-name table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.first_name}</td>
        <td
          className="staff-table__position table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.post_name}</td>
        <td
          className="staff-table__division table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.division_name}</td>
        <td
          className="staff-table__card-number table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.access_token_id}</td>
        <td className="table__col table__col--last table__col--actions">
          <TableActions
            tableActions={tableActions}
            id={tableItem.id}
            type={tableItem.type}
          />
        </td>
      </tr>
    )
  });

  return (
    <table className={`staff-table table`}>
      <thead>
      <tr
        className="table__row table__row--head"
      >
        <th className="staff-table__last-name table__col table__col--first table__col--head">
          <SortItem
            label="Фамилия"
            name="last_name"
            sortedBy={sortedBy}
            sortedDown={sortedDown}
            onSortClick={onSortClick}
          />
        </th>
        <th className="staff-table__first-name table__col table__col--head">Имя</th>
        <th className="staff-table__position table__col table__col--head">Должность</th>
        <th className="staff-table__division table__col table__col--head">Структурное подразделение</th>
        <th className="staff-table__card-number table__col table__col--head">
          <SortItem
            label="Номер карты"
            name="access_token_id"
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
  )
};

export default StaffTable;
