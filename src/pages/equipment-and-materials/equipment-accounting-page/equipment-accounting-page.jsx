import React, {useContext, useState, useRef, useEffect} from 'react';

import './equipment-accounting-page.scss';

import PageFilter from '../../../components/filter/page-filter/page-filter';
import Layout from '../../../components/layout/layout';
import {CurrentUserContext} from "../../../contexts/current-user";
import Spinner from "../../../components/spinner/spinner";
import Table from "../../../components/table/table/table";
import useFetch from "../../../hooks/use-fetch";
import { useStore } from "../../../hooks-store/store";
import EquipmentAccountingEdit from "./equipment-accounting-edit/equipment-accounting-edit";
import Pagination from "../../../components/pagination/pagination";
import EquipmentAccountingTable from "./equipment-accounting-table/equipment-accounting-table";

const ITEMS_PER_PAGE = 100;

const EquipmentAccountingPage = (props) => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [, dispatch] = useStore();
  const [pageSearch, setPageSearch] = useState('');
  const [filters, setFilters] = useState([]);
  const [filtersProducers, setFiltersProducers] = useState([]);
  const [filtersTypes, setFiltersTypes] = useState([]);
  const [filtersDivisions, setFiltersDivisions] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [searchedTableData, setSearchedTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [itemId, setItemId] = useState('new');
  const [producersList, setProducersList] = useState([]);
  const [modelsList, setModelsList] = useState('');
  const [parentDate, setParentDate] = useState(null);
  const [devicesList, setDevicesList] = useState([]);
  const [filterListProducers, setFilterListProducers] = useState([]);
  const [filterListTypes, setFilterListTypes] = useState([]);
  const [filterListDivisions, setFilterListDivisions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedTableData, setPaginatedTableData] = useState([]);
  const [producerCol, setProducerCol] = useState('producer');
  const [dateCol, setDateCol] = useState('status');
  const [sortedBy, setSortedBy] = useState('inventory_number');
  const [sortedDown, setSortedDown] = useState(true);

  const [{response: producersResponse, isLoading: producersIsLoading, error: producersError}, doFetchProducers] = useFetch('/directories/producers');
  const [{response: divisionsResponse, isLoading: divisionsIsLoading, error: divisionsError}, doFetchDivisions] = useFetch('/directories/divisions');
  const [{response: equipmentTypesResponse, isLoading: equipmentTypesIsLoading, error: equipmentTypesError}, doFetchEquipmentTypes] = useFetch('/directories/equipment_types');
  const [{response: devicesResponse, isLoading: devicesIsLoading, error: devicesError}, doFetchDevices] = useFetch(`/devices/devices`);
  const [{response: modelsResponse, isLoading: modelsIsLoading, error: modelsError}, doFetchModels] = useFetch(`/directories/equipment_models`);
  const [{response: deleteResponse, isLoading: deleteIsLoading, error: deleteError}, doFetchItemDelete] = useFetch(`/directories/equipment_items/${itemId}`);

  // const [{response, isLoading, error}, doFetchTableData] = useFetch(`/directories/equipment_items?producer_ids[]=1&equipment_type_ids[]=1&division_ids[]=1&device_ids[]=1&statuses[]=works&page=1&per=20&sort=${sortedBy}&direction=asc`);
  const [{response, isLoading, error}, doFetchTableData] = useFetch(`/directories/equipment_items?${filtersProducers.map(it => 'producer_ids[]=' + it + '&')}${filtersTypes.map(it => 'equipment_type_ids[]=' + it + '&')}${filtersDivisions.map(it => 'division_ids[]=' + it + '&')}${pageSearch === '' ? '' : 'search=' + pageSearch + '&'}page=1&per=50&sort=${sortedBy}&direction=${sortedDown ? 'asc' : 'desc'}`);

  const headerData = {
    title: 'Оборудование',
    breadcrumbsList: [
      {
        name: currentUserState.currentSite ? currentUserState.currentSite.name : '',
        link: '/'
      },
      {
        name: 'Оборудование и материалы',
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

  const producerFilterList = [
    {}
  ];

  const dateFilterList = [
    {}
  ];

  const pageFiltersData = {
    search: {
      placeholder: 'Поиск по названию',
      action: ''
    },
    defaultFiltersCount: 3,
    filtersList: [
      {
        name: 'Производитель',
        category: 'producer',
        list: filterListProducers
      },
      {
        name: 'Тип оборудования',
        category: 'equipmentType',
        list: filterListTypes
      },
      {
        name: 'Подразделение',
        category: 'division',
        list: filterListDivisions
      },
    ],
    calendarShow: false,
  };

  useEffect(() => {
    // applyFilters();
    setCurrentPage(0)
  }, [filters, tableData]);

  useEffect(() => {
    setLoading(true);
    const newFiltersProducers = [];
    const newFiltersTypes = [];
    const newFiltersDivisions = [];
    filters.forEach(item => {
      if (item.filterCategory === 'producer') {
        newFiltersProducers.push(item.filter.value)
      }
      if (item.filterCategory === 'equipmentType') {
        newFiltersTypes.push(item.filter.value)
      }
      if (item.filterCategory === 'division') {
        newFiltersDivisions.push(item.filter.value)
      }
    });
    setFiltersProducers(newFiltersProducers);
    setFiltersTypes(newFiltersTypes);
    setFiltersDivisions(newFiltersDivisions);
    doFetchTableData();
  }, [pageSearch, sortedBy, sortedDown, filters]);

  useEffect(() => {
    doFetchProducers();
    doFetchDivisions();
    doFetchEquipmentTypes();
    doFetchModels();
    doFetchDevices();
    if (props.location.search !== '') {
      const query = new URLSearchParams(props.location.search);
      onItemEdit(query.get('equipment_id'));
    }
    return () => {
      dispatch('SET_MODAL_OPENED', false);
    }
  }, []);

  useEffect(() => {
    if (!producersResponse || !modelsResponse || !devicesResponse || !divisionsResponse || !equipmentTypesResponse) {
      return;
    }
    const newProducersList = [];
    producersResponse.data.forEach(item => {
      newProducersList.push({
        label: item.attributes.name,
        value: item.id
      })
    });
    // setProducersOptions(newProducersList);
    setProducersList(newProducersList);
    setModelsList(modelsResponse.data);
    setDevicesList(devicesResponse.data);
    setFilterListProducers(producersResponse.data);
    setFilterListTypes(equipmentTypesResponse.data);
    setFilterListDivisions(divisionsResponse.data);
    // doFetchTableData();
  }, [producersResponse, modelsResponse, devicesResponse, divisionsResponse, equipmentTypesResponse]);

  useEffect(() => {
    if (!response) {
      return;
    }
    setTableData(response.data);
    setLoading(false);
    // applyFilters();
    // applyPageSearch();
  }, [response]);

  useEffect(() => {
    if (deleteIsLoading) {
      return;
    }
    reloadTable();
  }, [deleteIsLoading]);

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

  const onAddClick = () => {
    setItemId('new');
    setShowModal(true);
  };

  const onClose = () => {
    if (currentUserState.previousPage === '/') {
      setCurrentUserState(state => ({
        ...state,
        previousPage: null
      }));
      dispatch('SET_MODAL_OPENED', false);
      props.history.push(`/`);
    } else {
      setShowModal(false);
      setItemId('new');
      props.history.push(`/equipment-and-materials`);
      reloadTable();
    }
  };

  const onItemDelete = (id) => {
    setItemId(id);
    doFetchItemDelete({
      method: 'DELETE'
    });
  };

  const onItemEdit = (id) => {
    setItemId(id);
    setShowModal(true);
    // setParentDate(new Date(localStorage.getItem('lsDate')));
    props.history.push(`/equipment-and-materials?equipment_id=${id}`);
  };

  const reloadTable = () => {
    doFetchTableData();
  };

  console.log('producersList --->', producersList);

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
        <div className="equipment-accounting">
          {loading ? <Spinner/> : (
            <>
              <Pagination
                countPages={Math.ceil(searchedTableData.length / ITEMS_PER_PAGE)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                amountItems={searchedTableData.length}
              />
              <EquipmentAccountingTable
                sortedBy={sortedBy}
                sortedDown={sortedDown}
                onSortClick={onSortClick}
                producerCol={producerCol}
                setProducerCol={setProducerCol}
                dateCol={dateCol}
                setDateCol={setDateCol}
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
        <EquipmentAccountingEdit
          onClose={onClose}
          itemId={itemId}
          reloadTable={reloadTable}
          producersList={producersList}
          devicesList={devicesList}
          equipmentList={tableData}
          location={props.location}
          parentDate={parentDate}
        />
      )}
    </Layout>
  );
};

export default EquipmentAccountingPage;
