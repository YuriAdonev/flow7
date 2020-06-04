import React, {useState, useEffect, useContext} from 'react';

// import './devices-page.scss';

import PageFilter from '../../../components/filter/page-filter/page-filter';
import Layout from '../../../components/layout/layout';
import useFetch from '../../../hooks/use-fetch';
import { useStore } from '../../../hooks-store/store';
import {CurrentUserContext} from "../../../contexts/current-user";
import DevicesReportTable from "./devices-report-table/devices-report-table";

const DevicesReportPage = () => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [, dispatch] = useStore();
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState([]);
  const [itemId, setItemId] = useState('new');
  const [pageSearch, setPageSearch] = useState('');
  const [{response, isLoading, error}, doFetchTableData] = useFetch('/devices/devices');
  const [{response: itemDeleteResponse, isLoading: itemDeleteIsLoading, error: itemDeleteError}, doFetchItemDelete] = useFetch(`/devices/devices/${itemId}`);

  const headerData = {
    title: 'Отчет по устройствам',
    breadcrumbsList: [
      {
        name: currentUserState.currentSite ? currentUserState.currentSite.name : ' ',
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
    filtersList: [],
    calendarShow: false,
  };

  const mockTableData = [
    {
      id: 1,
      attributes: {
        serialNumber: '38202010',
        model: 'LABS RTP4',
        date: '12.02.2020',
        slots: '4',
        type: 'Температура, Ток, Положение, Доступ',
        online: false,
      }
    },
    {
      id: 2,
      attributes: {
        serialNumber: '20292002',
        model: 'LABS SPIDER',
        date: '12.02.2020',
        slots: '1',
        type: 'Ток, Напряжение, Проволка, Газ, RFID',
        online: true,
      }
    },
  ];

  useEffect(() => {
    doFetchTableData();
  }, [itemDeleteResponse]);

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
      <PageFilter
        filters={filters}
        pageFilters={pageFiltersData}
        setFilters={setFilters}
        pageSearch={pageSearch}
        setPageSearch={setPageSearch}
      />
      <div className="content">
        <DevicesReportTable />
        {/*<DevicesTable*/}
        {/*  tableData={mockTableData}*/}
        {/*  onItemEdit={onShowEdit}*/}
        {/*  onItemDelete={onItemDelete}*/}
        {/*  pageSearch={pageSearch}*/}
        {/*  isLoading={false}*/}
        {/*  // isLoading={isLoading}*/}
        {/*  error={false}*/}
        {/*  filterBy="model"*/}
        {/*/>*/}
      </div>
      {showModal && (''
        // <DevicesEdit
        //   onClose={onCloseEdit}
        //   itemId={itemId}
        //   reloadTable={reloadTable}
        // />
      )}
    </Layout>
  );
};

export default DevicesReportPage;
