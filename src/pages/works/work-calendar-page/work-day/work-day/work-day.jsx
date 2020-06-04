import React, { Component } from 'react';

import './work-day.scss';

import WorkDayCol from '../work-day-col/work-day-col';
import WorkDayNav from '../work-day-nav/work-day-nav';

class WorkDay extends Component {
  state = {
    currentDropOpened: ''
  };

  onDropClick = (title) => {
    this.setState({currentDropOpened: title})
  };

  onDropClose = () => {
    this.setState({currentDropOpened: ''})
  };

  render() {
    const notConfirmedList = this.props.homeWorksList.slice().filter((item) => !item.isConfirmed).sort(function (a, b) {
      return a.number - b.number;
    });
    const haveFaultList = this.props.homeWorksList.slice().filter((item) => item.isFault && item.isConfirmed).sort(function (a, b) {
      return a.number - b.number;
    });
    const completedList = this.props.homeWorksList.slice().filter((item) => item.isConfirmed).sort(function (a, b) {
      return a.number - b.number;
    });

    return (
      <div className="work-day">
        <WorkDayNav
          currentDate={this.props.currentDate}
        />
        <div className="work-day-content">
          <WorkDayCol
            title="На проверке"
            homeWorksList={notConfirmedList}
            onAddClick={this.props.onAddClick}
            onDropClick={this.onDropClick}
            onDropClose={this.onDropClose}
            currentDropOpened={this.state.currentDropOpened}
          />
          <WorkDayCol
            title="Нарушения"
            homeWorksList={haveFaultList}
            onAddClick={this.props.onAddClick}
            onDropClick={this.onDropClick}
            onDropClose={this.onDropClose}
            currentDropOpened={this.state.currentDropOpened}
          />
          <WorkDayCol
            title="Выполнено"
            homeWorksList={completedList}
            onAddClick={this.props.onAddClick}
            onDropClick={this.onDropClick}
            onDropClose={this.onDropClose}
            currentDropOpened={this.state.currentDropOpened}
          />
        </div>
      </div>
    );
  }
};

export default WorkDay;
