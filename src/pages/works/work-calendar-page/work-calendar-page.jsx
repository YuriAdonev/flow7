import React, { Component } from 'react';

import Header from '../../../components/header/header';
import PageFilter from '../../../components/filter/page-filter/page-filter';
import CalendarWidget from '../../../components/calendar/calendar-widget/calendar-widget';
import WorkDay from './work-day/work-day/work-day';
import { generateHomeWorksList } from '../../../utils/data';
import WorkCalendarAdd from './work-calendar-add/work-calendar-add';

class WorkCalendarPage extends Component {
  state = {
    currentDate: {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    },
    homeWorksList: [],
    filters: [],
    filteredHomeWorksList: [],
    addItemFormActive: false,
  };

  headerData = {
    title: 'Календарь работ',
    breadcrumbsList: [
      {
        name: 'Организация',
        link: '/'
      },
    ],
    buttonsList: [
      {
        text: 'Создать',
        action: () => this.onAddClick()
      }
    ],
  };

  pageFiltersData = {
    search: {
      placeholder: 'ФИО',
      action: ''
    },
    defaultFiltersCount: 3,
    filtersList: [
      {
        name: 'Подразделение',
        category: 'subdivision',
        list: ['СМУ-1', 'СМУ-2', 'СМУ-3', 'СМУ-4']
      },
      {
        name: 'Тип работ',
        category: 'typeWorks',
        list: ['Неповоротная сварка труб', 'Поворотная сварка труб']
      },
      {
        name: 'Подразделение',
        category: 'subdivision',
        list: ['СМУ-1', 'СМУ-2', 'СМУ-3', 'СМУ-4']
      },
      {
        name: 'Тип работ',
        category: 'typeWorks',
        list: ['Неповоротная сварка труб', 'Поворотная сварка труб']
      },
      {
        name: 'Подразделение',
        category: 'subdivision',
        list: ['СМУ-1', 'СМУ-2', 'СМУ-3', 'СМУ-4']
      },
    ],
    calendarShow: true,
  };

  componentDidMount() {
    const date = new Date();
    const loadedWorksList = generateHomeWorksList(date.getFullYear(), date.getMonth() + 1, 1300);

    // this.props.onPageChange('work-calendar');
    this.setState(
      {
        currentDate: {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        },
        homeWorksList: loadedWorksList,
        filteredHomeWorksList: loadedWorksList
      });
  }

  setFilters = (filters) => {
    this.setState({filters: filters})
  };

  onAddClick = () => {
    this.setState({addItemFormActive: true});
    this.props.setModalOpened(true);
  };

  onCloseAddClick = () => {
    this.setState({addItemFormActive: false});
    this.props.setModalOpened(false);
  };

  onMonthDecrement = () => {
    if (this.state.currentDate.month === 1 ) {
      this.setState(
        {
          currentDate: {
            day: this.state.currentDate.day,
            month: 12,
            year: this.state.currentDate.year - 1,
          },
        });
    } else {
      this.setState(
        {
          currentDate:
            {
              day: this.state.currentDate.day,
              month: this.state.currentDate.month - 1,
              year: this.state.currentDate.year,
            }
        });
    }
    const loadedWorksList = generateHomeWorksList(this.state.currentDate.year, this.state.currentDate.month, 1300);
    this.setState({homeWorksList: loadedWorksList});
  };

  onMonthIncrement = () => {
    if (this.state.currentDate.month === 12 ) {
      this.setState(
        {
          currentDate: {
            day: this.state.currentDate.day,
            month: 1,
            year: this.state.currentDate.year + 1,
          }
        });
    } else {
      this.setState(
        {
          currentDate:
            {
              day: this.state.currentDate.day,
              month: this.state.currentDate.month + 1,
              year: this.state.currentDate.year,
            }
        });
    }
    const loadedWorksList = generateHomeWorksList(this.state.currentDate.year, this.state.currentDate.month, 1300);
    this.setState({homeWorksList: loadedWorksList});
  };

  onChartItemClick = (day) => {
    this.setState(
      {
        currentDate:
          {
            day: day,
            month: this.state.currentDate.month,
            year: this.state.currentDate.year,
          }
      });
  };

  onDateChoice = (date) => {
    this.setState(
      {
        currentDate: {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        },
      });
  };

  filteringWorkList = (workList, filterList) => {
    let currentWorkList = workList.slice();
    let newWorkList = [];

    if (filterList.length === 0) {
      return newWorkList = workList.slice();
    } else {
      const filterCategoryes = [];
      this.pageFiltersData.filtersList.map((item) => {
        if (filterCategoryes.findIndex(category => item.category === category) === -1) {
          filterCategoryes.push(item.category);
        }
      });
      filterCategoryes.map((categoryItem) => {
        const filterItems = filterList.slice().filter((item) => item.filterCategory === categoryItem);
        let tempWorkList = [];

        if (filterItems.length > 0) {
          filterItems.map((filterItem) => {
            tempWorkList = currentWorkList.slice().filter((item) => item[categoryItem] === filterItem.filter);
            newWorkList = tempWorkList.concat(newWorkList);
          });
          currentWorkList = newWorkList.slice();
          newWorkList = [];
        }
      });
    }
    return currentWorkList;
  };

  render() {
    const filteredHomeWorksList = this.filteringWorkList(this.state.homeWorksList, this.state.filters);
    const dayWorksList = filteredHomeWorksList.filter((item) => item.date.day === this.state.currentDate.day);

    return (
      <main className={`main${this.props.modalOpened ? ' no-scroll' : ''}`}>
        <div className="main__wrap">
          <Header
            headerData={this.headerData}
          />
          <PageFilter
            filters={this.state.filters}
            pageFilters={this.pageFiltersData}
            currentDate={this.state.currentDate}
            onDateChoice={this.onDateChoice}
            setFilters={this.setFilters}
          />
          <CalendarWidget
            onMonthDecrement={this.onMonthDecrement}
            onMonthIncrement={this.onMonthIncrement}
            onChartItemClick={this.onChartItemClick}
            currentDate={this.state.currentDate}
            worksList={this.state.homeWorksList}
          />
          <WorkDay
            currentDate={this.state.currentDate}
            homeWorksList={dayWorksList}
            onAddClick={this.onAddClick}
          />
          <WorkCalendarAdd
            addItemFormActive={this.state.addItemFormActive}
            onCloseAddClick={this.onCloseAddClick}
          />
        </div>
      </main>
    );
  }
}

export default WorkCalendarPage;
