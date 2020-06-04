import React, { useState, useEffect } from 'react';

import EditableTableRow from '../editable-table-row/editable-table-row';
import EditableTableHeader from '../editable-table-header/editable-table-header';
import Spinner from '../../spinner/spinner';

const EditableTable = ({ tableData, tableStructure, onItemUpdate, onItemDelete, onItemAdd, onItemSave, pageSearch, isLoading, error }) => {
  const [filteredTableData, setFilteredTableData] = useState([]);

  useEffect(() => {
    let newTableData = tableData.slice().sort((a, b) => {
      return a.attributes.name.toLowerCase() > b.attributes.name.toLowerCase() ? 1 : -1;
    });
    if (pageSearch !== '') {
      const regex = new RegExp(pageSearch.toLowerCase(), 'g');
      newTableData = newTableData.filter((item) => item.attributes.name.toLowerCase().match(regex));
    }
    setFilteredTableData(newTableData);
  }, [tableData, pageSearch]);

  const items = filteredTableData.map((item) => {
    return (
      <EditableTableRow
        key={item.id}
        tableItem={item}
        tableStructure={tableStructure}
        onItemUpdate={onItemUpdate}
        onItemDelete={onItemDelete}
        onItemSave={onItemSave}
      />
    )
  });

  return (
    <div className={`${tableStructure.tableClass} table`}>
      <button
        className="editable-table-add btn"
        type="button"
        onClick={onItemAdd}
      >
        Добавить
      </button>
      <EditableTableHeader
        tableStructure={tableStructure}
        onItemAdd={onItemAdd}
      />
      <div className={`${tableStructure.tableClass}__wrap table__wrap`}>
        {!isLoading && !error && tableData.length === 0 ? (
          <div className="table__empty">Данные отсутствуют</div>
        ) : isLoading ? <Spinner/> : error ? <div className="table__error">Ошибка загрузки</div> : items}
      </div>
    </div>
  );
};

export default EditableTable;
