import React, { useState } from 'react';

import PageFilter from '../../../components/filter/page-filter/page-filter';
import WeldingMethodsTable from './welding-methods-table/welding-methods-table';
import Layout from '../../../components/layout/layout';

const WeldingMethodsPage = () => {
  const [pageSearch, setPageSearch] = useState('');
  const [filters, setFilters] = useState([]);

  const headerData = {
    title: 'Способы сварки',
    breadcrumbsList: [
      {
        name: 'Справочники',
        link: '/'
      },
    ],
  };

  const pageFiltersData = {
    search: {
      placeholder: 'Поиск по названию',
      action: ''
    },
    defaultFiltersCount: 3,
    filtersList: [],
    calendarShow: false,
  };

  return (
    <Layout
      headerData={headerData}
      isWide={true}
    >
      <PageFilter
        filters={filters}
        pageFilters={pageFiltersData}
        setFilters={setFilters}
        pageSearch={pageSearch}
        setPageSearch={setPageSearch}
      />
      <div className="content">
        <WeldingMethodsTable
          pageSearch={pageSearch}
        />
      </div>
    </Layout>
  );
};

export default WeldingMethodsPage;
