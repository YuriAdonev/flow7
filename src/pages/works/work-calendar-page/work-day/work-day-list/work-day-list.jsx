import React from 'react';

import './work-day-list.scss';

import WorkDayListItem from "../work-day-list-item/work-day-list-item";

const WorkDayList = (props) => {
  const items = props.homeWorksList.map((item) => {
    return (
      <WorkDayListItem
        key={item.id}
        {...item}
      />
    );
  });

  return (
    <ul className="work-day-content-col__list">
      {items}
    </ul>
  );
};

export default WorkDayList;
