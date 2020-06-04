import React, { useState, useEffect } from 'react';

import './staff-edit-access.scss';

import StaffEditAccessForm from "./staff-edit-access-form/staff-edit-access-form";
import StaffEditAccessTable from "./staff-edit-access-table/staff-edit-access-table";
import useFetch from "../../../../../hooks/use-fetch";
import StaffTable from "../../staff-table/staff-table";

const emptyItem = {
  attributes: {
    at: new Date().toDateString(),
    status: null,
    access_token_id: ''
  }
};

const StaffEditAccess = ({ itemId }) => {
  const [currentItem, setCurrentItem] = useState(emptyItem);
  const [accessTableData, setAccessTableData] = useState([]);
  const [changeId, setChangeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortedBy, setSortedBy] = useState('at');
  const [sortedDown, setSortedDown] = useState(true);

  const [{response: accessTableDataResponse, isLoading: accessTableDataIsLoading, error: accessTableDataError}, doFetchAccessTableData] = useFetch(`/directories/personnels/${itemId}/access_tokens`);
  const [{response: saveResponse, isLoading: saveIsLoading, error: saveError}, doFetchItemSave] = useFetch(`/directories/personnels/${itemId}/access_tokens`);
  const [{response: updateResponse, isLoading: updateIsLoading, error: updateError}, doFetchItemUpdate] = useFetch(`/directories/personnels/${itemId}/access_tokens/${changeId}`);
  const [{response: deleteResponse, isLoading: deleteIsLoading, error: deleteError}, doFetchItemDelete] = useFetch(`/directories/personnels/${itemId}/access_tokens/${changeId}`);

  const statusList = [
    {id: 'issued', attributes: { name: 'Выдана'}},
    {id: 'take_away', attributes: { name: 'Изъята'}},
    {id: 'replaced', attributes: { name: 'Заменена'}},
  ];

  useEffect(() => {
    doFetchAccessTableData();
  }, []);

  useEffect(() => {
    if (!accessTableDataResponse) {
      return;
    }
    setAccessTableData(accessTableDataResponse.data);
    setLoading(false);
  }, [accessTableDataResponse]);

  useEffect(() => {
    if (saveResponse || updateResponse || deleteResponse) {
      setCurrentItem(emptyItem);
      setChangeId(null);
      doFetchAccessTableData();
      setLoading(false);
    }
  }, [saveResponse, saveIsLoading, updateResponse, updateIsLoading, deleteResponse, deleteIsLoading]);

  useEffect(() => {
    setLoading(false);
  }, [currentItem]);

  const onSortClick = (name) => {
    if (name === sortedBy) {
      setSortedDown(!sortedDown);
    }
    if (name !== sortedBy) {
      setSortedBy(name);
      setSortedDown(true);
    }
  };

  const onItemEdit = (id) => {
    setChangeId(id);
    setCurrentItem(accessTableData.find(it => it.id === id));
    setLoading(true);
  };

  const onItemSave = (item) => {
    setLoading(true);
    if (changeId === null) {
      doFetchItemSave({
        method: 'POST',
        data: item,
      });
    } else {
      doFetchItemUpdate({
        method: 'PUT',
        data: item,
      });
    }
  };

  const onItemDelete = (id) => {
    setChangeId(id);
    doFetchItemDelete({
      method: 'DELETE'
    });
  };

  return loading ? '' : (
    <div className="staff-edit">
      <StaffEditAccessForm
        currentItem={currentItem}
        statusList={statusList}
        onItemSave={onItemSave}
      />
      <StaffEditAccessTable
        sortedBy={sortedBy}
        sortedDown={sortedDown}
        onSortClick={onSortClick}
        tableData={accessTableData}
        statusList={statusList}
        onItemEdit={onItemEdit}
        onItemDelete={onItemDelete}
        isLoading={accessTableDataIsLoading}
        error={accessTableDataError}
      />
    </div>
  )
};

export default StaffEditAccess;
