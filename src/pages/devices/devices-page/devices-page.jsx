import React, {useState, useEffect, useContext} from 'react';

import './devices-page.scss';

import PageFilter from '../../../components/filter/page-filter/page-filter';
import Layout from '../../../components/layout/layout';
import useFetch from '../../../hooks/use-fetch';
import { useStore } from '../../../hooks-store/store';
import {CurrentUserContext} from "../../../contexts/current-user";
import DevicesAdd from "./devices-add/devices-add";
import DevicesTable from "./devices-table/devices-table";
import DeviceDetails from "../device-details/device-details";
import Spinner from "../../../components/spinner/spinner";

const DevicesPage = (props) => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [, dispatch] = useStore();
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [itemDetails, setItemDetails] = useState('');
  const [sensorTypes, setSensorTypes] = useState([]);
  const [filters, setFilters] = useState([]);
  const [pageSearch, setPageSearch] = useState('');
  const [filtersTypes, setFiltersTypes] = useState([]);
  const [filterListTypes, setFilterListTypes] = useState([]);
  const [sortedBy, setSortedBy] = useState('serialNumber');
  const [sortedDown, setSortedDown] = useState(true);
  const [{response, isLoading, error}, doFetchTableData] = useFetch('/devices/devices');
  // const [{response: itemDeleteResponse, isLoading: itemDeleteIsLoading, error: itemDeleteError}, doFetchItemDelete] = useFetch(`/devices/devices/${itemId}`);

  const headerData = {
    title: 'Список устройств',
    breadcrumbsList: [
      {
        name: currentUserState.currentSite ? currentUserState.currentSite.name : '',
        link: '/'
      },
      {
        name: 'Устройства',
        link: '/'
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
      placeholder: 'Поиск по названию',
      action: ''
    },
    defaultFiltersCount: 3,
    filtersList: [
      {
        name: 'Тип данных',
        category: 'dataType',
        list: filterListTypes
      },
    ],
    calendarShow: false,
  };

  useEffect(() => {
    setLoading(true);
    const newFiltersTypes = [];
    filters.forEach(item => {
      if (item.filterCategory === 'dataType') {
        newFiltersTypes.push(item.filter.value)
      }
    });
    setFiltersTypes(newFiltersTypes);
    doFetchTableData();
  }, [pageSearch, sortedBy, sortedDown, filters]);

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
    const newFilterListTypes = [];
    response.data.forEach(item => {
      item.attributes.sensor_types.forEach(it => {
        console.log('it', it);
        newFilterListTypes.push({ id: it.data_key_name, attributes: {name: it.name}});
      });
    });
    setFilterListTypes([...new Set(newFilterListTypes)]);
    setTableData(response.data);
    if (props.location.search !== '') {
      const query = new URLSearchParams(props.location.search);
      const id = response.data.find(it => it.attributes.serial_number === query.get('serial')).id;
      const types = response.data.find(it => it.id === id).attributes.sensor_types;
      onShowDetails(id, types, query.get('serial'));
    }
    setLoading(false);
  }, [response]);

  useEffect(() => {
    dispatch('SET_MODAL_OPENED', showAddModal);
  }, [showAddModal]);

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
    setShowAddModal(true);
  };

  const onAddClose = () => {
    setShowAddModal(false);
  };

  const onShowDetails = (id, types, serial) => {
    setShowDetailsModal(true);
    setItemDetails(id);
    setSensorTypes(types);
    props.history.push(`/devices?serial=${serial}`);
  };

  const onDetailsClose = () => {
    if (currentUserState.previousPage === '/?tab=devices') {
      setCurrentUserState(state => ({
        ...state,
        previousPage: null
      }));
      dispatch('SET_MODAL_OPENED', false);
      props.history.push(`/?tab=devices`);
    } else {
      setShowDetailsModal(false);
      setItemDetails('new');
      props.history.push(`/devices`);
      reloadTable();
    }
  };

  // const onItemDelete = (id) => {
  //   setItemId(id);
  //   doFetchItemDelete({
  //     method: 'DELETE'
  //   });
  // };

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
          <DevicesTable
            sortedBy={sortedBy}
            sortedDown={sortedDown}
            onSortClick={onSortClick}
            tableData={tableData}
            onItemDetails={onShowDetails}
            // onItemDelete={onItemDelete}
            pageSearch={pageSearch}
            isLoading={isLoading}
            error={false}
          />
        )}
      </div>
      {showAddModal && (
        <DevicesAdd
          onClose={onAddClose}
          reloadTable={reloadTable}
        />
      )}
      {showDetailsModal && (
        <DeviceDetails
          onClose={onDetailsClose}
          itemId={itemDetails}
          sensorTypes={sensorTypes}
        />
      )}
    </Layout>
  );
};

export default DevicesPage;
