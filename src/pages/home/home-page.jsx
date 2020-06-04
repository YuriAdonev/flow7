import React, { useState, useEffect, useContext, useRef } from 'react';

import './home-page.scss';

import Layout from '../../components/layout/layout';
import {CurrentUserContext} from "../../contexts/current-user";
import HomeEquipment from "./home-equipment/home-equipment";
import HomeDevices from "./home-devices/home-devices";

const HomePage = (props) => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [currentPageTab, setCurrentPageTab] = useState('equipment');

  const headerData = {
    title: 'Панель управления',
    breadcrumbsList: [
      {
        name: currentUserState.currentSite ? currentUserState.currentSite.name : '',
        link: '/'
      },
    ],
    noBottomLine: true
  };

  useEffect(() => {
    if (props.location.search !== '') {
      const query = new URLSearchParams(props.location.search);
      setCurrentPageTab(query.get('tab'));
    } else {
      props.history.push(`/?tab=equipment`);
      setCurrentPageTab('equipment');
    }
  }, [props.location.search, props.history, currentUserState.currentSite]);

  return (
    <Layout
      headerData={headerData}
      isWide={true}
    >
      <div className="home-triggers tabs-triggers">
        <div
          className={`home-triggers__item tabs-triggers__item${currentPageTab === 'equipment' ? ' active' : ''}`}
          onClick={() => {
            props.history.push(`/?tab=equipment`);
            setCurrentPageTab('equipment');
          }}
        >Оборудование</div>
        <div
          className={`home-triggers__item tabs-triggers__item${currentPageTab === 'devices' ? ' active' : ''}`}
          onClick={() => {
            props.history.push(`/?tab=devices`);
            setCurrentPageTab('devices');
          }}
        >Устройства</div>
      </div>
      <div className="home">
        {currentPageTab === 'equipment' && (
          <HomeEquipment
            history={props.history}
          />
        )}
        {currentPageTab === 'devices' && (
          <HomeDevices
            history={props.history}
          />
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
