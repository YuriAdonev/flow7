import React, { useState, useEffect } from 'react';

import './directories-slug-table-hierarchic.scss';

import useFetch from '../../../../hooks/use-fetch';
import Spinner from "../../../../components/spinner/spinner";
import DirectoriesSlugTableHierarchicRow
  from "../directories-slug-table-hierarchic-row/directories-slug-table-hierarchic-row";
import SortItem from "../../../../components/sort-item/sort-item";

const DirectoriesSlugTableHierarchic = ({ pageSearch, slug }) => {
  const [tableData, setTableData] = useState([]);
  const [itemId, setItemId] = useState('');
  const [{response, isLoading, error}, doFetchTableData] = useFetch(`/directories/${slug}`);
  const [{response: itemUpdateResponse, isLoading: itemUpdateIsLoading, error: itemUpdateError}, doFetchItemUpdate] = useFetch(`/directories/${slug}/${itemId}`);
  const [{response: itemDeleteResponse, isLoading: itemDeleteIsLoading, error: itemDeleteError}, doFetchItemDelete] = useFetch(`/directories/${slug}/${itemId}`);
  const [{response: itemSaveResponse, isLoading: itemSaveIsLoading, error: itemSaveError}, doFetchItemSave] = useFetch(`/directories/${slug}`);

  const tableStructure = {
    tableClass: 'directories-slug-table-hierarchic',
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

  const onItemUpdate = (tableItem) => {
    if (tableItem.id !== 'new') {
      setItemId(tableItem.id);
      doFetchItemUpdate({
        method: 'PUT',
        data: JSON.stringify({
          data: {
            name: tableItem.attributes.name,
            abbr: tableItem.attributes.abbr,
            description: tableItem.attributes.description,
            parent_id: tableItem.attributes.parentId
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
    newTableData.unshift({id: 'new', attributes: {name: '', parentId: null, depth: 0}});
    setTableData(newTableData);
  };

  const onAddChild = (id, depth) => {
    const newTableData = tableData.slice();
    const parentIndex = newTableData.findIndex(it => it.id === id);
    const before = newTableData.slice(0, parentIndex + 1);
    const after = newTableData.slice(parentIndex + 1);
    setTableData([...before, {id: 'new', attributes: {name: '', parentId: id, depth: depth + 1}}, ...after]);
  };

  const onItemSave = (tableItem) => {
    doFetchItemSave({
      method: 'POST',
      data: JSON.stringify({
        data: {
          name: tableItem.attributes.name,
          abbr: tableItem.attributes.abbr,
          description: tableItem.attributes.description,
          parent_id: tableItem.attributes.parentId
        }
      })
    });
  };

  const items = tableData.map((item) => {
    return (
      <DirectoriesSlugTableHierarchicRow
        key={item.id}
        tableItem={item}
        tableStructure={tableStructure}
        onItemUpdate={onItemUpdate}
        onAddChild={onAddChild}
        onItemDelete={onItemDelete}
        onItemSave={onItemSave}
      />
    )
  });

  return (
    <>
      <button
        className="directories-slug-table-hierarchic-add btn"
        type="button"
        onClick={onItemAdd}
      >
        Добавить
      </button>
      <table className={`directories-slug-table-hierarchic table`}>
        <thead>
        <tr
          className="table__row table__row--head"
        >
          <th className="table__col table__col--first table__col--head table__col--actions"/>
          <th className="directories-slug-table-hierarchic__name table__col table__col--head">Название</th>
          <th className="directories-slug-table-hierarchic__abbr table__col table__col--head">Аббревиатура</th>
          <th className="directories-slug-table-hierarchic__description table__col table__col--head">Описание</th>
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

export default DirectoriesSlugTableHierarchic;
