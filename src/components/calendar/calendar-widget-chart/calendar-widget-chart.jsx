import React from 'react';

import './calendar-widget-chart.scss';

import { daysInMonth } from '../../../utils'
import CalendarWidgetChartItem from "../calendar-widget-chart-item/calendar-widget-chart-item";
import CalendarWidgetChartItemSide from "../calendar-widget-chart-item-side/calendar-widget-chart-item-side";

const CalendarWidgetChart = (props) => {

  const daysList = [];
  const beforeDaysList = [];
  const afterDaysList = [];
  let maxDayValue = 0;

  for (let i = 0; i < daysInMonth(props.currentDate.month, props.currentDate.year); i++) {
    const count = props.worksList.slice().filter((item) => item.date.day === i + 1 && item.date.month === props.currentDate.month && item.date.year === props.currentDate.year).length;
    if (maxDayValue < count) {
      maxDayValue = count;
    }
    daysList.push({
      day: i + 1,
      count: count,
    });
  }

  for (let i = 0; i < daysInMonth(props.currentDate.month - 1, props.currentDate.year); i++) {
    const count = props.worksList.slice().filter((item) => item.date.day === i + 1 && item.date.month === props.currentDate.month && item.date.year === props.currentDate.year).length;
    if (maxDayValue < count) {
      maxDayValue = count;
    }
    beforeDaysList.push({
      day: i + 1,
      count: count,
    });
  }

  for (let i = 0; i < 4; i++) {
    const count = props.worksList.slice().filter((item) => item.date.day === i + 1 && item.date.month === props.currentDate.month && item.date.year === props.currentDate.year).length;
    if (maxDayValue < count) {
      maxDayValue = count;
    }
    afterDaysList.push({
      day: i + 1,
      count: count,
    });
  }

  const chartItems = daysList.map((item) => {
    return (
      <CalendarWidgetChartItem
        key={item.day}
        {...item}
        maxDayValue={maxDayValue}
        currentDate={props.currentDate}
        onChartItemClick={props.onChartItemClick}
      />
    )
  });

  const chartItemsBefore = beforeDaysList.slice(beforeDaysList.length - 4).map((item) => {
    return (
      <CalendarWidgetChartItemSide
        key={item.day}
        {...item}
        maxDayValue={maxDayValue}
        currentDate={props.currentDate}
      />
    )
  });

  const chartItemsAfter = afterDaysList.map((item) => {
    return (
      <CalendarWidgetChartItemSide
        key={item.day}
        {...item}
        maxDayValue={maxDayValue}
        currentDate={props.currentDate}
      />
    )
  });

  return (
    <div className="calendar-widget-chart">
      {chartItemsBefore}
      {chartItems}
      {chartItemsAfter}
    </div>
  );
};

export default CalendarWidgetChart;
