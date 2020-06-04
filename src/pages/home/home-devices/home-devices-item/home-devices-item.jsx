import React, {Fragment, useEffect, useState} from 'react';

import HomeDevicesCard from "../home-devices-card/home-devices-card";
import useFetch from "../../../../hooks/use-fetch";

const HomeDeviceItem = ({ device, history }) => {
  const [currentDevice, setCurrentDevice] = useState('');
  const [slotsList, setSlotsList] = useState([]);

  const [{response, isLoading, error}, doFetchSlotsList] = useFetch(`/devices/devices/${device.id}`);

  useEffect(() => {
    doFetchSlotsList();
  }, []);

  useEffect(() => {
    if (!response) {
      return;
    }
    setCurrentDevice(response.data);
    setSlotsList(response.data.attributes.slots);
  }, [response]);

  const items = slotsList.map(item => {
    return (
      <HomeDevicesCard
        key={item.id}
        currentSlot={item}
        currentDevice={currentDevice}
        history={history}
      />
    )
  });

  return (
    <Fragment>
      {items}
    </Fragment>
  )
};

export default HomeDeviceItem;
