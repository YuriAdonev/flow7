import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './devices-panel-page.scss';

import Layout from "../../../components/layout/layout";
import {CurrentUserContext} from "../../../contexts/current-user";
import DevicesPanelCard from "./devices-panel-card/devices-panel-card";

const DevicesPanelPage = () => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);

  const headerData = {
    title: 'Панель устройств',
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

  const onAddClick = () => {

  };

  return (
    <Layout
      headerData={headerData}
      isWide={true}
    >
      <div className="content">
        <div className="devices-panel">
          <div className="devices-panel__wrap">
            <DevicesPanelCard/>
            <DevicesPanelCard/>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DevicesPanelPage;
