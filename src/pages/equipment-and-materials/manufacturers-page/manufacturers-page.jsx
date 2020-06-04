import React, { useState, useEffect } from 'react';

import './manufacturers-page.scss';

import PageFilter from '../../../components/filter/page-filter/page-filter';
import ManufacturersEdit from './manufacturers-edit/manufacturers-edit';
import Layout from '../../../components/layout/layout';
import useFetch from '../../../hooks/use-fetch';
import { useStore } from '../../../hooks-store/store';
import ManufacturersTable from "./manufacturers-table/manufacturers-table";

const ManufacturersPage = () => {
  const dispatch = useStore()[1];
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState([]);
  const [pageSearch, setPageSearch] = useState('');
  const [itemId, setItemId] = useState('new');
  const [sortedBy, setSortedBy] = useState('name');
  const [sortedDown, setSortedDown] = useState(true);

  const [{response, isLoading, error}, doFetchTableData] = useFetch('/directories/producers');
  const [{response: itemDeleteResponse, isLoading: itemDeleteIsLoading, error: itemDeleteError}, doFetchItemDelete] = useFetch(`/directories/producers/${itemId}`);

  useEffect(() => {
    doFetchTableData();
    return () => {
      dispatch('SET_MODAL_OPENED', false);
    }
  }, []);

  useEffect(() => {
    if (itemDeleteIsLoading) {
      return;
    }
    doFetchTableData();
  }, [itemDeleteIsLoading]);

  useEffect(() => {
    if (!response) {
      return
    }
    const newTableData = [];
    response.data.forEach(it => {
      const typeNames = [...it.attributes.equipment_type_names, ...it.attributes.material_type_names];
      newTableData.push({
        id: it.id,
        attributes: {
          name: it.attributes.name,
          modelsCount: it.attributes.models_count,
          country: it.attributes.country,
          equipmentTypes: typeNames.join(', ')
        }
      })
    });
    setTableData(newTableData);
  }, [response]);

  useEffect(() => {
    dispatch('SET_MODAL_OPENED', showModal);
  }, [showModal]);

  const onAddClick = () => {
    setShowModal(true);
  };

  const headerData = {
    title: 'Производители',
    breadcrumbsList: [
      {
        name: 'Оборудование и материалы',
        link: '/'
      },
    ],
    buttonsList: [
      {
        text: 'Создать',
        action: () => onAddClick()
      }
    ],
  };

  const pageFiltersData = {
    search: {
      placeholder: 'Поиск по названию',
      action: ''
    },
    defaultFiltersCount: 3,
    filtersList: [
      // {
      //   name: 'Тип оборудования',
      //   category: 'equipmentType',
      //   list: ['СМУ-1', 'СМУ-2', 'СМУ-3', 'СМУ-4']
      // },
      // {
      //   name: 'Тип материалов',
      //   category: 'materialType',
      //   list: ['Неповоротная сварка труб', 'Поворотная сварка труб']
      // },
    ],
    calendarShow: false,
  };

  const onSortClick = (name) => {
    if (name === sortedBy) {
      setSortedDown(!sortedDown);
    }
    if (name !== sortedBy) {
      setSortedBy(name);
      setSortedDown(true);
    }
  };

  const onCloseEdit = () => {
    setShowModal(false);
    setItemId('new');
    reloadTable();
  };

  const onShowEdit = (id) => {
    if (id !== 'new') {
      setShowModal(true);
      setItemId(id);
    }
  };

  const onItemDelete = (id) => {
    setItemId(id);
    doFetchItemDelete({
      method: 'DELETE'
    });
  };

  const reloadTable = () => {
    doFetchTableData();
  };

  return (
    <Layout
      headerData={headerData}
      isWide={true}
    >
      <PageFilter
        filters={filters}
        pageFilters={pageFiltersData}
        setFilters={setFilters}
        pageSearch={pageSearch}
        setPageSearch={setPageSearch}
      />
      <div className="content">
        <ManufacturersTable
          sortedBy={sortedBy}
          sortedDown={sortedDown}
          onSortClick={onSortClick}
          tableData={tableData}
          onItemEdit={onShowEdit}
          onItemDelete={onItemDelete}
          pageSearch={pageSearch}
          isLoading={isLoading}
          error={error}
        />
      </div>
      {showModal && (
        <ManufacturersEdit
          onClose={onCloseEdit}
          itemId={itemId}
          reloadTable={reloadTable}
        />
      )}
    </Layout>
  );
};

export default ManufacturersPage;
