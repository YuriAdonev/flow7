import React from 'react';

import Layout from '../../../components/layout/layout';

const AccountSessionsPage = () => {
  const headerData = {
    title: 'Сессии',
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

export default AccountSessionsPage;
