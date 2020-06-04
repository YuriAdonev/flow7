import React, { useState, useEffect } from 'react';

import './subdivisions-table.scss';

import useFetch from '../../../../hooks/use-fetch';
import EditableTable from '../../../../components/editable-table/editable-table/editable-table';

const SubdivisionsTable = ({ pageSearch }) => {
  const [tableData, setTableData] = useState([]);
  const [itemId, setItemId] = useState('');
  const [{response, isLoading, error}, doFetchTableData] = useFetch('/directories/branches');
  const [{response: itemUpdateResponse, isLoading: itemUpdateIsLoading, error: itemUpdateError}, doFetchItemUpdate] = useFetch(`/directories/branches/${itemId}`);
  const [{response: itemDeleteResponse, isLoading: itemDeleteIsLoading, error: itemDeleteError}, doFetchItemDelete] = useFetch(`/directories/branches/${itemId}`);
  const [{response: itemSaveResponse, isLoading: itemSaveIsLoading, error: itemSaveError}, doFetchItemSave] = useFetch(`/directories/branches`);

  const tableStructure = {
    tableClass: 'subdivisions-table',
    colsList: [
      {
        name: 'name',
        colClass: 'name',
        header: 'Название',
        placeholder: 'Введите название',
        isActive: true,
      },
      {
        name: 'chief',
        colClass: 'chief',
        header: 'Директор',
        placeholder: 'Введите директора',
        isActive: true,
      },
    ]
  };

  useEffect(() => {
    doFetchTableData();
  }, [itemUpdateResponse, itemDeleteResponse, itemSaveResponse]);

  useEffect(() => {
    if (!response) {
      return
    }
    setTableData(response.data);
  }, [response]);

  const onItemUpdate = (tableItem) => {
    if (tableItem.attributes.name !== '' || tableItem.attributes.label !== '') {
      if (tableItem.id !== 'new') {
        setItemId(tableItem.id);
        doFetchItemUpdate({
          method: 'PUT',
          data: JSON.stringify({
            data: {
              name: tableItem.attributes.name,
              chief: tableItem.attributes.chief,
            }
          })
        });
      }
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
          chief: tableItem.attributes.chief,
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
};

export default SubdivisionsTable;
