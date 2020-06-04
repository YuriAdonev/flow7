import React, { useState, useEffect } from 'react';

import './equipment-accounting-edit-sensors.scss';

import Spinner from "../../../../../components/spinner/spinner";
import TableActions from "../../../../../components/table/table-actions/table-actions";
import SortItem from "../../../../../components/sort-item/sort-item";

const EquipmentAccountingEditSensors = ({ error, tableData, isLoading, onItemDelete, onItemEdit, sortedBy, sortedDown, onSortClick }) => {

  const tableActions = {
    title: 'Действия',
    itemsList: [
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
          className="equipment-accounting-edit-sensors-table__date table__col table__col--first"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.date}</td>
        <td
          className="equipment-accounting-edit-sensors-table__device table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.device}</td>
        <td
          className="equipment-accounting-edit-sensors-table__serial table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.serialNumber}</td>
        <td
          className="equipment-accounting-edit-sensors-table__type table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.type}</td>
        <td
          className="equipment-accounting-edit-sensors-table__idle table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.idle_level}</td>
        <td
          className="equipment-accounting-edit-sensors-table__equipment table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.equipment}</td>
        <td
          className="equipment-accounting-edit-sensors-table__status table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.status}</td>
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
    <div className="equipment-accounting-edit-sensors">
      <table className={`equipment-accounting-edit-sensors-table table`}>
        <thead>
        <tr
          className="table__row table__row--head"
        >
          <th className="equipment-accounting-edit-sensors-table__date table__col table__col--first table__col--head">Дата подключения</th>
          <th className="equipment-accounting-edit-sensors-table__device table__col table__col--head">Устройство</th>
          <th className="equipment-accounting-edit-sensors-table__serial table__col table__col--head">Серийный номер</th>
          <th className="equipment-accounting-edit-sensors-table__type table__col table__col--head">Тип данных</th>
          <th className="equipment-accounting-edit-sensors-table__idle table__col table__col--head">Порог простоя</th>
          <th className="equipment-accounting-edit-sensors-table__equipment table__col table__col--head">Оборудовани</th>
          <th className="equipment-accounting-edit-sensors-table__status table__col table__col--head">Статус</th>
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
    </div>
  )
};

export default EquipmentAccountingEditSensors;
