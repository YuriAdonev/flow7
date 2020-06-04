import React, {useContext, useState, useEffect} from 'react';

import PageFilter from '../../../components/filter/page-filter/page-filter';
import Layout from '../../../components/layout/layout';
import {CurrentUserContext} from "../../../contexts/current-user";
import useFetch from "../../../hooks/use-fetch";
import StructureTable from "./structure-table/structure-table";
import StructureEdit from "./structure-edit/structure-edit";
import {useStore} from "../../../hooks-store/store";
import StaffTable from "../staff-page/staff-table/staff-table";

const StructurePage = () => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [, dispatch] = useStore();
  const [pageSearch, setPageSearch] = useState('');
  const [filters, setFilters] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemId, setItemId] = useState('new');
  const [parentId, setParentId] = useState(null);

  const [{response, isLoading, error}, doFetchTableData] = useFetch('/directories/divisions');
  const [{response: itemDeleteResponse, isLoading: itemDeleteIsLoading, error: itemDeleteError}, doFetchItemDelete] = useFetch(`/directories/divisions/${itemId}`);

  const headerData = {
    title: 'Структура организации',
    breadcrumbsList: [
      {
        name: currentUserState.currentSite ? currentUserState.currentSite.name : '',
        link: '/'
      },
      {
        name: 'Персонал',
        link: '/staff'
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
  }, [response]);

  useEffect(() => {
    dispatch('SET_MODAL_OPENED', showModal);
  }, [showModal]);

  const onAddClick = () => {
    setItemId('new');
    setShowModal(true);
  };

  const onAddChild = (id) => {
    setParentId(id);
    setItemId('new');
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
  };

  const reloadTable = () => {
    doFetchTableData();
  };

  return (
    <Layout
      headerData={headerData}
      isWide={true}
    >
      {/*<PageFilter*/}
      {/*  filters={filters}*/}
      {/*  pageFilters={pageFiltersData}*/}
      {/*  setFilters={setFilters}*/}
      {/*  pageSearch={pageSearch}*/}
      {/*  setPageSearch={setPageSearch}*/}
      {/*/>*/}
      <div className="content">
        <StructureTable
          tableData={tableData}
          onShowEdit={onShowEdit}
          onAddChild={onAddChild}
          onItemDelete={onItemDelete}
          pageSearch={pageSearch}
          isLoading={isLoading}
          error={error}
        />
      </div>
      {showModal && (
        <StructureEdit
          onClose={onCloseEdit}
          itemId={itemId}
          reloadTable={reloadTable}
          parentId={parentId}
          structureList={tableData}
        />
      )}
    </Layout>
  );
};

export default StructurePage;
