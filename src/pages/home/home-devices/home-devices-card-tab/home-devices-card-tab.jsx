import React, { useState, useEffect } from 'react';

import './home-devices-card-tab.scss';
import {convertTime} from "../../../../utils";
import DeviceChartI from "../../../../components/device-charts/device-chart-i/device-chart-i";
import DeviceChartU from "../../../../components/device-charts/device-chart-u/device-chart-u";
import DeviceChartT from "../../../../components/device-charts/device-chart-t/device-chart-t";
import DeviceChartAng from "../../../../components/device-charts/device-chart-ang/device-chart-ang";
import DeviceChartTAir from "../../../../components/device-charts/device-chart-t-air/device-chart-t-air";
import DeviceChartRfidHold from "../../../../components/device-charts/device-chart-rfid-hold/device-chart-rfid-hold";
import DeviceChartRfid from "../../../../components/device-charts/device-chart-rfid/device-chart-rfid";
import DeviceChartGas from "../../../../components/device-charts/device-chart-gas/device-chart-gas";
import DeviceChartWire from "../../../../components/device-charts/device-chart-wire/device-chart-wire";
import useFetch from "../../../../hooks/use-fetch";

const HomeDevicesCardTab = ({ currentSensor }) => {
  // const timeZone = 14400000;
  const timeZone = 0;

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [startWorkTime, setStartWorkTime] = useState('');
  const [workTime, setWorkTime] = useState('');

  const [{response, isLoading, error}, doFetchChartData] = useFetch(`/devices/sensors/${currentSensor.id}/received_data?from=${start}.000+03:00&to=${end}.999+03:00`);
  const [{response: workTimeResponse}, doFetchWorkTime] = useFetch(`/devices/sensors/${currentSensor.id}/received_data?from=${startWorkTime}.000+03:00&to=${end}.999+03:00`);

  const setFetchTimes = () => {
    const currentTime = new Date().getTime();
    const beginTime = new Date(currentTime - 10800000);
    setEnd(`${new Date(currentTime).getFullYear()}-${new Date(currentTime).getMonth() + 1}-${new Date(currentTime).getDate()}T${new Date(currentTime).getHours()}:${new Date(currentTime).getMinutes()}:${new Date(currentTime).getSeconds()}`);
    setStart(`${new Date(beginTime).getFullYear()}-${new Date(beginTime).getMonth() + 1}-${new Date(beginTime).getDate()}T${new Date(beginTime).getHours()}:${new Date(beginTime).getMinutes()}:${new Date(beginTime).getSeconds()}`);
    setStartWorkTime(`${new Date(currentTime).getFullYear()}-${new Date(currentTime).getMonth() + 1}-${new Date(currentTime).getDate()}T00:00:00`);
  };

  useEffect(() => {
    setFetchTimes();
  }, []);

  useEffect(() => {
    if (start === '' || end === '' || startWorkTime === '') {
      return;
    }
    doFetchChartData();
    doFetchWorkTime();
  }, [start, end, startWorkTime]);

  useEffect(() => {
    setFetchTimes();
    setLoading(true);
  }, [currentSensor]);

  useEffect(() => {
    if (!response) {
      return;
    }
    // console.log('response --->', response);
    // const itemData = [];
    // response.data.attributes.data.forEach(it => {
    //   if (it.v !== undefined) {
    //     itemData.push({
    //       x: new Date(it.at),
    //       y: it.v
    //     })
    //   }
    // });
    setChartData(response.data);
    setLoading(false);
  }, [response]);

  useEffect(() => {
    if (!workTimeResponse) {
      return;
    }
    console.log('workTimeResponse', workTimeResponse);
    setWorkTime(convertTime(workTimeResponse.data.attributes.general.work_time));
  }, [workTimeResponse]);

  const getItemContent = () => {
    switch (currentSensor.sensor_type.data_key_name) {
      case 'i':
        console.log('chartData в getItemContent i', chartData);
        return (
          <DeviceChartI
            loading={loading}
            responseData={chartData}
            baseOptions={baseOptions}
            timeZone={timeZone}
          />
        );
      case 'u':
        return (
          <DeviceChartU
            loading={loading}
            responseData={chartData}
            baseOptions={baseOptions}
            timeZone={timeZone}
          />
        );
      case 't':
        return (
          <DeviceChartT
            loading={loading}
            responseData={chartData}
            baseOptions={baseOptions}
            timeZone={timeZone}
          />
        );
      case 'ang':
        return (
          <DeviceChartAng
            loading={loading}
            responseData={chartData}
            baseOptions={baseOptions}
            timeZone={timeZone}
          />
        );
      case 't_air':
        return (
          <DeviceChartTAir
            loading={loading}
            responseData={chartData}
            baseOptions={baseOptions}
            timeZone={timeZone}
          />
        );
      case 'rfid_hold':
        return (
          <DeviceChartRfidHold
            loading={loading}
            responseData={chartData}
            baseOptions={baseOptions}
            timeZone={timeZone}
          />
        );
      case 'rfid':
        return (
          <DeviceChartRfid
            loading={loading}
            responseData={chartData}
            baseOptions={baseOptions}
            timeZone={timeZone}
          />
        );
      case 'gas':
        return (
          <DeviceChartGas
            loading={loading}
            responseData={chartData}
            baseOptions={baseOptions}
            timeZone={timeZone}
          />
        );
      case 'wire':
        return (
          <DeviceChartWire
            loading={loading}
            responseData={chartData}
            baseOptions={baseOptions}
            timeZone={timeZone}
          />
        );
      default:
        return '';
    }
  };

  const baseOptions = {
    animationEnabled: false,
    zoomEnabled: false,
    height: 120,
    axisX:{
      lineColor: '#E7ECF8',
      intervalType: 'hour',
      valueFormatString: 'HH:mm',
      tickLength: 10,
      tickColor: 'transparent',
      labelFontFamily: 'IBMPlexSansMedium',
      labelFontColor: '#596890',
      labelFontSize: 10
    },
    axisY: {
      includeZero: true,
      lineColor: 'transparent',
      gridDashType: 'dash',
      gridColor: '#E7ECF8',
      tickLength: 8,
      tickColor: 'transparent',
      labelFontFamily: 'IBMPlexSansMedium',
      labelFontColor: '#596890',
      labelFontSize: 10,
    },
  };

  return (
    <div className={`home-devices-card-tab`}>
      <div className="home-devices-card-tab__chart">
        {chartData === [] ? '' : getItemContent()}
      </div>
      <div className="home-devices-card-tab-info">
        <div className="home-devices-card-tab-info__item">
          <div className="home-devices-card-tab-info__value">{workTime}</div>
          <div className="home-devices-card-tab-info__desc">Время работы с 00:00</div>
        </div>
        <div className="home-devices-card-tab-info__item">
          <div className="home-devices-card-tab-info__value">{currentSensor.online ? 'Активное' : 'Выключено'}</div>
          <div className="home-devices-card-tab-info__desc">Текущее состояние</div>
        </div>
      </div>
    </div>
  )
};

export default HomeDevicesCardTab;
