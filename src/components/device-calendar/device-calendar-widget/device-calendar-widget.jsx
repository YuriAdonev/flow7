import React, { useState, useEffect, useRef } from 'react';

import './device-calendar-widget.scss';
import DeviceCalendarWidgetItem from "../device-calendar-widget-item/device-calendar-widget-item";

const DeviceCalendarWidget = () => {
  const [currentDay, setCurrentDay] = useState(new Date());
  const [monthCount, setMonthCount] = useState(null);
  const [months, setMonths] = useState([]);

  const widgetRef = useRef(null);

  const resizeHandler = () => {
    if (Math.ceil(widgetRef.current.clientWidth / 161) !== monthCount) {
      setMonthCount(Math.ceil(widgetRef.current.clientWidth / 161));
    }
    console.log('resize', widgetRef.current.clientWidth, Math.ceil(widgetRef.current.clientWidth / 161));
  };

  useEffect(() => {
    setMonthCount(Math.ceil(widgetRef.current.clientWidth / 161));
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  useEffect(() => {
    if (!monthCount) {
      return;
    }
    const monthArr = [{year: currentDay.getFullYear(), month: currentDay.getMonth()}];
    for (let i = 0; i < monthCount - 1; i++) {
      let newMonth;
      if (monthArr[i].month === 0) {
        newMonth = {year: monthArr[i].year - 1, month: 11};
      } else {
        newMonth = {year: monthArr[i].year, month: monthArr[i].month - 1};
      }
      monthArr.push(newMonth);
    }
    setMonths(monthArr);
  }, [monthCount]);

  console.log('monthCount', monthCount);
  console.log('months', months);

  const items = months.map((item, index) => {
    return (
      <DeviceCalendarWidgetItem
        key={index}
        item={item}
        currentDay={currentDay}
      />
    )
  });

  return (
    <div
      ref={widgetRef}
      className="device-calendar-widget"
    >
      {items}
    </div>
  )
};

export default DeviceCalendarWidget;
