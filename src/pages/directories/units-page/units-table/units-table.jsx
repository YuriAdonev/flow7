import React, { useState, useEffect } from 'react';

import './units-table.scss';

import EditableTable from '../../../../components/editable-table/editable-table/editable-table';
import useFetch from '../../../../hooks/use-fetch';
import TableActions from "../../../../components/table/table-actions/table-actions";
import DirectoriesSlugTableRow from "../../directories-slug-page/directories-slug-table-row/directories-slug-table-row";
import UnitsTableRow from "../units-table-row/units-table-row";

const UnitsTable = ({ pageSearch }) => {
  const [tableData, setTableData] = useState([]);
  const [itemId, setItemId] = useState('');
  const [{response, isLoading, error}, doFetchTableData] = useFetch('/directories/units');
  const [{response: itemUpdateResponse, isLoading: itemUpdateIsLoading, error: itemUpdateError}, doFetchItemUpdate] = useFetch(`/directories/units/${itemId}`);
  const [{response: itemDeleteResponse, isLoading: itemDeleteIsLoading, error: itemDeleteError}, doFetchItemDelete] = useFetch(`/directories/units/${itemId}`);
  const [{response: itemSaveResponse, isLoading: itemSaveIsLoading, error: itemSaveError}, doFetchItemSave] = useFetch(`/directories/units`);

  const tableStructure = {
    tableClass: 'units-table',
    colsList: [
      {
        name: 'name',
        colClass: 'name',
        header: 'Название',
        placeholder: 'Введите название',
        isActive: true,
      },
      {
        name: 'label',
        colClass: 'short-name',
        header: 'Метка',
        placeholder: 'Введите метку',
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
    if (tableItem.attributes.name !== '' || tableItem.attributes.label !== '') {
      if (tableItem.id !== 'new') {
        setItemId(tableItem.id);
        doFetchItemUpdate({
          method: 'PUT',
          data: JSON.stringify({
            data: {
              name: tableItem.attributes.name,
              label: tableItem.attributes.label
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
          label: tableItem.attributes.label
        }
      })
    });
  };

  const items = tableData.map((item) => {
    return (
      <UnitsTableRow
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
    <>
      <button
        className="units-table-add btn"
        type="button"
        onClick={onItemAdd}
      >
        Добавить
      </button>
      <table className={`units-table table`}>
        <thead>
          <tr
            className="table__row table__row--head"
          >
            <th className="table__col table__col--first table__col--head table__col--actions"/>
            <th className="units-table__name table__col table__col--head">Название</th>
            <th className="units-type-edit-table__short-name table__col table__col--head">Метка</th>
            <th className="table__col table__col--last table__col--save"/>
          </tr>
        </thead>
        <tbody>
        {items}
        </tbody>
      </table>
    </>
  );
};

export default UnitsTable;
