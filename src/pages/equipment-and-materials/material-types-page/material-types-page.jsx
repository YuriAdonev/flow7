import React, { useEffect, useState } from 'react';

import './material-types-page.scss';

import PageFilter from '../../../components/filter/page-filter/page-filter';
import MaterialTypesEdit from './material-types-edit/material-types-edit';
import useFetch from '../../../hooks/use-fetch';
import Layout from '../../../components/layout/layout';
import Table from '../../../components/table/table/table';
import { useStore } from '../../../hooks-store/store';
import EquipmentTypesTable from "../equipment-types-page/equipment-types-table/equipment-types-table";
import MaterialTypesTable from "./material-types-table/material-types-table";


const MaterialTypesPage = () => {
  const dispatch = useStore()[1];
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState([]);
  const [itemId, setItemId] = useState('new');
  const [pageSearch, setPageSearch] = useState('');
  const [sortedBy, setSortedBy] = useState('name');
  const [sortedDown, setSortedDown] = useState(true);
  const [{response, isLoading, error}, doFetchTableData] = useFetch('/directories/material_types');
  const [{response: itemDeleteResponse, isLoading: itemDeleteIsLoading, error: itemDeleteError}, doFetchItemDelete] = useFetch(`/directories/material_types/${itemId}`);

  const headerData = {
    title: 'Типы материалов',
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
    filtersList: [],
    calendarShow: false,
  };

  useEffect(() => {
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
    setTableData(response.data);
  }, [response]);

  useEffect(() => {
    dispatch('SET_MODAL_OPENED', showModal);
  }, [showModal]);

  const onSortClick = (name) => {
    if (name === sortedBy) {
      setSortedDown(!sortedDown);
    }
    if (name !== sortedBy) {
      setSortedBy(name);
      setSortedDown(true);
    }
  };

  const onAddClick = () => {
    setShowModal(true);
  };

  const onCloseEdit = () => {
    setShowModal(false);
    setItemId('new');
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
    reloadTable();
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
        <MaterialTypesTable
          sortedBy={sortedBy}
          sortedDown={sortedDown}
          onSortClick={onSortClick}
          tableData={tableData}
          onItemEdit={onShowEdit}
          onItemDelete={onItemDelete}
          isLoading={isLoading}
          pageSearch={pageSearch}
          error={error}
        />
      </div>
      {showModal && (
        <MaterialTypesEdit
          onClose={onCloseEdit}
          itemId={itemId}
          reloadTable={reloadTable}
        />
      )}
    </Layout>
  );
};

export default MaterialTypesPage;
