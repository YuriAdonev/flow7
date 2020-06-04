import React, { Component } from 'react';
// import DatePicker from "react-datepicker";
import { DateInput } from "@blueprintjs/datetime";
import { LocaleUtils } from "react-day-picker";

import 'react-datepicker/dist/react-datepicker.css';
import './page-filter-date.scss';

class PageFilterDate extends Component {
  state = {
    startDate: new Date().setFullYear(this.props.currentDate.year, this.props.currentDate.month - 1, this.props.currentDate.day)
  };

  handleDateChange = date => {
    this.setState({
      startDate: date
    });
    this.props.onDateChoice(date);
  };

  render() {
    const WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const MONTHS = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];
    const WEEKDAYS_LONG = [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ];

    return (
      <div className="page-filter-date">
        <div className="page-filter-date__btn">
          <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.23828 7.48828H7V11.25H3.23828V7.48828ZM12.2383 14.2383V6.01172H1.76172V14.2383H12.2383ZM12.2383 2.25C12.6367 2.25 12.9883 2.40234 13.293 2.70703C13.5977 3.01172 13.75 3.36328 13.75 3.76172V14.2383C13.75 14.6367 13.5977 14.9883 13.293 15.293C12.9883 15.5977 12.6367 15.75 12.2383 15.75H1.76172C1.33984 15.75 0.976562 15.5977 0.671875 15.293C0.390625 14.9883 0.25 14.6367 0.25 14.2383V3.76172C0.25 3.36328 0.390625 3.01172 0.671875 2.70703C0.976562 2.40234 1.33984 2.25 1.76172 2.25H2.5V0.738281H4.01172V2.25H9.98828V0.738281H11.5V2.25H12.2383Z"/>
          </svg>
        </div>
        <DateInput
          formatDate={date => date.toLocaleString()}
          onChange={this.handleDateChange}
          parseDate={str => new Date(str)}
          placeholder={"M/D/YYYY"}
          defaultValue={new Date()}
          locale="ru"
          LocaleUtils={LocaleUtils}
          months={MONTHS}
          weekdaysLong={WEEKDAYS_LONG}
          weekdaysShort={WEEKDAYS_SHORT}
          firstDayOfWeek={1}
        />
        {/*<DatePicker*/}
        {/*  dateFormat="dd/MM/yyyy"*/}
        {/*  selected={new Date().setFullYear(this.props.currentDate.year, this.props.currentDate.month - 1, this.props.currentDate.day)}*/}
        {/*  onChange={this.handleChange}*/}
        {/*/>*/}
      </div>
    );
  }
}

export default PageFilterDate;
