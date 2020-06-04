import React from 'react';

import './manufacturers-models-table.scss';

import TableActions from "../../../../components/table/table-actions/table-actions";
import SortItem from "../../../../components/sort-item/sort-item";
import Spinner from "../../../../components/spinner/spinner";

const ManufacturersModelsTable = ({ tableData, isLoading, error, setShowEdit, onItemDelete, sortedBy, sortedDown, onSortClick, equipmentTypesList, materialTypesList }) => {

  const onItemEdit = (id, type) => {
    setShowEdit(id, type);
  };

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

  const newTableData = [];
  if (equipmentTypesList.length !== 0 || materialTypesList.length !== 0) {
    tableData.forEach(item => {
      let currentType;
      if (item.attributes.equipment_type_id) {
        currentType = equipmentTypesList.find(it => it.id === item.attributes.equipment_type_id.toString());
      } else {
        currentType = materialTypesList.find(it => it.id === item.attributes.material_type_id.toString());
      }
      const currentTypeName = currentType.attributes.name;
      newTableData.push({
        ...item, attributes: {...item.attributes, equipmentType: currentTypeName}
      })
    });
  }

  const items = newTableData.map(tableItem => {
    return (
      <tr
        key={tableItem.id}
        className="table__row"
      >
        <td
          className="manufacturers-models-table__name table__col table__col--first"
          onClick={() => onItemEdit(tableItem.id, tableItem.type)}
        >{tableItem.attributes.name}</td>
        <td
          className="manufacturers-models-table__equipment-type table__col"
          onClick={() => onItemEdit(tableItem.id, tableItem.type)}
        >{tableItem.attributes.equipmentType}</td>
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
    <table className={`manufacturers-models-table table`}>
      <thead>
      <tr
        className="table__row table__row--head"
      >
        <th className="manufacturers-models-table__name table__col table__col--first table__col--head">Название</th>
        <th className="manufacturers-models-table__equipment-type table__col table__col--head">Тип оборудования</th>
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
      ) : newTableData.length === 0 ? (
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

export default ManufacturersModelsTable;
