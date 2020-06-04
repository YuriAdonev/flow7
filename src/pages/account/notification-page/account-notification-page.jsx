import React from 'react';

import Layout from '../../../components/layout/layout';

const AccountNotificationPage = () => {
  const headerData = {
    title: 'Оповещения',
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

export default AccountNotificationPage;
