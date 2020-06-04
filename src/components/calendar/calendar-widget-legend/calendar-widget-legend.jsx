import React from 'react';

import './calendar-widget-legend.scss';

const CalendarWidgetLegend = () => {

  return (
    <div className="calendar-widget-legend">
      <div className="calendar-widget-legend-item">
        <div className="calendar-widget-legend-item__desc">Более 1 проводимых работ</div>
      </div>
      <div className="calendar-widget-legend-item">
        <div className="calendar-widget-legend-item__desc">Более 5 проводимых работ</div>
      </div>
      <div className="calendar-widget-legend-item">
        <div className="calendar-widget-legend-item__desc">Более 10 проводимых работ</div>
      </div>
      <div className="calendar-widget-legend-item">
        <div className="calendar-widget-legend-item__desc">Более 20 проводимых работ</div>
      </div>
      <div className="calendar-widget-legend-item">
        <div className="calendar-widget-legend-item__desc">Текущая / выбранная дата</div>
      </div>
    </div>
  );
};

export default CalendarWidgetLegend;
