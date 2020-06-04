import React from 'react';

import Layout from '../../../components/layout/layout';

const SettingsUsersPage = () => {
  const headerData = {
    title: 'Участники',
    breadcrumbsList: [
      {
        name: 'Настройки организации',
        link: '/'
      },
    ],
  };

  return (
    <Layout
      headerData={headerData}
    >
      <div className="content">
        Участники
      </div>
    </Layout>
  );
};

export default SettingsUsersPage;
