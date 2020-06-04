import React, {useContext, useEffect, useState} from 'react';

import './positions-page.scss';

import Layout from '../../../components/layout/layout';
import PageFilter from '../../../components/filter/page-filter/page-filter';
import {CurrentUserContext} from "../../../contexts/current-user";
import Spinner from "../../../components/spinner/spinner";
import Table from "../../../components/table/table/table";
import useFetch from "../../../hooks/use-fetch";
import PositionsEdit from "./positions-edit/positions-edit";
import {useStore} from "../../../hooks-store/store";
import PositionsTable from "./positions-table/positions-table";
import StaffTable from "../staff-page/staff-table/staff-table";

const PositionsPage = () => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [, dispatch] = useStore();
  const [filters, setFilters] = useState([]);
  const [pageSearch, setPageSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [itemId, setItemId] = useState('new');
  const [showModal, setShowModal] = useState(false);
  const [sortedBy, setSortedBy] = useState('name');
  const [sortedDown, setSortedDown] = useState(true);

  const [{response, isLoading, error}, doFetchTableData] = useFetch('/directories/posts');
  const [{response: itemDeleteResponse, isLoading: itemDeleteIsLoading, error: itemDeleteError}, doFetchItemDelete] = useFetch(`/directories/posts/${itemId}`);

  const headerData = {
    title: 'Должности',
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
    if (!response) {
      return
    }
    setTableData(response.data);
    setLoading(false);
  }, [response]);

  useEffect(() => {
    if (itemDeleteIsLoading) {
      return;
    }
    reloadTable();
  }, [itemDeleteIsLoading]);

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
    setItemId('new');
  };

  const onItemEdit = (id) => {
    setShowModal(true);
    setItemId(id);
  };

  const onClose = () => {
    setShowModal(false);
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
        {loading ? <Spinner/> : (
          <PositionsTable
            sortedBy={sortedBy}
            sortedDown={sortedDown}
            onSortClick={onSortClick}
            tableData={tableData}
            onItemEdit={onItemEdit}
            onItemDelete={onItemDelete}
            pageSearch=""
            isLoading={false}
            error=""
          />
        )}
      </div>
      {showModal && (
        <PositionsEdit
          itemId={itemId}
          onClose={onClose}
          reloadTable={reloadTable}
        />
      )}
    </Layout>
  );
};

export default PositionsPage;
