import React from 'react';

import './staff-edit-orders-moving-table.scss';

import Spinner from "../../../../../../components/spinner/spinner";
import TableActions from "../../../../../../components/table/table-actions/table-actions";
import SortItem from "../../../../../../components/sort-item/sort-item";

const StaffEditOrdersMovingTable = ({ tableData, statusList, isLoading, error, onItemEdit, onItemDelete, sortedBy, sortedDown, onSortClick }) => {

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
    const itemDate = new Date(tableItem.attributes.at);
    return (
      <tr
        key={tableItem.id}
        className="table__row"
      >
        <td
          className="staff-edit-orders-moving-table__date table__col table__col--first"
          onClick={() => onItemEdit(tableItem.id)}
        >{`${new Date(itemDate).getDate()}.${new Date(itemDate).getMonth() + 1}.${new Date(itemDate).getFullYear()}`}</td>
        <td
          className="staff-edit-orders-moving-table__post table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.post_name}</td>
        <td
          className="staff-edit-orders-moving-table__division table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.division_name}</td>
        <td
          className="staff-edit-orders-moving-table__order-number table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.order_number}</td>
        <td
          className="staff-edit-orders-moving-table__order-file table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >
          {tableItem.attributes.attachment.id !== undefined && (
            <a href={`${process.env.REACT_APP_API_HTTP + process.env.REACT_APP_API_BASE_URL}/uploads/${tableItem.attributes.attachment.id}`} target="_blank">Скачать</a>
          )}
        </td>
        <td
          className="staff-edit-orders-moving-table__status table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.status === null ? '' : statusList.find(it => it.id === tableItem.attributes.status).attributes.name}</td>
        <td className="table__col table__col--last table__col--actions">
          <TableActions
            tableActions={tableActions}
            id={tableItem.id}
          />
        </td>
      </tr>
    )
  });

  return tableData === [] ? '' : (
    <table className={`staff-edit-orders-moving-table table`}>
      <thead>
      <tr
        className="table__row table__row--head"
      >
        <th className="staff-edit-orders-moving-table__date table__col table__col--first table__col--head">Дата</th>
        <th className="staff-edit-orders-moving-table__post table__col table__col--head">Должность</th>
        <th className="staff-edit-orders-moving-table__division table__col table__col--head">Подразделение</th>
        <th className="staff-edit-orders-moving-table__order-number table__col table__col--head">Номер приказа</th>
        <th className="staff-edit-orders-moving-table__order-file table__col table__col--head">Файл приказа</th>
        <th className="staff-edit-orders-moving-table__status table__col table__col--head">Статус</th>
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

export default StaffEditOrdersMovingTable;
