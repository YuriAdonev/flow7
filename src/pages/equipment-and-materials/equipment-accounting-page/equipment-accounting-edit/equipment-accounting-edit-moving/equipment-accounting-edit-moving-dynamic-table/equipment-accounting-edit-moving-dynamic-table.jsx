import React, { useState, useEffect } from 'react';

import './equipment-accounting-edit-moving-dynamic-table.scss';

import Spinner from "../../../../../../components/spinner/spinner";
import TableActions from "../../../../../../components/table/table-actions/table-actions";
import {getStatusString} from "../../../../../../utils";
import SortItem from "../../../../../../components/sort-item/sort-item";

const EquipmentAccountingEditMovingDynamicTable = ({ tableData, onItemEdit, onItemDelete, sortedBy, sortedDown, onSortClick, isLoading, error, statusList }) => {

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
      }
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
          className="equipment-accounting-edit-moving-dynamic-table__date table__col table__col--first"
          onClick={() => onItemEdit(tableItem.id)}
        >{`${new Date(itemDate).getDate()}.${new Date(itemDate).getMonth() + 1}.${new Date(itemDate).getFullYear()}`}</td>
        <td
          className="equipment-accounting-edit-moving-dynamic-table__subdivision table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.division_name}</td>
        <td
          className="equipment-accounting-edit-moving-dynamic-table__position table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.parent_name === null && tableItem.attributes.position === null ? '' : `${tableItem.attributes.parent_name} / ${tableItem.attributes.position}`}</td>
        <td
          className="equipment-accounting-edit-moving-dynamic-table__desc table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.description}</td>
        <td
          className="equipment-accounting-edit-moving-dynamic-table__status table__col"
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

  return (
    <table className={`equipment-accounting-edit-moving-dynamic-table table`}>
      <thead>
      <tr
        className="table__row table__row--head"
      >
        <th className="equipment-accounting-edit-moving-dynamic-table__date table__col table__col--first table__col--head">Дата</th>
        <th className="equipment-accounting-edit-moving-dynamic-table__subdivision table__col table__col--head">Подразделение</th>
        <th className="equipment-accounting-edit-moving-dynamic-table__position table__col table__col--head">Внутри оборудования / Позиция</th>
        <th className="equipment-accounting-edit-moving-dynamic-table__desc table__col table__col--head">Описание</th>
        <th className="equipment-accounting-edit-moving-dynamic-table__status table__col table__col--head">Статус</th>
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

export default EquipmentAccountingEditMovingDynamicTable;
