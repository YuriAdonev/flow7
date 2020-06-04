import React, {useContext, useState, useRef, useEffect} from 'react';

import './staff-page.scss';

import PageFilter from '../../../components/filter/page-filter/page-filter';
import Layout from '../../../components/layout/layout';
import {CurrentUserContext} from "../../../contexts/current-user";
import Spinner from "../../../components/spinner/spinner";
import Table from "../../../components/table/table/table";
import useFetch from "../../../hooks/use-fetch";
import {useStore} from "../../../hooks-store/store";
import StaffEdit from "./staff-edit/staff-edit";
import Pagination from "../../../components/pagination/pagination";
import StaffTable from "./staff-table/staff-table";
import DeviceDetailsSettingsTable
  from "../../devices/device-details/device-details-settings/device-details-settings-table/device-details-settings-table";

const ITEMS_PER_PAGE = 100;

const StaffPage = () => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [, dispatch] = useStore();
  const [pageSearch, setPageSearch] = useState('');
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [itemId, setItemId] = useState('new');
  const [tableData, setTableData] = useState([]);
  const [filtersPositions, setFiltersPositions] = useState([]);
  const [filtersDivisions, setFiltersDivisions] = useState([]);
  const [filterListPositions, setFilterListPositions] = useState([]);
  const [filterListDivisions, setFilterListDivisions] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [searchedTableData, setSearchedTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedTableData, setPaginatedTableData] = useState([]);
  const [sortedBy, setSortedBy] = useState('last_name');
  const [sortedDown, setSortedDown] = useState(true);

  const [{response: divisionsResponse, isLoading: divisionsIsLoading, error: divisionsError}, doFetchDivisions] = useFetch('/directories/divisions');
  const [{response: positionsResponse, isLoading: positionsIsLoading, error: positionsError}, doFetchPositions] = useFetch('/directories/posts');

  const [{response, isLoading, error}, doFetchTableData] = useFetch(`/directories/personnels?${filtersPositions.map(it => 'posts_ids[]=' + it + '&')}${filtersDivisions.map(it => 'division_ids[]=' + it + '&')}${pageSearch === '' ? '' : 'search=' + pageSearch + '&'}page=1&per=1000&sort=${sortedBy}&direction=${sortedDown ? 'asc' : 'desc'}`);

  const headerData = {
    title: 'Сотрудники',
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
        text: 'Добавить',
        action: () => onAddClick()
      }
    ],
  };

  const pageFiltersData = {
    search: {
      placeholder: 'Поиск по фамилии или номеру',
      action: ''
    },
    defaultFiltersCount: 3,
    filtersList: [
      {
        name: 'Должность',
        category: 'position',
        list: filtersPositions
      },
      {
        name: 'Подразделение',
        category: 'division',
        list: filtersDivisions
      },
    ],
    calendarShow: false,
  };

  useEffect(() => {
    setCurrentPage(0)
  }, [filters, tableData]);

  useEffect(() => {
    setLoading(true);
    const newFiltersPositions = [];
    const newFiltersDivisions = [];
    filters.forEach(item => {
      if (item.filterCategory === 'position') {
        newFiltersPositions.push(item.filter.value)
      }
      if (item.filterCategory === 'division') {
        newFiltersDivisions.push(item.filter.value)
      }
    });
    setFiltersPositions(newFiltersPositions);
    setFiltersDivisions(newFiltersDivisions);
    doFetchTableData();
  }, [pageSearch, sortedBy, sortedDown, filters]);

  useEffect(() => {
    doFetchDivisions();
    doFetchPositions();
    doFetchTableData();
    return () => {
      dispatch('SET_MODAL_OPENED', false);
    }
  }, []);

  useEffect(() => {
    if (!response || !divisionsResponse || !positionsResponse) {
      return;
    }
    setFilterListPositions(positionsResponse.data);
    setFilterListDivisions(divisionsResponse.data);
    setTableData(response.data);
    setLoading(false);
  }, [response, divisionsResponse, positionsResponse]);

  useEffect(() => {
    dispatch('SET_MODAL_OPENED', showModal);
  }, [showModal]);

  useEffect(() => {
    if (searchedTableData.length <= ITEMS_PER_PAGE) {
      setPaginatedTableData(searchedTableData);
      return;
    }
    const offset = currentPage === 0 ? 0 : currentPage * ITEMS_PER_PAGE;
    const fullTableData = searchedTableData.slice();
    if (currentPage === Math.ceil(searchedTableData.length / ITEMS_PER_PAGE) - 1) {
      setPaginatedTableData(fullTableData.slice(offset));
    } else {
      setPaginatedTableData(fullTableData.slice(offset, offset + ITEMS_PER_PAGE));
    }
  }, [searchedTableData, currentPage]);

  const onSortClick = (name) => {
    if (name === sortedBy) {
      setSortedDown(!sortedDown);
    }
    if (name !== sortedBy) {
      setSortedBy(name);
      setSortedDown(true);
    }
  };

  const onAddClick = (evt) => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
    setItemId('new');
  };

  const onItemDelete = () => {

  };

  const onItemEdit = (id) => {
    setItemId(id);
    setShowModal(true);
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
        <div className="staff">
          {loading ? <Spinner/> : (
            <>
              <Pagination
                countPages={Math.ceil(searchedTableData.length / ITEMS_PER_PAGE)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                amountItems={searchedTableData.length}
              />
              <StaffTable
                sortedBy={sortedBy}
                sortedDown={sortedDown}
                onSortClick={onSortClick}
                tableData={tableData}
                onItemEdit={onItemEdit}
                onItemDelete={onItemDelete}
                isLoading={isLoading}
                error={error}
              />
              <Pagination
                countPages={Math.ceil(searchedTableData.length / ITEMS_PER_PAGE)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                amountItems={searchedTableData.length}
              />
            </>
          )}
        </div>
      </div>
      {showModal && (
        <StaffEdit
          onClose={onClose}
          itemId={itemId}
          reloadTable={reloadTable}
        />
      )}
    </Layout>
  );
};

export default StaffPage;
