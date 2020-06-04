import React, {useState, useEffect, Fragment} from 'react';

import './device-details-history-item.scss';

import useFetch from "../../../../../hooks/use-fetch";
import {convertTime} from "../../../../../utils";
import DeviceChartI from "../../../../../components/device-charts/device-chart-i/device-chart-i";
import DeviceChartU from "../../../../../components/device-charts/device-chart-u/device-chart-u";
import DeviceChartT from "../../../../../components/device-charts/device-chart-t/device-chart-t";
import DeviceChartAng from "../../../../../components/device-charts/device-chart-ang/device-chart-ang";
import DeviceChartTAir from "../../../../../components/device-charts/device-chart-t-air/device-chart-t-air";
import DeviceChartRfidHold from "../../../../../components/device-charts/device-chart-rfid-hold/device-chart-rfid-hold";
import DeviceChartRfid from "../../../../../components/device-charts/device-chart-rfid/device-chart-rfid";
import DeviceChartGas from "../../../../../components/device-charts/device-chart-gas/device-chart-gas";
import DeviceChartWire from "../../../../../components/device-charts/device-chart-wire/device-chart-wire";

// const timeZone = 14400000;
const timeZone = 0;
const DeviceDetailsHistoryItem = ({ currentItem, currentSensor, slotsCount, filteredDate, isOnline }) => {
  const [autoReload, setAutoReload] = useState(true);
  const [defaultPeriod, setDefaultPeriod] = useState(true);
  const [zoomed, setZoomed] = useState(false);
  const [responseData, setResponseData] = useState({});
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState((new Date().getTime() / (1000 * 60 * 60 * 24)) * (1000 * 60 * 60 * 24));
  const [startDateString, setStartDateString] = useState('');
  const [startTime, setStartTime] = useState('00:00:00');
  const [endDate, setEndDate] = useState(new Date().getTime());
  const [endDateString, setEndDateString] = useState('');
  // const [endTime, setEndTime] = useState(`${new Date().getHours() - 4}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
  const [endTime, setEndTime] = useState(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
  const [currentIntervalType, setCurrentIntervalType] = useState('hours');

  const [{response, isLoading, error}, doFetchData] = useFetch(`/devices/sensors/${currentSensor.id}/received_data?from=${startDateString}&to=${endDateString}`);

  useEffect(() => {
    // if (defaultPeriod) {
      setStartDateString(`${new Date(filteredDate[0]).getFullYear()}-${new Date(filteredDate[0]).getMonth() + 1}-${new Date(filteredDate[0]).getDate()}T${startTime}.000+03:00`);
      if (filteredDate.length > 1) {
        setEndDateString(`${new Date(filteredDate[1]).getFullYear()}-${new Date(filteredDate[1]).getMonth() + 1}-${new Date(filteredDate[1]).getDate()}T${endTime}.999+03:00`);
        // setCurrentIntervalType(calculateIntervalType(new Date(startDate).getTime(), new Date(endDate).getTime()));
      } else {
        // setCurrentIntervalType(calculateIntervalType(Math.floor((new Date().getTime() / (1000 * 60 * 60 * 24))) * (1000 * 60 * 60 * 24), new Date().getTime()));
        setEndDateString(`${new Date(filteredDate[0]).getFullYear()}-${new Date(filteredDate[0]).getMonth() + 1}-${new Date(filteredDate[0]).getDate()}T${endTime}.999+03:00`);
      }
      setLoading(true);
      doFetchData();
    // }
    if (filteredDate.length > 1) {
      setCurrentIntervalType(calculateIntervalType(new Date(filteredDate[0]).getTime(), new Date(filteredDate[1]).getTime()));
    } else {
      setCurrentIntervalType(calculateIntervalType(Math.floor((new Date().getTime() / (1000 * 60 * 60 * 24))) * (1000 * 60 * 60 * 24), new Date().getTime()));
    }
  }, [filteredDate, endTime]);

  useEffect(() => {
    setLoading(true);
    doFetchData();
  }, [currentSensor]);

  useEffect(() => {
    if (!response) {
      return;
    }
    setResponseData(response.data);
    setLoading(false);
    // if (filteredDate.length > 1) {
    //   setCurrentIntervalType(calculateIntervalType(new Date(startDate).getTime(), new Date(endDate).getTime()));
    // } else {
    //   setCurrentIntervalType(calculateIntervalType(Math.floor((new Date().getTime() / (1000 * 60 * 60 * 24))) * (1000 * 60 * 60 * 24), new Date().getTime()));
    // }
    if (isOnline) {
      if (zoomed) {
        return;
      }
      setTimeout(() => {
        if (filteredDate.length === 1) {
          const currentTime = new Date().getTime();
          setEndTime(`${new Date(currentTime - timeZone).getHours()}:${new Date(currentTime - timeZone).getMinutes()}:${new Date(currentTime - timeZone).getSeconds()}`);
        }}, 60000);
    }
  }, [response]);

  const calculateIntervalType = (min, max) => {
    const interval = Math.floor(max / 1000) - Math.floor(min / 1000);
    console.log('interval', interval)
    if (interval <= 1500) {
      return 'minutes';
    }
    if (interval > 1500 && interval <= 172800) {
      return 'hours';
    }
    if (interval > 172800 && interval <= 15552000) {
      return 'days';
    }
    if (interval > 15552000) {
      return 'month';
    }
  };

  console.log('currentIntervalType', currentIntervalType);
  console.log('currentIntervalType ---', currentIntervalType === 'minutes' ? 'HH:mm:ss' : currentIntervalType === 'hours' ? 'HH:mm' : 'MM/yyyy');

  const rangeChanged = (attr) => {
    if (attr.trigger === 'reset') {
      const currentTime = new Date().getTime();
      const newStartTime = `00:00:00`;
      const newEndTime = `${new Date(currentTime - timeZone).getHours()}:${new Date(currentTime - timeZone).getMinutes()}:${new Date(currentTime - timeZone).getSeconds()}`;
      setStartTime(newStartTime);
      setEndTime(endTime);
      setStartDate(new Date(filteredDate[0]));
      setStartDateString(`${new Date(filteredDate[0]).getFullYear()}-${new Date(filteredDate[0]).getMonth() + 1}-${new Date(filteredDate[0]).getDate()}T${newStartTime}.000+03:00`);
      if (filteredDate.length > 1) {
        setEndDate(new Date(filteredDate[1]));
        setEndDateString(`${new Date(filteredDate[1]).getFullYear()}-${new Date(filteredDate[1]).getMonth() + 1}-${new Date(filteredDate[1]).getDate()}T23:59:59.999+03:00`);
      } else {
        setEndDate(new Date(filteredDate[0]));
        setEndDateString(`${new Date(filteredDate[0]).getFullYear()}-${new Date(filteredDate[0]).getMonth() + 1}-${new Date(filteredDate[0]).getDate()}T${newEndTime}.999+03:00`);
      }
      setZoomed(false);
    } else {
      setDefaultPeriod(false);
      // const min = attr.axisX[0].viewportMinimum - timeZone;
      // const max = attr.axisX[0].viewportMaximum - timeZone;
      const min = attr.axisX[0].viewportMinimum;
      const max = attr.axisX[0].viewportMaximum;

      const newStartTime = `${new Date(min).getHours()}:${new Date(min).getMinutes()}:${new Date(min).getSeconds()}`;
      const newEndTime = `${new Date(max).getHours()}:${new Date(max).getMinutes()}:${new Date(max).getSeconds()}`;

      setStartTime(newStartTime);
      setEndTime(endTime);

      setStartDateString(`${new Date(min).getFullYear()}-${new Date(min).getMonth() + 1}-${new Date(min).getDate()}T${newStartTime}.000+03:00`);
      setEndDateString(`${new Date(max).getFullYear()}-${new Date(max).getMonth() + 1}-${new Date(max).getDate()}T${newEndTime}.999+03:00`);
      setZoomed(true);
    }
    doFetchData();
  };

  const getItemContent = () => {
    switch (currentSensor.sensor_type.data_key_name) {
      case 'i':
        return (
          <Fragment>
            {responseData.attributes ? (
              <div className="device-details-history-item-info">
                <div className="device-details-history-item-info__item">
                  <div className="device-details-history-item-info__value">{convertTime(responseData.attributes.general.work_time)}</div>
                  <div className="device-details-history-item-info__desc">Время работы</div>
                </div>
                <div className="device-details-history-item-info__item">
                  <div className="device-details-history-item-info__value">{convertTime(responseData.attributes.general.idle_time)}</div>
                  <div className="device-details-history-item-info__desc">Время простоя</div>
                </div>
              </div>
            ) : ''}
            <DeviceChartI
              loading={loading}
              responseData={responseData}
              baseOptions={baseOptions}
              timeZone={timeZone}
            />
          </Fragment>
        );
      case 'u':
        return (
          <DeviceChartU
            loading={loading}
            responseData={responseData}
            baseOptions={baseOptions}
            timeZone={timeZone}
          />
        );
      case 't':
        return (
          <Fragment>
            {responseData.attributes ? (
              <div className="device-details-history-item-info">
                {responseData.attributes.general.max !== null && (
                  <div className="device-details-history-item-info__item">
                    <div className="device-details-history-item-info__value device-details-history-item-info__value--red">{responseData.attributes.general.max.toString()}</div>
                    <div className="device-details-history-item-info__desc">Максимальное значение</div>
                  </div>
                )}
                {responseData.attributes.general.min !== null && (
                  <div className="device-details-history-item-info__item">
                    <div className="device-details-history-item-info__value device-details-history-item-info__value--blue">{responseData.attributes.general.min.toString()}</div>
                    <div className="device-details-history-item-info__desc">Минимальное значение</div>
                  </div>
                )}
                {responseData.attributes.general.avg !== null && (
                  <div className="device-details-history-item-info__item">
                    <div className="device-details-history-item-info__value">{Math.round(responseData.attributes.general.avg).toString()}</div>
                    <div className="device-details-history-item-info__desc">Среднее значение</div>
                  </div>
                )}
              </div>
            ) : ''}
            <DeviceChartT
              loading={loading}
              responseData={responseData}
              baseOptions={baseOptions}
              timeZone={timeZone}
            />
          </Fragment>
        );
      case 'ang':
        return (
          <DeviceChartAng
            loading={loading}
            responseData={responseData}
            baseOptions={baseOptions}
            timeZone={timeZone}
          />
        );
      case 't_air':
        return (
          <Fragment>
            {responseData.attributes ? (
              <div className="device-details-history-item-info">
                {responseData.attributes.general.max !== null && (
                  <div className="device-details-history-item-info__item">
                    <div className="device-details-history-item-info__value device-details-history-item-info__value--red">{responseData.attributes.general.max.toString()}</div>
                    <div className="device-details-history-item-info__desc">Максимальное значение</div>
                  </div>
                )}
                {responseData.attributes.general.min !== null && (
                  <div className="device-details-history-item-info__item">
                    <div className="device-details-history-item-info__value device-details-history-item-info__value--blue">{responseData.attributes.general.min.toString()}</div>
                    <div className="device-details-history-item-info__desc">Минимальное значение</div>
                  </div>
                )}
                {responseData.attributes.general.avg !== null && (
                  <div className="device-details-history-item-info__item">
                    <div className="device-details-history-item-info__value">{Math.round(responseData.attributes.general.avg).toString()}</div>
                    <div className="device-details-history-item-info__desc">Среднее значение</div>
                  </div>
                )}
              </div>
            ) : ''}
            <DeviceChartTAir
              loading={loading}
              responseData={responseData}
              baseOptions={baseOptions}
              timeZone={timeZone}
            />
          </Fragment>
        );
      case 'rfid_hold':
        return (
          <DeviceChartRfidHold
            loading={loading}
            responseData={responseData}
            baseOptions={baseOptions}
            timeZone={timeZone}
          />
        );
      case 'rfid':
        return (
          <DeviceChartRfid
            loading={loading}
            responseData={responseData}
            baseOptions={baseOptions}
            timeZone={timeZone}
          />
        );
      case 'gas':
        return (
          <DeviceChartGas
            loading={loading}
            responseData={responseData}
            baseOptions={baseOptions}
            timeZone={timeZone}
          />
        );
      case 'wire':
        return (
          <DeviceChartWire
            loading={loading}
            responseData={responseData}
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
    zoomEnabled: true,
    height: 200,
    culture:  "ru",
    axisX:{
      lineColor: '#E7ECF8',
      // intervalType: 'hour',
      // valueFormatString: 'HH:mm:ss',
      intervalType: currentIntervalType,
      // valueFormatString: currentIntervalType === 'minutes' ? 'HH:mm:ss' : currentIntervalType === 'hours' ? 'HH:mm' : currentIntervalType === 'days' ? 'DD MMMM' : 'MMMM YYYY',
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
    rangeChanged: rangeChanged
  };

  return (
    <div className="device-details-history-item">
      <div className="device-details-history-item__title">{currentSensor.sensor_type.name}{slotsCount > 1 ? ' | ' : ''}{slotsCount > 1 ? (<span>Слот {currentItem.number}</span>) : ''}</div>
      {getItemContent()}
    </div>
  )
};

export default DeviceDetailsHistoryItem;
