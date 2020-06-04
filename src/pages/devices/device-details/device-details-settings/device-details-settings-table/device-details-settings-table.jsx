import React from 'react';

import './device-details-settings-table.scss';

import SortItem from "../../../../../components/sort-item/sort-item";
import Spinner from "../../../../../components/spinner/spinner";

const DeviceDetailsSettingsTable = ({ tableData, sensorTypes, sortedBy, sortedDown, onSortClick, isLoading, error}) => {

  const items = sensorTypes.map(sensor => {
    return (
      tableData.map((tableItem, index) => {
        const currentSensor = tableItem.sensors.find(it => it.sensor_type.data_key_name === sensor.data_key_name);
        return (
          <tr
            key={index}
            className="table__row"
          >
            <td
              className="device-details-settings-table__type table__col table__col--first"
            >{currentSensor.sensor_type.name}</td>
            <td
              className="device-details-settings-table__slot table__col"
            >{tableItem.number}</td>
            <td
              className="device-details-settings-table__const table__col"
            >-</td>
            <td
              className="device-details-settings-table__last table__col table__col--last"
            >-</td>
          </tr>
        )})
      )
    });

  return (
    <table className={`device-details-settings-table table`}>
      <thead>
      <tr
        className="table__row table__row--head"
      >
        <th className="device-details-settings-table__type table__col table__col--first table__col--head">Тип датчика</th>
        <th className="device-details-settings-table__slot table__col table__col--head">Слот</th>
        <th className="device-details-settings-table__const table__col table__col--head">Константа</th>
        <th className="device-details-settings-table__last table__col table__col--last table__col--head">Последняя активность</th>
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

export default DeviceDetailsSettingsTable;
