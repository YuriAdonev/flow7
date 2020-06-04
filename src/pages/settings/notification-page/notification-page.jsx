import React from 'react';

import Layout from '../../../components/layout/layout';

const SettingsNotificationPage = () => {
  const headerData = {
    title: 'Настройка оповещений',
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
        Настройка оповещений
      </div>
    </Layout>
  );
};

export default SettingsNotificationPage;
