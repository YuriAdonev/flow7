import React, {Component} from 'react';

import './work-calendar-add.scss';

import Header from '../../../../components/header/header';
import WorkCalendarAddFirst from '../work-calendar-add-first/work-calendar-add-first';
import WorkCalendarAddSecond from '../work-calendar-add-second/work-calendar-add-second';

class WorkCalendarAdd extends Component {
  state = {
    data: '',
    currentTab: 'info'
  };

  headerData = {
    title: 'Добавление работ',
    breadcrumbsList: [
      {
        name: 'Организация',
        link: '/'
      },
    ],
    buttonsList: [
      {
        text: 'Создать',
        action: () => {}
      }
    ],
  };

  onNextClick = () => {
    this.setState({currentTab: 'desc'})
  };

  render() {
    return (
      <div className={`work-calendar-add${this.props.addItemFormActive ? ' showed' : ''}`}>
        <div className="work-calendar-add__wrap">
          <div
            className="work-calendar-add__close"
            onClick={() => this.props.onCloseAddClick()}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.4023 1.88672L8.28906 7L13.4023 12.1133L12.1133 13.4023L7 8.28906L1.88672 13.4023L0.597656 12.1133L5.71094 7L0.597656 1.88672L1.88672 0.597656L7 5.71094L12.1133 0.597656L13.4023 1.88672Z"/>
            </svg>
          </div>
          <Header
            headerData={this.headerData}
          />
          <div className="work-calendar-add-tabs">
            <div
              className={`work-calendar-add-tabs__item${this.state.currentTab === 'info' ? ' active' : ''}`}
              onClick={() => this.setState({currentTab: 'info'})}
            >Общая информация</div>
            <div
              className={`work-calendar-add-tabs__item${this.state.currentTab === 'desc' ? ' active' : ''}`}
              onClick={() => this.setState({currentTab: 'desc'})}
            >Описание работ</div>
          </div>
          <div className="work-calendar-add-content">
            {this.state.currentTab === 'info' ? (
              <WorkCalendarAddFirst
                onNextClick={this.onNextClick}
              />
            ) : ''}
            {this.state.currentTab === 'desc' ? (
              <WorkCalendarAddSecond />
            ) : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default WorkCalendarAdd;
