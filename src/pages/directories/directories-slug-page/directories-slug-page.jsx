import React, { useState, useEffect } from 'react';

import PageFilter from '../../../components/filter/page-filter/page-filter';
import Layout from '../../../components/layout/layout';
import useFetch from '../../../hooks/use-fetch';
import DirectoriesSlugTable from "./directories-slug-table/directories-slug-table";
import DirectoriesSlugTableHierarchic from "./directories-slug-table-hierarchic/directories-slug-table-hierarchic";

const DirectoriesSlugPage = (props) => {
  const [filters, setFilters] = useState([]);
  const [pageSearch, setPageSearch] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [hierarchic, setHierarchic] = useState(false);
  const [slug, setSlug] = useState(props.match.params.slug);

  const [{response, isLoading, error}, doFetchDirectories] = useFetch('/directories/directories');

  useEffect(() => {
    doFetchDirectories();
  }, []);

  useEffect(() => {
    if (!response) {
      return;
    }
    doFetchDirectories();
    setSlug(props.match.params.slug);
  }, [props.match.params.slug])

  useEffect(() => {
    if (!response) {
      return;
    }
    setPageTitle(response.data.find(item => item.attributes.slug === slug).attributes.name);
    setHierarchic(response.data.find(item => item.attributes.slug === slug).attributes.hierarchic)
  }, [response]);

  const headerData = {
    title: pageTitle,
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
        {hierarchic ? (
          <DirectoriesSlugTableHierarchic
            pageSearch={pageSearch}
            slug={slug}
          />
        ) : (
          <DirectoriesSlugTable
            pageSearch={pageSearch}
            slug={slug}
          />
        )}
      </div>
    </Layout>
  );
};

export default DirectoriesSlugPage;
