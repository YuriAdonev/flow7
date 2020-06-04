import React, { useState } from 'react';

import PageFilter from '../../../components/filter/page-filter/page-filter';
import SubdivisionsTable from './subdivisions-table/subdivisions-table';
import Layout from '../../../components/layout/layout';

const SubdivisionsPage = () => {
  const [pageSearch, setPageSearch] = useState('');
  const [filters, setFilters] = useState([]);

  const headerData = {
    title: 'Подразделения',
    breadcrumbsList: [
      {
        name: 'Организация',
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
        <SubdivisionsTable
          pageSearch={pageSearch}
        />
      </div>
    </Layout>
  );
};

export default SubdivisionsPage;
