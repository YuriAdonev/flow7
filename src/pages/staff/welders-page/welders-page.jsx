import React, { useState } from 'react';

import Header from '../../../components/header/header';
import PageFilter from '../../../components/filter/page-filter/page-filter';
import WeldersTable from './welders-table/welders-table';
import Layout from "../../../components/layout/layout";

const WeldersPage = () => {
  const [pageSearch, setPageSearch] = useState('');
  const [filters, setFilters] = useState([]);

  const headerData = {
    title: 'Сварщики',
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

  const pageFiltersData = {
    search: {
      placeholder: 'ФИО',
      action: ''
    },
    defaultFiltersCount: 3,
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
        <WeldersTable
          pageSearch={pageSearch}
        />
      </div>
    </Layout>
  );
};

export default WeldersPage;
