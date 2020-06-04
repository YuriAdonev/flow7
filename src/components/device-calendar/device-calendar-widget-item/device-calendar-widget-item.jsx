import React, { useState, useEffect } from 'react';

import './device-calendar-widget-item.scss';

import { daysInMonth, getMonthName } from '../../../utils';

const DeviceCalendarWidgetItem = ({ item, currentDay }) => {
  const [daysArr, setDaysArr] = useState([]);
  const [colsArr, setColsArr] = useState([]);

  const daysCount = daysInMonth(item.month + 1, item.year);
  const offsetDay = new Date(item.year, item.month, 1).getDay() === 0 ? 6 : new Date(item.year, item.month, 1).getDay() - 1;

  useEffect(() => {
    const newDaysArr = [];
    for (let i = 0; i < offsetDay; i++) {
      newDaysArr.push(null);
    }
    for (let i = 1; i <= daysCount; i++) {
      newDaysArr.push(i);
    }
    const newColsArr = [];
    let count = 0;
    for (let i = 0; i < Math.ceil(newDaysArr.length / 7); i++) {
      const weekArr = [];
      for (let j = 0; j < 7; j++) {
        if (newDaysArr[count] !== undefined) {
          weekArr.push(newDaysArr[count]);
        }
        count++;
      }
      newColsArr.push(weekArr);
    }
    setColsArr(newColsArr);
  }, []);

  const cols = colsArr.map((colItem, index) => {
    const days = colItem.map((dayItem, dayIndex) => {
      const isCurrent = item.year === currentDay.getFullYear() && item.month === currentDay.getMonth() && dayItem === currentDay.getDate();
      if (!dayItem) {
        return (
          <div
            key={dayIndex}
            className="device-calendar-widget-item__day offset"
          />
        )
      } else {
        return (
          <div
            key={dayIndex}
            className={`device-calendar-widget-item__day${isCurrent ? ' current' : ' unused'}`}
          >
            {dayItem}
          </div>
        )
      }
    });
    return (
      <div
        key={index}
        className="device-calendar-widget-item__col"
      >
        {days}
      </div>
    )
  });

  return (
    <div className="device-calendar-widget-item current">
      <div className="device-calendar-widget-item__head">
        <div className="device-calendar-widget-item__month">{getMonthName(item.month)}{item.year !== currentDay.getFullYear() && ' ' + item.year}</div>
      </div>
      <div className="device-calendar-widget-item__block">
        {cols}
        {/*<div className="device-calendar-widget-item__col">*/}
        {/*  <div className="device-calendar-widget-item__day unused">01</div>*/}
        {/*  <div className="device-calendar-widget-item__day low">02</div>*/}
        {/*  <div className="device-calendar-widget-item__day medium">03</div>*/}
        {/*  <div className="device-calendar-widget-item__day large">04</div>*/}
        {/*  <div className="device-calendar-widget-item__day extra">05</div>*/}
        {/*  <div className="device-calendar-widget-item__day current">06</div>*/}
        {/*  <div className="device-calendar-widget-item__day unused">07</div>*/}
        {/*</div>*/}
      </div>
    </div>
  )
};

export default DeviceCalendarWidgetItem;
