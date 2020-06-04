import React from 'react';

import './equipment-accounting-table.scss';

import Spinner from "../../../../components/spinner/spinner";
import TableActions from "../../../../components/table/table-actions/table-actions";
import SortItem from "../../../../components/sort-item/sort-item";
import { getPerfectDate } from "../../../../utils";

const EquipmentAccountingTable = ({ onItemEdit, onItemDelete, producerCol, dateCol, sortedBy, sortedDown, onSortClick, isLoading, error, tableData }) => {

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
          className="equipment-accounting-table__invent-number table__col table__col--first"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.inventory_number}</td>
        <td
          className="equipment-accounting-table__name table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.name}</td>
        <td
          className="equipment-accounting-table__division table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.division_name}</td>
        <td
          className="equipment-accounting-table__manufacture table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >
          {producerCol === 'model' && tableItem.attributes.equipment_model_name}
          {producerCol === 'producer' && tableItem.attributes.producer_name}
        </td>
        <td
          className="equipment-accounting-table__factory-number table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.factory_number}</td>
        <td
          className="equipment-accounting-table__date table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >
          {dateCol === 'parent' ? tableItem.attributes.parent_changed_at === null ? '' : getPerfectDate(tableItem.attributes.parent_changed_at) : ''}
          {dateCol === 'status' ? tableItem.attributes.status_changed_at === null ? '' : getPerfectDate(tableItem.attributes.status_changed_at) : ''}
          {dateCol === 'division' ? tableItem.attributes.division_changed_at === null ? '' : getPerfectDate(tableItem.attributes.division_changed_at) : ''}
        </td>
        <td
          className="equipment-accounting-table__device table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.device}</td>
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
    <table className={`equipment-accounting-table table`}>
      <thead>
        <tr
          className="table__row table__row--head"
        >
          <th className="equipment-accounting-table__invent-number table__col table__col--first table__col--head">
            <SortItem
              label="Инвент. номер"
              name="inventory_number"
              sortedBy={sortedBy}
              sortedDown={sortedDown}
              onSortClick={onSortClick}
            />
          </th>
          <th className="equipment-accounting-table__name table__col table__col--head">Название</th>
          <th className="equipment-accounting-table__division table__col table__col--head">Подразделение</th>
          <th className="equipment-accounting-table__manufacture table__col table__col--head">Производитель</th>
          <th className="equipment-accounting-table__factory-number table__col table__col--head">Заводской номер</th>
          <th className="equipment-accounting-table__date table__col table__col--head">Дата изменения</th>
          <th className="equipment-accounting-table__device table__col table__col--head">Устройство</th>
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

export default EquipmentAccountingTable;
