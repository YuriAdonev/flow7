import React, { Component } from 'react';

import './calendar-widget-header.scss';

import { getMonthName } from '../../../utils';

class CalendarWidgetHeader extends Component {

  render() {
    const { year, month, day } = this.props.currentDate;

    return (
      <div className="calendar-widget-header">
        <div className="calendar-widget-header__nav calendar-widget-header__prev">
          <button
            className="calendar-widget-header__btn btn"
            type="button"
            onClick={() => this.props.onMonthDecrement()}
          >
            <svg width="6" height="10" viewBox="0 0 6 10" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.56641 1.55469L2.12109 5L5.56641 8.44531L4.51172 9.5L0.0117188 5L4.51172 0.5L5.56641 1.55469Z"/>
            </svg>
          </button>
          <span>{getMonthName(new Date(year, month - 2, day).getMonth())}</span>
        </div>
        <div className="calendar-widget-header__current">{getMonthName(new Date(year, month -1, day).getMonth())}</div>
        <div className="calendar-widget-header__nav calendar-widget-header__next">
          <span>{getMonthName(new Date(year, month, day).getMonth())}</span>
          <button
            className="calendar-widget-header__btn btn"
            type="button"
            onClick={() => this.props.onMonthIncrement()}
          >
            <svg width="6" height="10" viewBox="0 0 6 10" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.48828 0.5L5.98828 5L1.48828 9.5L0.433594 8.44531L3.87891 5L0.433594 1.55469L1.48828 0.5Z"/>
            </svg>
          </button>
        </div>
      </div>
    );
  }
};

export default CalendarWidgetHeader;
