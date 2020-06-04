import React, { Component } from 'react';

import './experience-table.scss';

import Table from "../../../../components/table/table/table";
import { isAuthenticated } from "../../../../auth";

class ExperienceTable extends Component {
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
    tableData: [],
  };

  tableStructure = {
    tableClass: 'experience-table',
    colsList: [
      {
        name: 'model',
        colClass: 'model',
        header: 'Модель',
        isActive: true,
      },
      {
        name: 'manufacturers',
        colClass: 'manufacturers',
        header: 'Производитель',
        isActive: true,
      },
      {
        name: 'experienceType',
        colClass: 'experience-type',
        header: 'Вид испытания',
        isActive: true,
      },
    ]
  };

  componentDidMount() {
    const columns = [];
    this.tableStructure.colsList.map((item) => {
      item.isActive && columns.push(item.name);
    });
    // this.getTableData().then(tableData => {
    //   console.log(tableData);
    //   this.setState({tableData: tableData.data})
    // });
    this.setState({columns: columns});
  };

  getContent = async () => {
    return fetch(`https://staging.labsflow.ru/api/v1/sites/directories/material_types`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${isAuthenticated().token}`
      },
    }).then(res => res.json());
  };

  getTableData = () => {
    const data = this.getContent();
    return data;
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
        tableData={this.state.tableData}
        clearDropActive={this.clearDropActive}
        changeDropActive={this.changeDropActive}
        changeHeadDropActive={this.changeHeadDropActive}
      />
    );
  }
}

export default ExperienceTable;
