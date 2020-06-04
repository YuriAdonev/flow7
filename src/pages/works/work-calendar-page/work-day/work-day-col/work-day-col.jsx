import React from 'react';

import './work-day-col.scss';

import WorkDayList from '../work-day-list/work-day-list';
import WorkDayDrop from '../work-day-drop/work-day-drop';

const WorkDayCol = (props) => {

  return (
    <div className="work-day-content-col">
      <div className="work-day-content-col__header">
        <div className="work-day-content-col__title">{props.title}</div>
        <WorkDayDrop
          onDropClick={props.onDropClick}
          onDropClose={props.onDropClose}
          title={props.title}
          currentDropOpened={props.currentDropOpened}
        />
      </div>
      <WorkDayList
        homeWorksList={props.homeWorksList}
      />
      <div className="work-day-content-col__footer">
        <div
          className="work-day-content-col__add"
          onClick={() => props.onAddClick()}
        >+ Добавить работы</div>
      </div>
    </div>
  );
};

export default WorkDayCol;
