import React, {Component} from 'react';

import Header from '../../../components/header/header';
import PageFilter from '../../../components/filter/page-filter/page-filter';
import MaterialAccountingTable from './material-accounting-table/material-accounting-table';

class MaterialAccountingPage extends Component {
  state = {
    filters: [],
  };

  headerData = {
    title: 'Учет материалов',
    breadcrumbsList: [
      {
        name: 'Оборудование и материалы',
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

  pageFiltersData = {
    search: {
      placeholder: 'Поиск по названию',
      action: ''
    },
    defaultFiltersCount: 3,
    filtersList: [
      {
        name: 'Производитель',
        category: 'manufacturers',
        list: ['СМУ-1', 'СМУ-2', 'СМУ-3', 'СМУ-4']
      },
    ],
    calendarShow: false,
  };

  componentDidMount() {
    this.props.onPageChange('material-accounting');
  }

  setFilters = (filters) => {
    this.setState({filters: filters})
  };

  render() {
    return (
      <main className={`main main--wide${this.props.modalOpened ? ' no-scroll' : ''}`}>
        <div className="main__wrap">
          <Header
            headerData={this.headerData}
          />
          <PageFilter
            filters={this.state.filters}
            pageFilters={this.pageFiltersData}
            setFilters={this.setFilters}
          />
          <div className="content">
            <MaterialAccountingTable

            />
          </div>
        </div>
      </main>
    );
  }
}

export default MaterialAccountingPage;
