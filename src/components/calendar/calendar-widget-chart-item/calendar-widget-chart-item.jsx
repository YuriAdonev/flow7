import React from 'react';

import './calendar-widget-chart-item.scss';

const CalendarWidgetChartItem = (props) => {
  const colColor = () => {
    if (props.day === props.currentDate.day) {
      return '#B4115F';
    }
    if (props.count >= 1 && props.count < 5) {
      return '#D6D3F7';
      // return 'rgba(#113FB4, 0.2)';
    }
    if (props.count >= 5 && props.count < 10) {
      return '#9693F0';
    }
    if (props.count >= 10 && props.count < 20) {
      return '#A773EA';
    }
    if (props.count >= 20) {
      return '#640C9A';
    }
  };

  const colHeight = () => {
    return ((72 / props.maxDayValue) * props.count) + 13;
  };

  return (
    <div className="calendar-widget-chart-item">
      <div
        className={`calendar-widget-chart-item__col${props.day === props.currentDate.day ? ' current' : ''}`}
        style={{height: colHeight() + 'px', backgroundColor: colColor()}}
        onClick={() => props.onChartItemClick(props.day)}
      >
        <div className="calendar-widget-chart-item__desc">{props.count}</div>
      </div>
      <div className="calendar-widget-chart-item__day">{props.day < 10 ? '0' + props.day : props.day}</div>
    </div>
  );
};

export default CalendarWidgetChartItem;
