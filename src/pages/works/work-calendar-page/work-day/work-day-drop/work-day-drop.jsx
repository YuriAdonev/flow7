import React, { Component } from 'react';

import './work-day-drop.scss';

class WorkDayDrop extends Component {

  render() {
    return (
      <div className={`work-day-content-drop${this.props.currentDropOpened === this.props.title ? ' active' : ''}`}>
        <button
          className="work-day-content-drop__btn"
          onClick={() => this.props.onDropClick(this.props.title)}
        >
          <svg width="14" height="4" viewBox="0 0 14 4" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.94531 0.945312C6.25 0.640625 6.60156 0.488281 7 0.488281C7.39844 0.488281 7.75 0.640625 8.05469 0.945312C8.35938 1.25 8.51172 1.60156 8.51172 2C8.51172 2.39844 8.35938 2.75 8.05469 3.05469C7.75 3.35938 7.39844 3.51172 7 3.51172C6.60156 3.51172 6.25 3.35938 5.94531 3.05469C5.64062 2.75 5.48828 2.39844 5.48828 2C5.48828 1.60156 5.64062 1.25 5.94531 0.945312ZM10.4453 0.945312C10.75 0.640625 11.1016 0.488281 11.5 0.488281C11.8984 0.488281 12.25 0.640625 12.5547 0.945312C12.8594 1.25 13.0117 1.60156 13.0117 2C13.0117 2.39844 12.8594 2.75 12.5547 3.05469C12.25 3.35938 11.8984 3.51172 11.5 3.51172C11.1016 3.51172 10.75 3.35938 10.4453 3.05469C10.1406 2.75 9.98828 2.39844 9.98828 2C9.98828 1.60156 10.1406 1.25 10.4453 0.945312ZM1.44531 0.945312C1.75 0.640625 2.10156 0.488281 2.5 0.488281C2.89844 0.488281 3.25 0.640625 3.55469 0.945312C3.85938 1.25 4.01172 1.60156 4.01172 2C4.01172 2.39844 3.85938 2.75 3.55469 3.05469C3.25 3.35938 2.89844 3.51172 2.5 3.51172C2.10156 3.51172 1.75 3.35938 1.44531 3.05469C1.14062 2.75 0.988281 2.39844 0.988281 2C0.988281 1.60156 1.14062 1.25 1.44531 0.945312Z"/>
          </svg>
        </button>
        <div className={`work-day-content-drop-menu`}>
          <div className="work-day-content-drop-menu__head">
            <div className="work-day-content-drop-menu__title">Действия со списком</div>
            <div
              className="work-day-content-drop-menu__close"
              onClick={() => this.props.onDropClose()}
            >
              <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.86523 1.01367L5.37891 4.5L8.86523 7.98633L7.98633 8.86523L4.5 5.37891L1.01367 8.86523L0.134766 7.98633L3.62109 4.5L0.134766 1.01367L1.01367 0.134766L4.5 3.62109L7.98633 0.134766L8.86523 1.01367Z"/>
              </svg>
            </div>
          </div>
          <ul className="work-day-content-drop-menu-list">
            <li className="work-day-content-drop-menu-list__item">Добавить работу...</li>
            <li className="work-day-content-drop-menu-list__item">Сортировать по...</li>
          </ul>
          <ul className="work-day-content-drop-menu-filters">
            <li className="work-day-content-drop-menu-filters__item">Фильтровать по типу смены</li>
            <li className="work-day-content-drop-menu-filters__item">Фильтровать по сварщикам</li>
            <li className="work-day-content-drop-menu-filters__item">Фильтровать по видам работ</li>
            <li className="work-day-content-drop-menu-filters__item">Фильтровать по объектам</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default WorkDayDrop;
