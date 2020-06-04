import React from 'react';

import Layout from '../../../components/layout/layout';

const SettingsWidgetsPage = () => {
  const headerData = {
    title: 'Виджеты',
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
        Виджеты
      </div>
    </Layout>
  );
};

export default SettingsWidgetsPage;
