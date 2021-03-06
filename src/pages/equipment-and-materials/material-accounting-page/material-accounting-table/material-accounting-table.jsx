import React, { Component } from 'react';

import './material-accounting-table.scss';

import Table from "../../../../components/table/table/table";
import { isAuthenticated } from "../../../../auth";

class MaterialAccountingTable extends Component {
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
    tableClass: 'material-accounting',
    colsList: [
      {
        name: 'factoryNumber',
        colClass: 'factory-number',
        header: 'Заводской номер',
        isActive: true,
      },
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
        name: 'materialType',
        colClass: 'material-type',
        header: 'Тип материала',
        isActive: true,
      },
      {
        name: 'quantity',
        colClass: 'quantity',
        header: 'Количество',
        isActive: true,
      },
      {
        name: 'validation',
        colClass: 'validation',
        header: 'Аттестация',
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

export default MaterialAccountingTable;
