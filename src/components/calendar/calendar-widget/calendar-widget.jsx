import React, { Component } from 'react';

import './calendar-widget.scss';

import CalendarWidgetHeader from '../calendar-widget-header/calendar-widget-header';
import CalendarWidgetChart from '../calendar-widget-chart/calendar-widget-chart';
import CalendarWidgetLegend from '../calendar-widget-legend/calendar-widget-legend';

class CalendarWidget extends Component {

  render() {
    return (
      <div className="calendar-widget">
        <div className="calendar-widget__wrap">
          <CalendarWidgetHeader
            onMonthDecrement={this.props.onMonthDecrement}
            onMonthIncrement={this.props.onMonthIncrement}
            currentDate={this.props.currentDate}
          />
          <CalendarWidgetChart
            onChartItemClick={this.props.onChartItemClick}
            worksList={this.props.worksList}
            currentDate={this.props.currentDate}
          />
          <CalendarWidgetLegend />
        </div>
      </div>
    );
  }
}

export default CalendarWidget;
