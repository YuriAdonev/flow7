import React, { useState, useEffect } from 'react';

import './intensity-calendar.scss';
import IntensityCalendarWidget from "./intensity-calendar-widget/intensity-calendar-widget";

const _monthName = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

const IntensityCalendar = ({ selectedDate, setSelectedDate, worksChecked, serviceChecked, brokenChecked, calendarData, loadMonthData, setError }) => {
  const [previousVisibleMonth, setPreviousVisibleMonth] = useState(null);
  const [currentVisibleMonth, setCurrentVisibleMonth] = useState(new Date(selectedDate).getMonth());
  const [nextVisibleMonth, setNextVisibleMonth] = useState(null);
  const [currentVisibleYear, setCurrentVisibleYear] = useState(new Date(selectedDate).getFullYear());

  if (calendarData === []) {
    setError(true);
  }

  useEffect(() => {
    loadMonthData(new Date(selectedDate).getMonth(), new Date(selectedDate).getFullYear());
    setCurrentVisibleMonth(new Date(selectedDate).getMonth());
    setCurrentVisibleYear(new Date(selectedDate).getFullYear());
  }, [selectedDate]);

  useEffect(() => {
    if (currentVisibleMonth === 0) {
      setPreviousVisibleMonth(11);
      setNextVisibleMonth(1);
    } else {
      if (currentVisibleMonth === 11) {
        setPreviousVisibleMonth(10);
        setNextVisibleMonth(0);
      } else {
        setPreviousVisibleMonth(currentVisibleMonth - 1);
        setNextVisibleMonth(currentVisibleMonth + 1);
      }
    }
    loadMonthData(currentVisibleMonth, currentVisibleYear);
  }, [currentVisibleMonth]);

  const monthDecrease = () => {
    if (currentVisibleMonth === 0) {
      setCurrentVisibleMonth(11);
      setCurrentVisibleYear(currentVisibleYear - 1);
    } else {
      setCurrentVisibleMonth(currentVisibleMonth - 1);
    }
  };

  const monthIncrease = () => {
    if (currentVisibleMonth === 11) {
      setCurrentVisibleMonth(0);
      setCurrentVisibleYear(currentVisibleYear + 1);
    } else {
      setCurrentVisibleMonth(currentVisibleMonth + 1);
    }
  };

  return (
    <div className="intensity-calendar">
      <div className="intensity-calendar-nav">
        <div className="intensity-calendar-nav__item intensity-calendar-nav__item--prev">
          <div
            className="intensity-calendar-nav__arrow btn"
            onClick={monthDecrease}
          >
            <svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.54199 1.55469L3.09668 5L6.54199 8.44531L5.4873 9.5L0.987305 5L5.4873 0.5L6.54199 1.55469Z"/>
            </svg>
          </div>
          <span>{_monthName[previousVisibleMonth]}</span>
        </div>
        <div className="intensity-calendar-nav__current">{_monthName[currentVisibleMonth]}</div>
        <div className="intensity-calendar-nav__item intensity-calendar-nav__item--next">
          <span>{_monthName[nextVisibleMonth]}</span>
          <div
            className="intensity-calendar-nav__arrow btn"
            onClick={monthIncrease}
          >
            <svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.62646 0.5L6.12646 5L1.62646 9.5L0.571777 8.44531L4.01709 5L0.571777 1.55469L1.62646 0.5Z"/>
            </svg>
          </div>
        </div>
      </div>
      <IntensityCalendarWidget
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        worksChecked={worksChecked}
        serviceChecked={serviceChecked}
        brokenChecked={brokenChecked}
        calendarData={calendarData}
      />
      <div className="intensity-calendar-legend">
        <div className="intensity-calendar-legend__item">
          <span className="intensity-calendar-legend__mark intensity-calendar-legend__mark--green"/>
          <div className="intensity-calendar-legend__desc">Работало</div>
        </div>
        <div className="intensity-calendar-legend__item">
          <span className="intensity-calendar-legend__mark intensity-calendar-legend__mark--yellow"/>
          <div className="intensity-calendar-legend__desc">Простой</div>
        </div>
        <div className="intensity-calendar-legend__item">
          <span className="intensity-calendar-legend__mark intensity-calendar-legend__mark--red"/>
          <div className="intensity-calendar-legend__desc">Выключено</div>
        </div>
      </div>
    </div>
  )
};

export default IntensityCalendar;
