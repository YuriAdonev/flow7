import React, { useState, useEffect } from 'react';

import './equipment-accounting-edit-moving-connected-table.scss';

import Spinner from "../../../../../../components/spinner/spinner";
import TableActions from "../../../../../../components/table/table-actions/table-actions";
import useFetch from "../../../../../../hooks/use-fetch";
import {getStatusString} from "../../../../../../utils";
import SortItem from "../../../../../../components/sort-item/sort-item";

const EquipmentAccountingEditMovingConnectedTable = ({ equipmentList, itemId, tableData, onItemDelete, onItemEdit, sortedBy, sortedDown, onSortClick, isLoading, error, subdivisionList }) => {
  const [newEquipmentList, setNewEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [equipmentId, setEquipmentId] = useState('');
  const [equipmentIdList, setEquipmentIdList] = useState([]);

  const [{response: sensorsResponse, isLoading: sensorsIsLoading, error: sensorsError}, doFetchSensors] = useFetch(`/directories/equipment_items/${equipmentId}/sensors`);


  const tableActions = {
    title: 'Действия',
    itemsList: [
      {
        name: '???',
        onClick: () => {console.log('действие ???')}
      }
    ]
  };

  useEffect(() => {
    console.log('connected-table equipmentList', equipmentList);
    const currentItem = equipmentList.slice().find(it => it.id === itemId);
    console.log('connected-table parentId', currentItem);
    if (currentItem.attributes.parent_id !== null) {
      const arr = equipmentList.slice().filter(it => it.attributes.parent_id == currentItem.attributes.parent_id);
      setNewEquipmentList(arr);
    }
    setLoading(false);
  }, []);

  const items = newEquipmentList.map((tableItem, index) => {
    const itemDate = new Date(tableItem.attributes.at);
    return (
      <tr
        key={tableItem.id}
        className="table__row"
      >
        <td
          className="equipment-accounting-edit-moving-connected-table__date table__col table__col--first"
          onClick={() => onItemEdit(tableItem.id)}
        >{`${new Date(itemDate).getDate()}.${new Date(itemDate).getMonth() + 1}.${new Date(itemDate).getFullYear()}`}</td>
        <td
          className="equipment-accounting-edit-moving-connected-table__equipment table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.name}</td>
        <td
          className="equipment-accounting-edit-moving-connected-table__position table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.position}</td>
        <td
          className="equipment-accounting-edit-moving-connected-table__device table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.device}</td>
        <td
          className="equipment-accounting-edit-moving-connected-table__status table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{getStatusString(tableItem.attributes.status)}</td>
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
    <table className={`equipment-accounting-edit-moving-connected-table table`}>
      <thead>
      <tr
        className="table__row table__row--head"
      >
        <th className="equipment-accounting-edit-moving-connected-table__date table__col table__col--first table__col--head">Дата</th>
        <th className="equipment-accounting-edit-moving-connected-table__equipment table__col table__col--head">Оборудование</th>
        <th className="equipment-accounting-edit-moving-connected-table__position table__col table__col--head">Позиция</th>
        <th className="equipment-accounting-edit-moving-connected-table__device table__col table__col--head">Устройство</th>
        <th className="equipment-accounting-edit-moving-connected-table__status table__col table__col--head">Состояние</th>
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
      ) : newEquipmentList.length === 0 ? (
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

export default EquipmentAccountingEditMovingConnectedTable;
