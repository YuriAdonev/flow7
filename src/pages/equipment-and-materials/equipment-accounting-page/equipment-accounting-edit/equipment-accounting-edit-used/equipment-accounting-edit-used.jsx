import React, {useState, useEffect, useRef, useContext} from 'react';

import './equipment-accounting-edit-used.scss';

import {DatePicker, i18n} from "element-react";
import locale from 'element-react/src/locale/lang/ru-RU';
import IntensityCalendar from "../../../../../components/intensity-calendar/intensity-calendar";
import IntensityCalendarView
  from "../../../../../components/intensity-calendar/intensity-calendar-view/intensity-calendar-view";
import useFetch from "../../../../../hooks/use-fetch";
import {convertTime, getMonthNameInline} from "../../../../../utils";
import EquipmentAccountingEditUsedChart
  from "../equipment-accounting-edit-used-chart/equipment-accounting-edit-used-chart";
import {CurrentUserContext} from "../../../../../contexts/current-user";
locale.el.datepicker.today = new Date().getDate() + '';
i18n.use(locale);

const EquipmentAccountingEditUsed = ({ itemId, balanceDate }) => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);

  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentUserState.selectedDate === null ? new Date() : new Date(currentUserState.selectedDate));
  const [startDate, setStartDate] = useState(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`);
  const [endDate, setEndDate] = useState(`${currentDate.getMonth() === 11 ? currentDate.getFullYear() + 1 : currentDate.getFullYear()}-${currentDate.getMonth() + 1 === 12 ? 1 : currentDate.getMonth() + 2}`);
  const [startDateDay, setStartDateDay] = useState(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`);
  const [worksChecked, setWorksChecked] = useState(true);
  const [serviceChecked, setServiceChecked] = useState(true);
  const [brokenChecked, setBrokenChecked] = useState(true);
  const [loading, setLoading] = useState(true);
  const [calendarData, setCalendarData] = useState([]);
  const [generalData, setGeneralData] = useState({});
  const [sensorsList, setSensorsList] = useState([]);
  const [parentDate, setParentDate] = useState(null);

  const [{response: calendarDataResponse, isLoading: calendarDataIsLoading, error: calendarDataError}, doFetchCalendarData] = useFetch(`/directories/equipment_items/${itemId}/usage?from=${startDate}-1T00:00:00.000+03:00&to=${endDate}-1T23:59:59.999+03:00`);
  const [{response: dayDataResponse, isLoading: dayDataIsLoading, error: dayDataError}, doFetchDayData] = useFetch(`/directories/equipment_items/${itemId}/usage?from=${startDateDay}T00:00:00.000+03:00&to=${startDateDay}T23:59:59.999+03:00`);
  const [{response: sensorsResponse, isLoading: sensorsIsLoading, error: sensorsError}, doFetchSensors] = useFetch(`/directories/equipment_items/${itemId}/sensors`);

  const datePickerRef = useRef(null);

  useEffect(() => {
    // if (currentUserState.selectedDate !== null) {
    //   setSelectedDate(currentUserState.selectedDate);
    // }
    doFetchCalendarData();
    doFetchDayData();
    doFetchSensors();
  }, []);

  useEffect(() => {
    if (!calendarDataResponse || !dayDataResponse || !sensorsResponse) {
      return;
    }
    setCalendarData(calendarDataResponse.data.daily_data);
    setGeneralData(dayDataResponse.data.general);
    setSensorsList(sensorsResponse.data);
    setLoading(false);
  }, [calendarDataResponse, dayDataResponse, sensorsResponse]);

  useEffect(() => {
    doFetchCalendarData();
  }, [startDate, endDate]);

  useEffect(() => {
    setStartDateDay(`${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`);
    // setCurrentUserState(state => ({
    //   ...state,
    //   selectedDate: selectedDate
    // }));
    // localStorage.setItem('lsDate', `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`);
  }, [selectedDate]);

  useEffect(() => {
    doFetchDayData();
  }, [startDateDay])

  const onDateChoice = (attr) => {
    setSelectedDate(new Date(attr));
  };

  const calendarViewHandler = (type) => {
    switch (type) {
      case 'works':
        setWorksChecked(!worksChecked);
        return;
      case 'service':
        setServiceChecked(!serviceChecked);
        return;
      case 'broken':
        setBrokenChecked(!brokenChecked);
        return;
      default:
        setWorksChecked(worksChecked);
        setServiceChecked(serviceChecked);
        setBrokenChecked(brokenChecked);
    }
  };

  const loadMonthData = (month, year) => {
    setStartDate(`${year}-${month + 1}`);
    setEndDate(`${month === 11 ? year + 1 : year }-${month === 11 ? 1 : month + 2}`);
  };

  return (
    <div className="equipment-accounting-edit-used">
      <div className="equipment-accounting-edit-used__head">
        <IntensityCalendarView
          worksChecked={worksChecked}
          serviceChecked={serviceChecked}
          brokenChecked={brokenChecked}
          onChoice={calendarViewHandler}
        />
        <div className="equipment-accounting-edit-used__datepicker">
          <DatePicker
            ref={datePickerRef}
            onChange={onDateChoice}
            format="dd.MM.yyyy"
            placeholder="Выберите даты"
            value={selectedDate}
          />
        </div>
      </div>
      <div className="equipment-accounting-edit-used-intensity">
        <div className="inner-title">График интенсивности работы</div>
        <div className="inner-desc">На графике представлена интенсивность работы оборудования по дням.</div>
        <div className="equipment-accounting-edit-used-intensity__calendar">
          <IntensityCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            worksChecked={worksChecked}
            serviceChecked={serviceChecked}
            brokenChecked={brokenChecked}
            calendarData={calendarData}
            loadMonthData={loadMonthData}
          />
        </div>
      </div>
      <div className="equipment-accounting-edit-used__work work-info">
        <div className="work-info__col">
          <div className="work-info__title inner-title">Данные за выбранный период</div>
          <div className="work-info__desc inner-desc">Данные о работе {`${new Date(selectedDate).getDate()} ${getMonthNameInline(new Date(selectedDate).getMonth())} ${new Date(selectedDate).getFullYear()}`}</div>
          <div className="work-info__list">
            <div className="work-info-item">
              <div className="work-info-item__value">{convertTime(generalData.period_worked)}</div>
              <div className="work-info-item__desc">В работе</div>
            </div>
            <div className="work-info-item">
              <div className="work-info-item__value">{convertTime(generalData.period_stopped)}</div>
              <div className="work-info-item__desc">Простой</div>
            </div>
            <div className="work-info-item">
              <div className="work-info-item__value">{convertTime(generalData.period_turned_off)}</div>
              <div className="work-info-item__desc">Выключено</div>
            </div>
          </div>
        </div>
        <div className="work-info__col">
          <div className="work-info__title inner-title">Общие данные о работе устройства с {`${new Date(balanceDate).getDate()} ${getMonthNameInline(new Date(balanceDate).getMonth())} ${new Date(balanceDate).getFullYear()}`}</div>
          <div className="work-info__desc inner-desc">Данные о работе предоставляются с момента подключения оборудования.</div>
          <div className="work-info__list">
            <div className="work-info-item">
              <div className="work-info-item__value">{convertTime(generalData.all_time_worked)}</div>
              <div className="work-info-item__desc">В работе</div>
            </div>
            <div className="work-info-item">
              <div className="work-info-item__value">{convertTime(generalData.all_time_stopped)}</div>
              <div className="work-info-item__desc">Простой</div>
            </div>
            <div className="work-info-item">
              <div className="work-info-item__value">{convertTime(generalData.all_time_turned_off)}</div>
              <div className="work-info-item__desc">Выключено</div>
            </div>
          </div>
        </div>
      </div>
      <div className="equipment-accounting-edit-used-charts">
        <div className="equipment-accounting-edit-used-charts__head">
          <div className="inner-title">Графики данных для расчета работы оборудования</div>
          <div className="inner-desc">Представлены графики, на основе которых идет расчет загрузки оборудования. При расчете учитываются только активные данные, т.е. если оборудование было включено, но не использовалось, то это время считается временем простоя.</div>
        </div>
        <div className="equipment-accounting-edit-used-charts__wrap">
          {sensorsList === [] ? '' : sensorsList.map((item, index) => {
            return (
              <EquipmentAccountingEditUsedChart
                key={index}
                currentSensor={item}
                filteredDate={selectedDate}
              />)
          })}
        </div>
      </div>
    </div>
  )
};

export default EquipmentAccountingEditUsed;
