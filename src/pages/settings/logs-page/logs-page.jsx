import React from 'react';

import Layout from '../../../components/layout/layout';

const SettingsLogsPage = () => {
  const headerData = {
    title: 'Журнал',
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
        Журнал
      </div>
    </Layout>
  );
};

export default SettingsLogsPage;
