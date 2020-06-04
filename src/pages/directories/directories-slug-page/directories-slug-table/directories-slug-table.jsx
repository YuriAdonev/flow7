import React, { useState, useEffect } from 'react';

import './directories-slug-table.scss';

import useFetch from '../../../../hooks/use-fetch';
import SortItem from "../../../../components/sort-item/sort-item";
import Spinner from "../../../../components/spinner/spinner";
import DirectoriesSlugTableRow from "../directories-slug-table-row/directories-slug-table-row";

const DirectoriesSlugTable = ({ pageSearch, slug }) => {
  const [tableData, setTableData] = useState([]);
  const [itemId, setItemId] = useState('');
  const [sortedBy, setSortedBy] = useState('name');
  const [sortedDown, setSortedDown] = useState(true);

  const [{response, isLoading, error}, doFetchTableData] = useFetch(`/directories/${slug}`);
  const [{response: itemUpdateResponse, isLoading: itemUpdateIsLoading, error: itemUpdateError}, doFetchItemUpdate] = useFetch(`/directories/${slug}/${itemId}`);
  const [{response: itemDeleteResponse, isLoading: itemDeleteIsLoading, error: itemDeleteError}, doFetchItemDelete] = useFetch(`/directories/${slug}/${itemId}`);
  const [{response: itemSaveResponse, isLoading: itemSaveIsLoading, error: itemSaveError}, doFetchItemSave] = useFetch(`/directories/${slug}`);

  const tableStructure = {
    tableClass: 'directories-slug-table',
    colsList: [
      {
        name: 'name',
        colClass: 'name',
        header: 'Название',
        placeholder: 'Введите название',
        isActive: true,
      },
      {
        name: 'abbr',
        colClass: 'abbr',
        header: 'Аббревиатура',
        placeholder: 'Введите аббревиатуру',
        isActive: true,
      },
      {
        name: 'description',
        colClass: 'description',
        header: 'Описание',
        placeholder: 'Введите описание',
        isActive: true,
      },
    ]
  };

  useEffect(() => {
    doFetchTableData();
  }, [itemDeleteResponse, itemSaveResponse, slug]);

  useEffect(() => {
    if (!response) {
      return
    }
    setTableData(response.data);
  }, [response]);

  const onSortClick = (name) => {
    if (name === sortedBy) {
      setSortedDown(!sortedDown);
    }
    if (name !== sortedBy) {
      setSortedBy(name);
      setSortedDown(true);
    }
  };

  const onItemUpdate = (tableItem) => {
    if (tableItem.id !== 'new') {
      setItemId(tableItem.id);
      doFetchItemUpdate({
        method: 'PUT',
        data: JSON.stringify({
          data: {
            name: tableItem.attributes.name,
            abbr: tableItem.attributes.abbr,
            description: tableItem.attributes.description
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
    newTableData.unshift({id: 'new', attributes: {name: ''}});
    setTableData(newTableData);
  };

  const onItemSave = (tableItem) => {
    doFetchItemSave({
      method: 'POST',
      data: JSON.stringify({
        data: {
          name: tableItem.attributes.name,
          abbr: tableItem.attributes.abbr,
          description: tableItem.attributes.description
        }
      })
    });
  };

  const items = tableData.map((item) => {
    return (
      <DirectoriesSlugTableRow
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
        className="directories-slug-table-add btn"
        type="button"
        onClick={onItemAdd}
      >
        Добавить
      </button>
      <table className={`directories-slug-table table`}>
        <thead>
          <tr
            className="table__row table__row--head"
          >
            <th className="table__col table__col--first table__col--head table__col--actions"/>
            <th className="directories-slug-table__name table__col table__col--head">Название</th>
            <th className="directories-slug-table__abbr table__col table__col--head">Аббревиатура</th>
            <th className="directories-slug-table__description table__col table__col--head">Описание</th>
            <th className="table__col table__col--last table__col--save"/>
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
    </>
  );
};

export default DirectoriesSlugTable;
