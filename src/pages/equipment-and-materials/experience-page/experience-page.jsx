import React, {Component} from 'react';

import Header from '../../../components/header/header';
import PageFilter from '../../../components/filter/page-filter/page-filter';
import ExperienceTable from './experience-table/experience-table';

class ExperiencePage extends Component {
  state = {
    filters: [],
  };

  headerData = {
    title: 'Испытания',
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
        name: 'Тип оборудования',
        category: 'equipmentType',
        list: ['СМУ-1', 'СМУ-2', 'СМУ-3', 'СМУ-4']
      },
      {
        name: 'Тип материалов',
        category: 'materialType',
        list: ['Неповоротная сварка труб', 'Поворотная сварка труб']
      },
    ],
    calendarShow: false,
  };

  componentDidMount() {
    this.props.onPageChange('experience');
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
            <ExperienceTable

            />
          </div>
        </div>
      </main>
    );
  }
}

export default ExperiencePage;
