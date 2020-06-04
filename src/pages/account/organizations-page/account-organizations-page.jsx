import React, { useState, useEffect } from 'react';

import './account-organizations-page.scss';

import Layout from '../../../components/layout/layout';
import Table from '../../../components/table/table/table';
import useFetch from '../../../hooks/use-fetch';
import AccountOrganizationsEdit from './account-organizations-edit/account-organizations-edit';
import AccountOrganizationsTable from "./account-organizations-table/account-organizations-table";

const AccountOrganizationsPage = () => {
  const [tableData, setTableData] = useState([]);
  const [itemId, setItemId] = useState('new');
  const [showModal, setShowModal] = useState(false);
  const [sortedBy, setSortedBy] = useState('name');
  const [sortedDown, setSortedDown] = useState(true);

  const [{response, isLoading, error}, doFetchTableData] = useFetch('/users/sites', true);
  const [{response: itemDeleteResponse, isLoading: itemDeleteIsLoading, error: itemDeleteError}, doFetchItemDelete] = useFetch(`/users/sites/${itemId}`, true);

  useEffect(() => {
    doFetchTableData();
  }, [itemDeleteResponse]);

  useEffect(() => {
    if (!response) {
      return
    }
    setTableData(response.data);
  }, [response]);

  const headerData = {
    title: 'Мои организации',
    breadcrumbsList: [
      {
        name: 'Основная информация',
        link: '/'
      },
    ],
    buttonsList: [
      {
        text: 'Добавить',
        action: () => onAddClick()
      }
    ],
  };

  const onSortClick = (name) => {
    if (name === sortedBy) {
      setSortedDown(!sortedDown);
    }
    if (name !== sortedBy) {
      setSortedBy(name);
      setSortedDown(true);
    }
  };

  const onAddClick = () => {
    // setOrganizationItem({
    //   id: 'new',
    //   attributes: {
    //     name: '',
    //     subdomain: '',
    //     timezone: ''
    //   }
    // });
    setItemId('new');
    setShowModal(true);
  };

  const onShowEdit = (id) => {
    setItemId(id);
    setShowModal(true);
  };

  const onItemDelete = (id) => {

  };

  const onClose = () => {
    setItemId('new');
    setShowModal(false);
    reloadTable();
  };

  const reloadTable = () => {
    doFetchTableData();
  };

  return (
    <Layout
      headerData={headerData}
      isWide={true}
    >
      <div className="content">
        <AccountOrganizationsTable
          sortedBy={sortedBy}
          sortedDown={sortedDown}
          onSortClick={onSortClick}
          tableData={tableData}
          onItemEdit={onShowEdit}
          onItemDelete={onItemDelete}
          isLoading={isLoading}
          error={error}
        />
      </div>
      {showModal && (
        <AccountOrganizationsEdit
          itemId={itemId}
          onClose={onClose}
          reloadTable={reloadTable}
        />
      )}
    </Layout>
  );
};

export default AccountOrganizationsPage;
