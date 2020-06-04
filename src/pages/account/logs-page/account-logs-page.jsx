import React from 'react';

import Layout from '../../../components/layout/layout';

const AccountLogsPage = () => {
  const headerData = {
    title: 'Журнал',
    breadcrumbsList: [
      {
        name: 'Основная информация',
        link: '/'
      },
    ],
  };

  return (
    <Layout
      headerData={headerData}
    >
      <div className="content">

      </div>
    </Layout>
  );
};

export default AccountLogsPage;
