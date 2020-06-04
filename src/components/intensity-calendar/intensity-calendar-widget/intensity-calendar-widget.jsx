import React, { useState, useEffect } from 'react';

import './intensity-calendar-widget.scss';
import {daysInMonth} from "../../../utils";

const SECONDS_IN_DAY = 86400;

const IntensityCalendarWidget = ({ selectedDate, setSelectedDate, worksChecked, serviceChecked, brokenChecked, calendarData }) => {
  const [viewCount, setViewCount] = useState(3);

  const daysArr = [];
  for (let i = 0; i < daysInMonth(new Date(selectedDate).getMonth() + 1, new Date(selectedDate).getFullYear()); i++) {
    daysArr.push(i < 9 ? '0' + (i + 1) : '' + (i + 1));
  }

  useEffect(() => {
    const viewArr = [worksChecked, serviceChecked, brokenChecked];
    const filteredViewArr = viewArr.slice().filter(it => it === true);
    setViewCount(filteredViewArr.length);
  }, [worksChecked, serviceChecked, brokenChecked]);

  const items = calendarData.map(item => {
    let isCurrent = false;
    const date = new Date(Number(item.at) * 1000);
    const itemDate = {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };
    if (date.getFullYear() === new Date(selectedDate).getFullYear()) {
      if (date.getMonth() === new Date(selectedDate).getMonth()) {
        if (date.getDate() === new Date(selectedDate).getDate()) {
          isCurrent = true;
        }
      }
    }

    return (
      <div
        key={date}
        className={`intensity-calendar-widget-item${isCurrent ? ' current' : ''}`}
        onClick={() => setSelectedDate(new Date(Number(item.at) * 1000))}
      >
        <div className="intensity-calendar-widget-item__value">
          {worksChecked && (
            <div
              className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--green"
              style={{height: `${(item.worked / (SECONDS_IN_DAY * item.equipment_items_count)) * 100 }%`}}
            />
          )}
          {serviceChecked && (
            <div
              className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--yellow"
              style={{height: `${(item.stopped / (SECONDS_IN_DAY * item.equipment_items_count)) * 100 }%`}}
            />
          )}
          {brokenChecked && (
            <div
              className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--red"
              style={{height: `${(item.turned_off / (SECONDS_IN_DAY * item.equipment_items_count)) * 100}%`}}
            />
          )}
        </div>
        <div className="intensity-calendar-widget-item__day">{itemDate.day < 10 ? '0' + itemDate.day : itemDate.day}</div>
      </div>
    )
  });

  return (
    <div className={`intensity-calendar-widget${viewCount === 3 ? ' three' : viewCount === 2 ? ' two' : viewCount === 1 ? ' one' : ''}`}>
      <div className="intensity-calendar-widget-item">
        <div className="intensity-calendar-widget-item__value">
          <div className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--red"/>
          <div className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--yellow"/>
          <div className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--green"/>
        </div>
        <div className="intensity-calendar-widget-item__day">28</div>
      </div>
      <div className="intensity-calendar-widget-item">
        <div className="intensity-calendar-widget-item__value">
          <div className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--red"/>
          <div className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--yellow"/>
          <div className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--green"/>
        </div>
        <div className="intensity-calendar-widget-item__day">29</div>
      </div>
      <div className="intensity-calendar-widget-item">
        <div className="intensity-calendar-widget-item__value">
          <div className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--red"/>
          <div className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--yellow"/>
          <div className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--green"/>
        </div>
        <div className="intensity-calendar-widget-item__day">30</div>
      </div>
      {items}
      <div className="intensity-calendar-widget-item">
        <div className="intensity-calendar-widget-item__value">
          <div className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--red"/>
          <div className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--yellow"/>
          <div className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--green"/>
        </div>
        <div className="intensity-calendar-widget-item__day">01</div>
      </div>
      <div className="intensity-calendar-widget-item">
        <div className="intensity-calendar-widget-item__value">
          <div className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--red"/>
          <div className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--yellow"/>
          <div className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--green"/>
        </div>
        <div className="intensity-calendar-widget-item__day">02</div>
      </div>
      <div className="intensity-calendar-widget-item">
        <div className="intensity-calendar-widget-item__value">
          <div className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--red"/>
          <div className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--yellow"/>
          <div className="intensity-calendar-widget-item__col intensity-calendar-widget-item__col--green"/>
        </div>
        <div className="intensity-calendar-widget-item__day">03</div>
      </div>
    </div>
  )
};

export default IntensityCalendarWidget;
