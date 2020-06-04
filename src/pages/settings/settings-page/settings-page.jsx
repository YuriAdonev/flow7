import React from 'react';

import Layout from '../../../components/layout/layout';

const SettingsPage = () => {
  const headerData = {
    title: 'Настройки организации'
  };

  return (
    <Layout
      headerData={headerData}
    >
      <div className="content">
        Настройки организации
      </div>
    </Layout>
  );
};

export default SettingsPage;
