import React from 'react';

import './types-table.scss';

import TypesTableHeader from "../types-table-header/types-table-header";
import TypesTableRow from "../types-table-row/types-table-row";

const TypesTable = ({
    id,
    fieldTypes,
    tableStructure,
    onInputChange,
    onAddRow,
    unitsList,
    directoriesList,
    setItem,
    onAddChildren,
    onItemDelete,
    deleteItem
  }) => {

  const rows = fieldTypes.map((item, index) => {
    return (
      <TypesTableRow
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
    <div className={`${tableStructure.tableClass} table`}>
      <TypesTableHeader
        tableStructure={tableStructure}
        onAddRow={onAddRow}
      />
      <div className={`${tableStructure.tableClass}__wrap table__wrap`}>
        {rows}
      </div>
    </div>
  );
};

export default TypesTable;
