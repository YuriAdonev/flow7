import React from 'react';

import './staff-edit-orders-interruption-table.scss';

import Spinner from "../../../../../../components/spinner/spinner";
import TableActions from "../../../../../../components/table/table-actions/table-actions";
import SortItem from "../../../../../../components/sort-item/sort-item";

const StaffEditOrdersInterruptionTable = ({ tableData, isLoading, error, sortedBy, sortedDown, onSortClick }) => {

  const tableActions = {
    title: 'Действия',
    itemsList: [
      {
        name: '???',
        onClick: () => console.log('Действие')
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
          className="staff-edit-orders-interruption-table__date table__col table__col--first"
        >{`${new Date(itemDate).getDate()}.${new Date(itemDate).getMonth() + 1}.${new Date(itemDate).getFullYear()}`}</td>
        <td
          className="staff-edit-orders-interruption-table__desc table__col"
        >{tableItem.attributes.post_name}</td>
        <td
          className="staff-edit-orders-interruption-table__file table__col"
        >
          <a href="" target="_blank">Скачать</a>
        </td>
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
    <table className={`staff-edit-orders-interruption-table table`}>
      <thead>
      <tr
        className="table__row table__row--head"
      >
        <th className="staff-edit-orders-interruption-table__date table__col table__col--first table__col--head">
          <SortItem
            label="Дата"
            name="at"
            sortedBy={sortedBy}
            sortedDown={sortedDown}
            onSortClick={onSortClick}
          />
        </th>
        <th className="staff-edit-orders-interruption-table__desc table__col table__col--head">
          <SortItem
            label="Описание"
            name="desc"
            sortedBy={sortedBy}
            sortedDown={sortedDown}
            onSortClick={onSortClick}
          />
        </th>
        <th className="staff-edit-orders-interruption-table__file table__col table__col--head">
          <SortItem
            label="Документ"
            name="file"
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

export default StaffEditOrdersInterruptionTable;
