import React, { useState, useEffect } from 'react';

// import './table.scss';

import TableHeader from "../table-header/table-header";
import TableRow from "../table-row/table-row";
import Spinner from "../../spinner/spinner";

const Table = ({ tableData, tableStructure, onItemDelete, onItemEdit, pageSearch, isLoading, error, filterBy = 'name' }) => {
  const [filteredTableData, setFilteredTableData] = useState([]);

  useEffect(() => {
    let newTableData = tableData.slice().sort((a, b) => {
      const aValue = a.attributes[filterBy];
      const bValue = b.attributes[filterBy];
      return aValue.toLowerCase() > bValue.toLowerCase() ? 1 : -1;
    });
    if (pageSearch !== '') {
      const regex = new RegExp(pageSearch.toLowerCase(), 'g');
      newTableData = newTableData.filter((item) => {
        const filteredItem = item.attributes[filterBy];
        filteredItem.toLowerCase().match(regex)
      });
    }
    setFilteredTableData(newTableData);
  }, [tableData, pageSearch]);

  const items = filteredTableData.map((item, index) => {
    return (
      <TableRow
        key={index}
        index={index}
        tableItem={item}
        tableStructure={tableStructure}
        onItemDelete={onItemDelete}
        onItemEdit={onItemEdit}
      />
    )
  });

  return (
    <div className={`${tableStructure.tableClass} table`}>
      <TableHeader
        tableStructure={tableStructure}
      />
      <div className={`${tableStructure.tableClass}__wrap table__wrap`}>
        {!isLoading && !error && tableData.length === 0 ? (
          <div className="table__empty">Данные отсутствуют</div>
        ) : isLoading ? <Spinner/> : error ? <div className="table__error">Ошибка загрузки</div> : items}
      </div>
    </div>
  );
};

export default Table;
