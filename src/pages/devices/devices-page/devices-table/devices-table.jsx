import React, { useState, useEffect } from 'react';

import './devices-table.scss';

import Spinner from "../../../../components/spinner/spinner";
import SortItem from "../../../../components/sort-item/sort-item";
import TableActions from "../../../../components/table/table-actions/table-actions";
import {getPerfectDate} from "../../../../utils";

const DevicesTable = ({ tableData, onItemDelete, onItemEdit, onItemDetails, sortedBy, sortedDown, onSortClick, isLoading, error }) => {

  const tableActions = {
    title: 'Действия',
    itemsList: [
      {
        name: 'Редактировать',
        onClick: onItemDetails
      },
      // {
      //   name: 'Удалить',
      //   onClick: onItemDelete
      // },
    ]
  };

  const items = tableData.map(tableItem => {
    const itemDate = new Date(tableItem.attributes.initialized_at);

    const sensorTypes = [];
    tableItem.attributes.sensor_types.forEach(item => {
      sensorTypes.push(item.name);
    });

    return (
      <tr
        key={tableItem.id}
        className="table__row"
      >
        <td
          className="devices-table__serial-number table__col table__col--first"
          onClick={() => onItemDetails(tableItem.id, tableItem.attributes.sensor_types, tableItem.attributes.serial_number)}
        >{tableItem.attributes.serial_number}</td>
        <td
          className="devices-table__model table__col"
          onClick={() => onItemDetails(tableItem.id, tableItem.attributes.sensor_types, tableItem.attributes.serial_number)}
        >{tableItem.attributes.model}</td>
        <td
          className="devices-table__date table__col"
          onClick={() => onItemDetails(tableItem.id, tableItem.attributes.sensor_types, tableItem.attributes.serial_number)}
        >{getPerfectDate(itemDate)}</td>
        <td
          className="devices-table__slots table__col"
          onClick={() => onItemDetails(tableItem.id, tableItem.attributes.sensor_types, tableItem.attributes.serial_number)}
        >{tableItem.attributes.slots_count}</td>
        <td
          className="devices-table__type table__col"
          onClick={() => onItemDetails(tableItem.id, tableItem.attributes.sensor_types, tableItem.attributes.serial_number)}
        >{sensorTypes.join(', ')}</td>
        <td
          className="devices-table__online table__col"
          onClick={() => onItemDetails(tableItem.id, tableItem.attributes.sensor_types, tableItem.attributes.serial_number)}
        >
          <div className={`devices-table__online-indicator${tableItem.attributes.online ? ' devices-table__online-indicator--online' : ' devices-table__online-indicator--offline'}`} />
        </td>
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
    <table className={`devices-table table`}>
      <thead>
      <tr
        className="table__row table__row--head"
      >
        <th className="devices-table__serial-number table__col table__col--first table__col--head">
          <SortItem
            label="Серийный номер"
            name="serialNumber"
            sortedBy={sortedBy}
            sortedDown={sortedDown}
            onSortClick={onSortClick}
          />
        </th>
        <th className="devices-table__model table__col table__col--head">Модель</th>
        <th className="devices-table__date table__col table__col--head">Дата установки</th>
        <th className="devices-table__slots table__col table__col--head">Слоты</th>
        <th className="devices-table__type table__col table__col--head">Тип данных</th>
        <th className="devices-table__online table__col table__col--head">Онлайн</th>
        <th className="table__col table__col--head table__col--last table__col--actions"/>
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

export default DevicesTable;
