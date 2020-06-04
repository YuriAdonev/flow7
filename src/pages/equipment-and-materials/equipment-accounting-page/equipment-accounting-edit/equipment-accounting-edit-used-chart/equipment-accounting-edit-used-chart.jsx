import React, {Fragment, useEffect, useState} from 'react';
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
import useFetch from "../../../../../hooks/use-fetch";

const EquipmentAccountingEditUsedChart = ({ currentSensor, filteredDate }) => {
  const timeZone = 0;

  const [defaultPeriod, setDefaultPeriod] = useState(true);
  const [responseData, setResponseData] = useState({});
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState((new Date().getTime() / (1000 * 60 * 60 * 24)) * (1000 * 60 * 60 * 24));
  const [startDateString, setStartDateString] = useState('');
  const [startTime, setStartTime] = useState('00:00:00');
  const [endDate, setEndDate] = useState(new Date().getTime());
  const [endDateString, setEndDateString] = useState('');
  const [endTime, setEndTime] = useState(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
  const [currentIntervalType, setCurrentIntervalType] = useState('hours');

  const [{response, isLoading, error}, doFetchData] = useFetch(`/devices/sensors/${currentSensor.id}/received_data?from=${startDateString}&to=${endDateString}`);

  useEffect(() => {
    const currentDay = (new Date().getTime() / (1000 * 60 * 60 * 24)) * (1000 * 60 * 60 * 24);
    const selectedDay = (new Date(filteredDate).getTime() / (1000 * 60 * 60 * 24)) * (1000 * 60 * 60 * 24);
    if (defaultPeriod) {
      setStartDateString(`${new Date(filteredDate).getFullYear()}-${new Date(filteredDate).getMonth() + 1}-${new Date(filteredDate).getDate()}T${startTime}.000+03:00`);
      if ( currentDay === selectedDay ) {
        setEndDateString(`${new Date(filteredDate).getFullYear()}-${new Date(filteredDate).getMonth() + 1}-${new Date(filteredDate).getDate()}T${endTime}.999+03:00`);
      } else {
        setEndDateString(`${new Date(filteredDate).getFullYear()}-${new Date(filteredDate).getMonth() + 1}-${new Date(filteredDate).getDate()}T23:59:59.999+03:00`);
      }
      setLoading(true);
      doFetchData();
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
    setCurrentIntervalType(calculateIntervalType(Math.floor((new Date().getTime() / (1000 * 60 * 60 * 24))) * (1000 * 60 * 60 * 24), new Date().getTime()));
    const currentTime = new Date().getTime();
    setEndTime(`${new Date(currentTime - timeZone).getHours()}:${new Date(currentTime - timeZone).getMinutes()}:${new Date(currentTime - timeZone).getSeconds()}`);
  }, [response]);

  const calculateIntervalType = (min, max) => {
    const interval = Math.floor(max / 1000) - Math.floor(min / 1000);
    if (interval <= 1500) {
      return 'minutes';
    }
    if (interval > 1500 && interval <= 172800) {
      return 'hours';
    }
    if (interval > 172800) {
      return 'days';
    }
  };

  const rangeChanged = (attr) => {
    if (attr.trigger === 'reset') {
      const currentTime = new Date().getTime();
      const newStartTime = `00:00:00`;
      const newEndTime = `${new Date(currentTime - timeZone).getHours()}:${new Date(currentTime - timeZone).getMinutes()}:${new Date(currentTime - timeZone).getSeconds()}`;
      setStartTime(newStartTime);
      setEndTime(endTime);
      setStartDate(new Date(filteredDate));
      setStartDateString(`${new Date(filteredDate).getFullYear()}-${new Date(filteredDate).getMonth() + 1}-${new Date(filteredDate).getDate()}T${newStartTime}.000+03:00`);
      setEndDate(new Date(filteredDate[0]));
      setEndDateString(`${new Date(filteredDate).getFullYear()}-${new Date(filteredDate).getMonth() + 1}-${new Date(filteredDate).getDate()}T${newEndTime}.999+03:00`);
      setDefaultPeriod(true);
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
    }
    doFetchData();
  };

  const getItemContent = () => {
    switch (currentSensor.attributes.sensor_type.data_key_name) {
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
    axisX:{
      lineColor: '#E7ECF8',
      intervalType: currentIntervalType,
      valueFormatString: currentIntervalType === 'minutes' ? 'HH:mm:ss' : currentIntervalType === 'hours' ? 'HH:mm' : 'DD/MM/YYYY',
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
    <div className="equipment-accounting-edit-used-charts-item">
      <div className="inner-title">{currentSensor.attributes.sensor_type.name} | Устройство: <span>{currentSensor.attributes.slot_name}</span></div>
      {getItemContent()}
    </div>
  )
};

export default EquipmentAccountingEditUsedChart;
