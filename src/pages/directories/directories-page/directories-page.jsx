import React, {useState, useEffect, useContext} from 'react';

import PageFilter from '../../../components/filter/page-filter/page-filter';
import DirectoriesTable from './directories-table/directories-table';
import DirectoriesEdit from './directories-edit/directories-edit';
import Layout from '../../../components/layout/layout';
import useFetch from '../../../hooks/use-fetch';
import { useStore } from '../../../hooks-store/store';
import {CurrentUserContext} from "../../../contexts/current-user";
import DevicesTable from "../../devices/devices-page/devices-table/devices-table";

const DirectoriesPage = () => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [, dispatch] = useStore();
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState([]);
  const [itemId, setItemId] = useState('new');
  const [pageSearch, setPageSearch] = useState('');
  const [sortedBy, setSortedBy] = useState('name');
  const [sortedDown, setSortedDown] = useState(true);
  const [{response, isLoading, error}, doFetchTableData] = useFetch('/directories/directories');
  const [{response: itemDeleteResponse, isLoading: itemDeleteIsLoading, error: itemDeleteError}, doFetchItemDelete] = useFetch(`/directories/directories/${itemId}`);

  const headerData = {
    title: 'Справочники',
    breadcrumbsList: [
      {
        name: currentUserState.currentSite ? currentUserState.currentSite.name : '',
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
    doFetchTableData();
    return () => {
      dispatch('SET_MODAL_OPENED', false);
    }
  }, []);

  useEffect(() => {
    if (itemDeleteIsLoading) {
      return;
    }
    reloadTable();
  }, [itemDeleteIsLoading]);

  useEffect(() => {
    if (!response) {
      return
    }
    setTableData(response.data);
    setCurrentUserState(state => ({
      ...state,
      directories: response.data,
    }));
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
    setItemId('new');
    setShowModal(true);
  };

  const onCloseEdit = () => {
    setShowModal(false);
    setItemId('new');
  };

  const onItemEdit = (id) => {
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
        <DirectoriesTable
          sortedBy={sortedBy}
          sortedDown={sortedDown}
          onSortClick={onSortClick}
          tableData={tableData}
          onItemEdit={onItemEdit}
          onItemDelete={onItemDelete}
          pageSearch={pageSearch}
          isLoading={isLoading}
          error={error}
        />
      </div>
      {showModal && (
        <DirectoriesEdit
          onClose={onCloseEdit}
          itemId={itemId}
          reloadTable={reloadTable}
        />
      )}
    </Layout>
  );
};

export default DirectoriesPage;
