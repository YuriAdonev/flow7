import React from 'react';

import './material-types-edit-table.scss';

import TableActions from "../../../../components/table/table-actions/table-actions";
import MaterialTypesEditTableRow from "../material-types-edit-table-row/material-types-edit-table-row";

const MaterialTypesEditTable = ({
                                   id,
                                   fieldTypes,
                                   onInputChange,
                                   onAddRow,
                                   unitsList,
                                   directoriesList,
                                   setItem,
                                   onAddChildren,
                                   onItemDelete
                                 }) => {
  const tableActions = {
    title: 'Действия',
    itemsList: [
      {
        name: 'Добавить строку',
        onClick: onAddRow
      }
    ]
  };

  const rows = fieldTypes.map((item, index) => {
    return (
      <MaterialTypesEditTableRow
        key={index}
        index={index}
        id={id}
        item={item}
        onInputChange={onInputChange}
        fieldTypes={fieldTypes}
        onAddChildren={onAddChildren}
        onItemDelete={onItemDelete}
        unitsList={unitsList}
        setItem={setItem}
        directoriesList={directoriesList}
      />
    );
  });

  return (
    <table className={`material-type-edit-table table`}>
      <thead>
        <tr
          className="table__row table__row--head"
        >
          <th className="table__col table__col--first table__col--head table__col--actions">
            <TableActions
              tableActions={tableActions}
              id="head"
            />
          </th>
          <th className="material-type-edit-table__characteristic table__col table__col--head">Характеристика</th>
          <th className="material-type-edit-table__required table__col table__col--head">Обязательное</th>
          <th className="material-type-edit-table__value-type table__col table__col--head">Тип значения</th>
          <th className="material-type-edit-table__default table__col table__col--last table__col--head">Значение по умолчанию</th>
          <th className="material-type-edit-table__units table__col table__col--last table__col--head">Условные обозначения</th>
        </tr>
      </thead>
      <tbody>
      {rows}
      </tbody>
    </table>
  );
};

export default MaterialTypesEditTable;
