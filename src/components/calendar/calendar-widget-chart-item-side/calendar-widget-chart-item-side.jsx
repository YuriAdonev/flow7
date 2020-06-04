import React from 'react';

import './calendar-widget-chart-item-side.scss';

const CalendarWidgetChartItemSide = (props) => {

  const colHeight = () => {
    return ((72 / props.maxDayValue) * props.count) + 13;
  };

  return (
    <div className="calendar-widget-chart-item calendar-widget-chart-item-side">
      <div
        className={`calendar-widget-chart-item__col`}
        style={{height: colHeight() + 'px', backgroundColor: '#E7ECF8'}}
      >
      </div>
      <div className="calendar-widget-chart-item__day">{props.day < 10 ? '0' + props.day : props.day}</div>
    </div>
  );
};

export default CalendarWidgetChartItemSide;
