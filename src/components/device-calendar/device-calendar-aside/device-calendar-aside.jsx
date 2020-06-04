import React from 'react';

import './device-calendar-aside.scss';

const DeviceCalendarAside = ({ position, onNavClick}) => {
  return (
    <div className={`device-calendar-aside ${position}`}>
      <div
        className="device-calendar-aside__nav"
        onClick={onNavClick}
      >
        {position === 'left' ? (
          <svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.54199 1.55469L3.09668 5L6.54199 8.44531L5.4873 9.5L0.987305 5L5.4873 0.5L6.54199 1.55469Z"/>
          </svg>
        ) : (
          <svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.62646 0.5L6.12646 5L1.62646 9.5L0.571777 8.44531L4.01709 5L0.571777 1.55469L1.62646 0.5Z"/>
          </svg>
        )}
      </div>
      <ul className="device-calendar-aside__days">
        <li>ПН</li>
        <li>ВТ</li>
        <li>СР</li>
        <li>ЧТ</li>
        <li>ПТ</li>
        <li>СБ</li>
        <li>ВС</li>
      </ul>
    </div>
  )
};

export default DeviceCalendarAside;
