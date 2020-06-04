import React, { Component } from 'react';

import './welders-table.scss';

import Table from '../../../../components/table/table/table';

class WeldersTable extends Component {
  state = {
    currentDate: {
      day: '',
      month: '',
      year: ''
    },
    filters: [],
    columns: [],
    headDropActive: false,
    dropActive: '',
  };

  tableStructure = {
    tableClass: 'welders-table',
    colsList: [
      {
        name: 'name',
        colClass: 'name',
        header: 'Фамилия имя отчество',
        isActive: true,
      },
      {
        name: 'birthDay',
        colClass: 'birthday',
        header: 'Дата рождения',
        isActive: true,
      },
      {
        name: 'stamp',
        colClass: 'stamp',
        header: 'Клеймо',
        isActive: true,
      },
      {
        name: 'subdivision',
        colClass: 'subdivision',
        header: 'Подразделение',
        isActive: true,
      },
      {
        name: 'brigade',
        colClass: 'brigade',
        header: 'Бригада',
        isActive: true,
      },
      {
        name: 'cardNumber',
        colClass: 'card-number',
        header: 'Номер карты',
        isActive: true,
      },
      {
        name: 'status',
        colClass: 'status',
        header: 'Статус',
        isActive: true,
      },
    ]
  };

  weldersList = [
    {
      name: 'Айтбаев Дуйсенбек',
      birthDay: '29.05.1978',
      stamp: '8ES2',
      subdivision: 'СМУ-1',
      brigade: 'Пеккель В.А.',
      cardNumber: '199,2221',
      status: 'В работе'
    },
    {
      name: 'Айтбаев Дуйсенбек',
      birthDay: '29.05.1978',
      stamp: '8ES2',
      subdivision: 'СМУ-1',
      brigade: 'Пеккель В.А.',
      cardNumber: '199,2221',
      status: 'В работе'
    },
    {
      name: 'Айтбаев Дуйсенбек',
      birthDay: '29.05.1978',
      stamp: '8ES2',
      subdivision: 'СМУ-1',
      brigade: 'Пеккель В.А.',
      cardNumber: '199,2221',
      status: 'В работе'
    },
  ];

  componentDidMount() {
    const columns = [];
    this.tableStructure.colsList.map((item) => {
      item.isActive && columns.push(item.name);
    });
    this.setState({columns: columns})
  };

  changeDropActive = (index) => {
    this.setState({dropActive: index, headDropActive: false})
  };

  clearDropActive = () => {
    this.setState({dropActive: '', headDropActive: false})
  };

  changeHeadDropActive = () => {
    this.setState({dropActive: '', headDropActive: true})
  };

  render() {
    return (
      <Table
        tableStructure={this.tableStructure}
        columns={this.state.columns}
        dropActive={this.state.dropActive}
        headDropActive={this.state.headDropActive}
        tableData={this.weldersList}
        clearDropActive={this.clearDropActive}
        changeDropActive={this.changeDropActive}
        changeHeadDropActive={this.changeHeadDropActive}
      />
    );
  }
}

export default WeldersTable;
