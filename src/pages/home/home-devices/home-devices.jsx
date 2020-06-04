import React, { useState, useEffect, useContext } from 'react';

import './home-devices.scss';
import Spinner from "../../../components/spinner/spinner";
import DeviceCalendar from "../../../components/device-calendar/device-calendar";
import useFetch from "../../../hooks/use-fetch";
import HomeDeviceItem from "./home-devices-item/home-devices-item";
import {CurrentUserContext} from "../../../contexts/current-user";

const ITEMS_PER_PAGE = 12;

const HomeDevices = ({ history }) => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);

  const [deviceList, setDeviceList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [{response, isLoading, error}, doFetchDeviceList] = useFetch('/devices/devices');

  useEffect(() => {
    if (currentUserState.currentSite === null) {
      return;
    }
    if (currentUserState.currentSite.subdomain === '') {
      return;
    }
    doFetchDeviceList();
  }, [currentUserState.currentSite]);

  useEffect(() => {
    if (!response) {
      return;
    }
    setDeviceList(response.data);
    setLoading(false);
  }, [response]);

  const items = deviceList.map((item, index) => {
    return (
      <HomeDeviceItem
        key={index}
        device={item}
        history={history}
      />
    )
  });

  return (
    <div className="home-devices">
      <div className="home-devices__calendar">
        <DeviceCalendar/>
      </div>
      <div className="home-devices__wrap">
        {loading ? <Spinner/> : items}
      </div>

    </div>
  )
};

export default HomeDevices;
