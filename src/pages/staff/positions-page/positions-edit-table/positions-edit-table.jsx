import React from 'react';

import './positions-edit-table.scss';

import TableActions from "../../../../components/table/table-actions/table-actions";
import PositionsEditTableRow from "../positions-edit-table-row/positions-edit-table-row";
import Spinner from "../../../../components/spinner/spinner";

const PositionsEditTable = ({
                      id,
                      fieldTypes,
                      onInputChange,
                      onAddRow,
                      unitsList,
                      directoriesList,
                      setItem,
                      onAddChildren,
                      onItemDelete,
                      deleteItem,
                      isLoading,
                      error
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
      <PositionsEditTableRow
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
    <table className={`positions-edit-table table`}>
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
          <th className="positions-edit-table__label table__col table__col--head">Характеристика</th>
          <th className="positions-edit-table__required table__col table__col--head">Обязательное</th>
          <th className="positions-edit-table__type table__col table__col--head">Тип значения</th>
          <th className="positions-edit-table__default table__col table__col--last table__col--head">Значение по умолчанию</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};

export default PositionsEditTable;
