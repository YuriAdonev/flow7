import React, {Component, useEffect, useState} from 'react';

import './welding-methods-table.scss';

import EditableTable from '../../../../components/editable-table/editable-table/editable-table';
import useFetch from "../../../../hooks/use-fetch";

const WeldingMethodsTable = ({ pageSearch }) => {
  const [tableData, setTableData] = useState([]);
  const [itemId, setItemId] = useState('');
  const [{response, isLoading, error}, doFetchTableData] = useFetch('/directories/welding_methods');
  const [{response: itemUpdateResponse, isLoading: itemUpdateIsLoading, error: itemUpdateError}, doFetchItemUpdate] = useFetch(`/directories/welding_methods/${itemId}`);
  const [{response: itemDeleteResponse, isLoading: itemDeleteIsLoading, error: itemDeleteError}, doFetchItemDelete] = useFetch(`/directories/welding_methods/${itemId}`);
  const [{response: itemSaveResponse, isLoading: itemSaveIsLoading, error: itemSaveError}, doFetchItemSave] = useFetch(`/directories/welding_methods`);

  const tableStructure = {
    tableClass: 'welding-methods-table',
    colsList: [
      {
        name: 'name',
        colClass: 'name',
        header: 'Название',
        placeholder: 'Введите название',
        isActive: true,
      },
      {
        name: 'cipher',
        colClass: 'cipher',
        header: 'Шифр',
        placeholder: 'Введите шифр',
        isActive: true,
      },
      {
        name: 'number',
        colClass: 'number',
        header: 'Номер',
        placeholder: 'Введите номер',
        isActive: true,
      },
    ]
  };

  useEffect(() => {
    doFetchTableData();
  }, [itemDeleteResponse, itemSaveResponse]);

  useEffect(() => {
    if (!response) {
      return
    }
    setTableData(response.data);
  }, [response]);

  const onItemUpdate = (tableItem) => {
    if (tableItem.id !== 'new') {
      setItemId(tableItem.id);
      doFetchItemUpdate({
        method: 'PUT',
        data: JSON.stringify({
          data: {
            name: tableItem.attributes.name,
            cipher: tableItem.attributes.cipher,
            number: tableItem.attributes.number
          }
        })
      });
    }
  };

  const onItemDelete = (id) => {
    setItemId(id);
    doFetchItemDelete({
      method: 'DELETE'
    });
  };

  const onItemAdd = () => {
    const newTableData = tableData.slice();
    newTableData.unshift({id: 'new', attributes: {name: '', label: ''}});
    setTableData(newTableData);
  };

  const onItemSave = (tableItem) => {
    doFetchItemSave({
      method: 'POST',
      data: JSON.stringify({
        data: {
          name: tableItem.attributes.name,
          cipher: tableItem.attributes.cipher,
          number: tableItem.attributes.number
        }
      })
    });
  };

  return (
    <EditableTable
      tableStructure={tableStructure}
      tableData={tableData}
      isLoading={isLoading}
      pageSearch={pageSearch}
      error={error}

      onItemUpdate={onItemUpdate}
      onItemDelete={onItemDelete}
      onItemAdd={onItemAdd}
      onItemSave={onItemSave}
    />
  );
}

export default WeldingMethodsTable;
