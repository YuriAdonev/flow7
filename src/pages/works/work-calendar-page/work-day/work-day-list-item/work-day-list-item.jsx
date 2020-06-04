import React from 'react';

import './work-day-list-item.scss';

const WorkDayListItem = (props) => {

  return (
    <li className="work-day-content-col-item">
      <div className="work-day-content-col-item__number">УП #{props.number}</div>
      <div className="work-day-content-col-item__row">
        <div className="work-day-content-col-item__label">Тип работ:</div>
        <div className="work-day-content-col-item__value">{props.typeWorks}</div>
      </div>
      <div className="work-day-content-col-item__row">
        <div className="work-day-content-col-item__label">Подразделение:</div>
        <div className="work-day-content-col-item__value">{props.subdivision}</div>
      </div>
      <div className="work-day-content-col-item__row">
        <div className="work-day-content-col-item__label">Смена:</div>
        <div className="work-day-content-col-item__value">{props.workShift}</div>
      </div>
      {props.isConfirmed ? (
        <div className="work-day-content-col-item__confirmed">ПОДТВЕРЖДЕНО | {props.isFault ? (<span className="red">Есть нарушения</span>) : (<span>Нет нарушений</span>)}</div>
      ) : ''}
    </li>
  );
};

export default WorkDayListItem;
