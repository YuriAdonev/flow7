import React from 'react';

import './device-calendar.scss';
import DeviceCalendarAside from "./device-calendar-aside/device-calendar-aside";
import DeviceCalendarWidget from "./device-calendar-widget/device-calendar-widget";

const DeviceCalendar = () => {
  const onPrevClick = () => {

  };

  const onNextClick = () => {

  };

  return (
    <div className="device-calendar">
      <div className="device-calendar__wrap">
        <DeviceCalendarAside
          position="left"
          onNavClick={onPrevClick}
        />
        <DeviceCalendarWidget

        />
        <DeviceCalendarAside
          position="right"
          onNavClick={onNextClick}
        />
      </div>
      <div className="device-calendar-legend">
        <div className="device-calendar-legend__item">
          <div className="device-calendar-legend__mark"/>
          <div className="device-calendar-legend__desc">Более 30 минут работы</div>
        </div>
        <div className="device-calendar-legend__item">
          <div className="device-calendar-legend__mark"/>
          <div className="device-calendar-legend__desc">Более 1 часа работы</div>
        </div>
        <div className="device-calendar-legend__item">
          <div className="device-calendar-legend__mark"/>
          <div className="device-calendar-legend__desc">Более 2 часов работы</div>
        </div>
        <div className="device-calendar-legend__item">
          <div className="device-calendar-legend__mark"/>
          <div className="device-calendar-legend__desc">Более 4 часов работы</div>
        </div>
        <div className="device-calendar-legend__item current">
          <div className="device-calendar-legend__mark"/>
          <div className="device-calendar-legend__desc">Текущая дата</div>
        </div>
      </div>
    </div>
  );
};

export default DeviceCalendar;
