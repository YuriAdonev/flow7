import React from 'react';

import './account-organizations-table.scss';

import Spinner from "../../../../components/spinner/spinner";
import SortItem from "../../../../components/sort-item/sort-item";
import TableActions from "../../../../components/table/table-actions/table-actions";

const AccountOrganizationsTable = ({ tableData, onItemDelete, onItemEdit, sortedBy, sortedDown, onSortClick, isLoading, error }) => {

  const tableActions = {
    title: 'Действия',
    itemsList: [
      {
        name: 'Редактировать',
        onClick: onItemEdit
      },
      // {
      //   name: 'Удалить',
      //   onClick: onItemDelete
      // },
    ]
  };

  const items = tableData.map(tableItem => {
    return (
      <tr
        key={tableItem.id}
        className="table__row"
      >
        <td
          className="account-organizations-table__name table__col table__col--first"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.name}</td>
        <td
          className="account-organizations-table__subdomain table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.subdomain}</td>
        <td
          className="account-organizations-table__user-status table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.user_status}</td>
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
    <table className={`account-organizations-table table`}>
      <thead>
        <tr
          className="table__row table__row--head"
        >
          <th className="account-organizations-table__name table__col table__col--first table__col--head">Название организации</th>
          <th className="account-organizations-table__subdomain table__col table__col--head">Домен</th>
          <th className="account-organizations-table__user-status table__col table__col--head">Роль</th>
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

export default AccountOrganizationsTable;
