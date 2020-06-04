import React, { useState, useEffect } from 'react';

import './staff-edit-access-table.scss';

import Spinner from "../../../../../../components/spinner/spinner";
import TableActions from "../../../../../../components/table/table-actions/table-actions";
import SortItem from "../../../../../../components/sort-item/sort-item";
import {getPerfectDate} from "../../../../../../utils";

const StaffEditAccessTable = ({ tableData, statusList, isLoading, error, onItemEdit, onItemDelete, sortedBy, sortedDown, onSortClick }) => {
  const [currentTableData, setCurrentTableData] = useState([]);

  useEffect(() => {
    setCurrentTableData(tableData);
  }, [tableData]);

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

  const items = currentTableData.map(tableItem => {
    const itemDate = new Date(tableItem.attributes.at);
    return (
      <tr
        key={tableItem.id}
        className="table__row"
      >
        <td
          className="staff-edit-access-table__date table__col table__col--first"
          onClick={() => onItemEdit(tableItem.id)}
        >{getPerfectDate(itemDate)}</td>
        <td
          className="staff-edit-access-table__card-number table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.access_token_id}</td>
        <td
          className="staff-edit-access-table__status table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.status === null ? '' : statusList.find(it => it.id === tableItem.attributes.status).attributes.name}</td>
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

  return tableData === [] ? '' : (
    <table className={`staff-edit-access-table table`}>
      <thead>
      <tr
        className="table__row table__row--head"
      >
        <th className="staff-edit-access-table__date table__col table__col--first table__col--head">Дата регистрации</th>
        <th className="staff-edit-access-table__card-number table__col table__col--head">Номер карты</th>
        <th className="staff-edit-access-table__status table__col table__col--head">Статус</th>
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

export default StaffEditAccessTable;
