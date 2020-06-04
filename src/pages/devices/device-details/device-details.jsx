import React, {useState, useEffect, useRef, useContext} from 'react';

import './device-details.scss';

import Modal from '../../../components/modal/modal';
import useFetch from '../../../hooks/use-fetch';
import {CurrentUserContext} from "../../../contexts/current-user";
import DeviceDetailsHistory from "./device-details-history/device-details-history";
import DeviceDetailsData from "./device-details-data/device-details-data";
import DeviceDetailsSettings from "./device-details-settings/device-details-settings";
import Layout from "../../../components/layout/layout";

const DeviceDetails = ({ itemId, onClose, reloadTable, sensorTypes = [] }) => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [loading, setLoading] = useState(true);
  const [currentItem, setCurrentItem] = useState('');
  const [currentPageTab, setCurrentPageTab] = useState('history');

  const [{response, isLoading, error}, doFetchItem] = useFetch(`/devices/devices/${itemId}`);

  const [{response: itemSaveResponse, isLoading: itemSaveIsLoading, error: itemSaveError}, doFetchItemSave] = useFetch(`/devices/devices`);

  const nameInput = useRef(null);
  const serialNumberInput = useRef(null);

  const headerData = {
    title: currentItem === '' ? '' : `${currentItem.attributes.model.name} | ${currentItem.attributes.serial_number}`,
    breadcrumbsList: [
      {
        name: currentUserState.currentSite ? currentUserState.currentSite.name : '',
        link: '/'
      },
      {
        name: 'Устройства',
        link: '/devices'
      },
    ],
    noBottomLine: true
  };

  useEffect(() => {
    doFetchItem();
  }, []);

  useEffect(() => {
    if (!response) {
      return;
    }
    setCurrentItem(response.data);
    setLoading(false);
  }, [response]);

  return loading ? '' : (
    <Modal
      headerData={headerData}
      onClose={onClose}
      isWide={true}
    >
      <div className="device-details-triggers tabs-triggers">
        <div
          className={`device-details-triggers__item tabs-triggers__item${currentPageTab === 'history' ? ' active' : ''}`}
          onClick={() => setCurrentPageTab('history')}
        >История работ</div>
        <div
          className={`device-details-triggers__item tabs-triggers__item${currentPageTab === 'data' ? ' active' : ''}`}
          onClick={() => setCurrentPageTab('data')}
        >Данные устройства</div>
        <div
          className={`device-details-triggers__item tabs-triggers__item tabs-triggers__item--right${currentPageTab === 'settings' ? ' active' : ''}`}
          onClick={() => setCurrentPageTab('settings')}
        >Настройки</div>
      </div>
      {currentPageTab === 'history' && (
        <DeviceDetailsHistory
          currentItem={currentItem}
          sensorTypes={sensorTypes}
        />
      )}
      {currentPageTab === 'data' && (
        <DeviceDetailsData
          currentItem={currentItem}
        />
      )}
      {currentPageTab === 'settings' && (
        <DeviceDetailsSettings
          currentItem={currentItem}
          sensorTypes={sensorTypes}
        />
      )}
    </Modal>
  );
};

export default DeviceDetails;
