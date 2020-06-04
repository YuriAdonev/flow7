import React, { useState, useRef } from 'react';
import { i18n, DateRangePicker } from 'element-react';

import './device-details-data.scss';

import DeviceCalendar from "../../../../components/device-calendar/device-calendar";
import locale from 'element-react/src/locale/lang/ru-RU';
locale.el.datepicker.today = new Date().getDate() + '';
i18n.use(locale);

const DeviceDetailsData = ({ currentItem }) => {
  const [filteredDate, setFilteredDate] = useState([Date.now()]);
  const dateRangePickerRef = useRef(null);

  const onDateChoice = (dateRange) => {
    if (dateRange === null) {
      return;
    }
    setFilteredDate(dateRange);
  };

  return (
    <div className="device-details-data">
      <div className="device-details-data__header">
        <div className="device-details-data__status">Состояние устройства: <span className={currentItem.attributes.online ? 'online' : 'offline'}>{currentItem.attributes.online ? 'Включено' : 'Выключено'}</span></div>
        <div className="device-details-data__datepicker">
          <DateRangePicker
            ref={dateRangePickerRef}
            onChange={onDateChoice}
            format="dd.MM.yyyy"
            placeholder="Выберите даты"
            value={filteredDate}
            shortcuts={[{
              text: '7 дней',
              onClick: ()=> {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);

                setFilteredDate([start, end]);
                dateRangePickerRef.current.togglePickerVisible();
              }
            }, {
              text: '1 месяц',
              onClick: ()=> {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);

                setFilteredDate([start, end]);
                dateRangePickerRef.current.togglePickerVisible();
              }
            }, {
              text: '3 месяца',
              onClick: ()=> {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);

                setFilteredDate([start, end]);
                dateRangePickerRef.current.togglePickerVisible();
              }
            }]}
          />
        </div>
      </div>
      <div className="device-details-data__calendar">
        <DeviceCalendar/>
      </div>
      <div className="device-details-data__work work-info">
        <div className="work-info__col">
          <div className="work-info__title inner-title">Общие данные о работе устройства с 30.12.2019</div>
          <div className="work-info__desc inner-desc">Данные о работе предстваляются с момента подключения оборудования.</div>
          <div className="work-info__list">
            <div className="work-info-item">
              <div className="work-info-item__value">123:45:45</div>
              <div className="work-info-item__desc">Время работы</div>
            </div>
            <div className="work-info-item">
              <div className="work-info-item__value">271:15:15</div>
              <div className="work-info-item__desc">Время простоя</div>
            </div>
          </div>
        </div>
        <div className="work-info__col">
          <div className="work-info__title inner-title">Данные за выбранный период</div>
          <div className="work-info__desc inner-desc">Данные о работе с 20.01.2020 по 23.01.2020</div>
          <div className="work-info__list">
            <div className="work-info-item">
              <div className="work-info-item__value">00:00:00</div>
              <div className="work-info-item__desc">Время работы</div>
            </div>
            <div className="work-info-item">
              <div className="work-info-item__value">72:00:00</div>
              <div className="work-info-item__desc">Время простоя</div>
            </div>
          </div>
        </div>
      </div>
      <div className="device-details-data-chart">
        <div className="device-details-data-chart__title inner-title">График работы устройства</div>
        <div className="device-details-data-chart__desc inner-desc">Динамика работы и простоя устройства за 29 октября</div>
      </div>
    </div>
  )
};

export default DeviceDetailsData;
