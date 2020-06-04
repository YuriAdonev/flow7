import React from 'react';

import './work-day-nav.scss';

import { getMonthNameInline } from '../../../../../utils';

const WorkDayNav = (props) => {

  return (
    <div className="work-day-nav">
      <div className="work-day-nav__prev">
        <button className="work-day-nav__btn btn" type="button">
          <svg width="6" height="10" viewBox="0 0 6 10" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.56641 1.55469L2.12109 5L5.56641 8.44531L4.51172 9.5L0.0117188 5L4.51172 0.5L5.56641 1.55469Z"/>
          </svg>
        </button>
        <span></span>
      </div>
      <div className="work-day-nav__current">{`${props.currentDate.day} ${getMonthNameInline(props.currentDate.month - 1)}`}</div>
      <div className="work-day-nav__next">
        <button className="work-day-nav__btn btn" type="button">
          <svg width="6" height="10" viewBox="0 0 6 10" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.48828 0.5L5.98828 5L1.48828 9.5L0.433594 8.44531L3.87891 5L0.433594 1.55469L1.48828 0.5Z"/>
          </svg>
        </button>
        <span></span>
      </div>
    </div>
  );
};

export default WorkDayNav;
