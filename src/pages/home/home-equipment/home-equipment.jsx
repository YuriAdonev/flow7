import React, {Fragment, useContext, useEffect, useRef, useState} from 'react';


import IntensityCalendarView
  from "../../../components/intensity-calendar/intensity-calendar-view/intensity-calendar-view";
import {DatePicker, i18n} from "element-react";
import locale from 'element-react/src/locale/lang/ru-RU';
import IntensityCalendar from "../../../components/intensity-calendar/intensity-calendar";
import {convertTime, getMonthNameInline} from "../../../utils";
import Spinner from "../../../components/spinner/spinner";
import HomeEquipmentTable from "./home-equipment-table/home-equipment-table";
import useFetch from "../../../hooks/use-fetch";
import {CurrentUserContext} from "../../../contexts/current-user";
locale.el.datepicker.today = new Date().getDate() + '';
i18n.use(locale);

const HomeEquipment = (props) => {
  const currentDate = new Date();
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`);
  const [endDate, setEndDate] = useState(`${currentDate.getMonth() === 11 ? currentDate.getFullYear() + 1 : currentDate.getFullYear()}-${currentDate.getMonth() + 1 === 12 ? 1 : currentDate.getMonth() + 2}`);
  const [startDateTable, setStartDateTable] = useState(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`);
  // const [endDateTable, setEndDateTable] = useState(`${currentDate.getMonth() === 11 ? currentDate.getFullYear() + 1 : currentDate.getFullYear()}-${currentDate.getMonth() + 1 === 12 ? 1 : currentDate.getMonth() + 2}`);
  const [worksChecked, setWorksChecked] = useState(true);
  const [serviceChecked, setServiceChecked] = useState(true);
  const [brokenChecked, setBrokenChecked] = useState(true);
  const [calendarData, setCalendarData] = useState([]);
  const [generalData, setGeneralData] = useState({});
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(false);

  const [{response: calendarDataResponse, isLoading: calendarDataIsLoading, error: calendarDataError}, doFetchCalendarData] = useFetch(`/directories/equipment_items/usage?from=${startDate}-1T12:00:00.000+03:00&to=${endDate}-1T12:00:00.000+03:00`);
  const [{response: tableDataResponse, isLoading: tableDataIsLoading, error: tableDataError}, doFetchTableData] = useFetch(`/directories/equipment_items/timelines?from=${startDateTable}T00:00:00.000+03:00&to=${startDateTable}T23:59:59.999+03:00`);

  const datePickerRef = useRef(null);

  useEffect(() => {
    if (currentUserState.currentSite === null) {
      return;
    }
    if (currentUserState.currentSite.subdomain === '') {
      return;
    }
    setError(false);
    doFetchCalendarData();
    doFetchTableData();
  }, [currentUserState.currentSite]);

  useEffect(() => {
    if (!calendarDataResponse) {
      return;
    }
    setCalendarData(calendarDataResponse.data.daily_data);
    setGeneralData(calendarDataResponse.data.general);
    setLoading(false);
  }, [calendarDataResponse]);

  // useEffect(() => {
  //   if (calendarDataError !== null) {
  //     setError(true);
  //   }
  //   return () => {
  //     setError(false);
  //   }
  // }, [calendarDataError]);

  useEffect(() => {
    if (!tableDataResponse) {
      return;
    }
    setTableData(tableDataResponse.data);
    setTableLoading(false);
  }, [tableDataResponse]);

  useEffect(() => {
    if (currentUserState.currentSite === null) {
      return;
    }
    if (currentUserState.currentSite.subdomain === '') {
      return;
    }
    doFetchCalendarData();
    doFetchTableData();
  }, [startDate, endDate, startDateTable]);

  useEffect(() => {
    setTableLoading(true);
    // localStorage.setItem('lsDate', `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`);
    setStartDateTable(`${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`);
  }, [selectedDate]);

  useEffect(() => {
    if (currentUserState.selectedDate === null) {
      setSelectedDate(new Date());
    } else {
      setSelectedDate(new Date(currentUserState.selectedDate));
      setCurrentUserState(state => ({
        ...state,
        selectedDate: null
      }));
    }
  }, []);

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

  const getIndicatorInPercent = (attr) => {
    return Math.round(attr[0] / (attr[0] + attr[1] + attr[2]) * 10000 , -2) / 100
  };

  const onItemMore = (id) => {
    setCurrentUserState(state => ({
      ...state,
      previousPage: '/',
      selectedDate: `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`
    }));
    // localStorage.setItem('lsDate', `${new Date(selectedDate).getFullYear()}-${new Date(selectedDate).getMonth() + 1}-${new Date(selectedDate).getDate()}`);
    props.history.push(`/equipment-and-materials?equipment_id=${id}`);
  };

  console.log('calendarDataError', calendarDataError);
  return (
    <Fragment>
      {error ? (
          <div className="data-empty">
            <div className="data-empty__block">
              <div className="data-empty__text">Для получения информации об использовании оборудования</div>
              <div className="data-empty__text data-empty__text--link">привяжите регистрирующее устройство.</div>
            </div>
          </div>
        ) : (
        <div className="home-equipment">
          <div className="home-equipment-head">
            <IntensityCalendarView
              worksChecked={worksChecked}
              serviceChecked={serviceChecked}
              brokenChecked={brokenChecked}
              onChoice={calendarViewHandler}
            />
            <div className="home-equipment-head__datepicker">
              <DatePicker
                ref={datePickerRef}
                onChange={onDateChoice}
                format="dd.MM.yyyy"
                placeholder="Выберите даты"
                value={selectedDate}
              />
            </div>
          </div>
          <div className="home-equipment-intensity">
            <div className="inner-title">Интенсивность загрузки оборудования</div>
            <div className="home-equipment-intensity__calendar">
              <IntensityCalendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                worksChecked={worksChecked}
                serviceChecked={serviceChecked}
                brokenChecked={brokenChecked}
                calendarData={calendarData}
                loadMonthData={loadMonthData}
                setError={setError}
              />
            </div>
          </div>
          <div className="home-equipment-indicators">
            <div className="inner-title">Основные показатели по оборудованию на {`${new Date(selectedDate).getDate()} ${getMonthNameInline(new Date(selectedDate).getMonth())} ${new Date(selectedDate).getFullYear()} год`}</div>
            {loading ? <Spinner/> : (
              <div className="home-equipment-indicators__wrap">
                <div className="home-equipment-indicators__item">
                  <div className="home-equipment-indicators__value">{convertTime(generalData.period_worked)}</div>
                  <div className="home-equipment-indicators__desc">В работе</div>
                </div>
                <div className="home-equipment-indicators__item">
                  <div className="home-equipment-indicators__value">{convertTime(generalData.period_stopped)}</div>
                  <div className="home-equipment-indicators__desc">Простой</div>
                </div>
                <div className="home-equipment-indicators__item">
                  <div className="home-equipment-indicators__value">{convertTime(generalData.period_turned_off)}</div>
                  <div className="home-equipment-indicators__desc">Выключено</div>
                </div>
                <div className="home-equipment-indicators__item">
                  <div className="home-equipment-indicators__value">{getIndicatorInPercent([generalData.period_worked, generalData.period_stopped, generalData.period_turned_off])} <span>%</span></div>
                  <div className="home-equipment-indicators__desc">Общий процент загрузки</div>
                </div>
                <div className="home-equipment-indicators__item">
                  <div className="home-equipment-indicators__value">{getIndicatorInPercent([generalData.period_stopped, generalData.period_worked, generalData.period_turned_off])} <span>%</span></div>
                  <div className="home-equipment-indicators__desc">Общий процент простоя</div>
                </div>
                <div className="home-equipment-indicators__item">
                  <div className="home-equipment-indicators__value">{getIndicatorInPercent([generalData.period_turned_off, generalData.period_worked, generalData.period_stopped])} <span>%</span></div>
                  <div className="home-equipment-indicators__desc">Не включено</div>
                </div>
              </div>
            )}
          </div>
          <div className="home-equipment-table">
            <div className="inner-title">Таблица работы оборудования на {`${new Date(selectedDate).getDate()} ${getMonthNameInline(new Date(selectedDate).getMonth())} ${new Date(selectedDate).getFullYear()} год`}</div>
            <HomeEquipmentTable
              tableData={tableData}
              onItemMore={onItemMore}
              isLoading={tableLoading}
              error={false}
              worksChecked={worksChecked}
              serviceChecked={serviceChecked}
              brokenChecked={brokenChecked}
            />
          </div>
        </div>
      )}
    </Fragment>
  )
};

export default HomeEquipment;
