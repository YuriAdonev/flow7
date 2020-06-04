import React from 'react';

import AccountProfile from './account-profile/account-profile/account-profile';
import Layout from '../../../components/layout/layout';

const AccountPage = () => {

  const headerData = {
    title: 'Профиль',
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
        <AccountProfile
        />
      </div>
    </Layout>
  );
};

export default AccountPage;
