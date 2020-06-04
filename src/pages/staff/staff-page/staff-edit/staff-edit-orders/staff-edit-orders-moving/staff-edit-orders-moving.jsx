import React, { useEffect, useState } from 'react';

import useFetch from "../../../../../../hooks/use-fetch";
import StaffEditOrdersMovingTable from "../staff-edit-orders-moving-table/staff-edit-orders-moving-table";
import StaffEditOrdersMovingForm from "../staff-edit-orders-moving-form/staff-edit-orders-moving-form";
import StaffEditAccessTable from "../../staff-edit-access/staff-edit-access-table/staff-edit-access-table";

const emptyItem = {
  attributes: {
    at: new Date().toDateString(),
    leader: null,
    division_name: '',
    post_name: '',
    status: null,
    attachment: {},
    order_number: null
  }
};

const StaffEditOrdersMoving = ({ divisionsList, postsList, itemId }) => {
  const [currentItem, setCurrentItem] = useState(emptyItem);
  const [loading, setLoading] = useState(true);
  const [changeId, setChangeId] = useState(null);
  const [movingTableData, setMovingTableData] = useState([]);
  const [sortedBy, setSortedBy] = useState('at');
  const [sortedDown, setSortedDown] = useState(true);

  const [{response: movingTableDataResponse, isLoading: movingTableDataIsLoading, error: movingTableDataError}, doFetchMovingTableData] = useFetch(`/directories/personnels/${itemId}/changes`);
  const [{response: saveResponse, isLoading: saveIsLoading, error: saveError}, doFetchItemSave] = useFetch(`/directories/personnels/${itemId}/changes`);
  const [{response: updateResponse, isLoading: updateIsLoading, error: updateError}, doFetchItemUpdate] = useFetch(`/directories/personnels/${itemId}/changes/${changeId}`);
  const [{response: deleteResponse, isLoading: deleteIsLoading, error: deleteError}, doFetchItemDelete] = useFetch(`/directories/personnels/${itemId}/changes/${changeId}`);

  const statusList = [
    {id: 'accepted', attributes: { name: 'Принят'}},
    {id: 'fired', attributes: { name: 'Уволен'}},
    {id: 'transferred', attributes: { name: 'Переведен'}},
    {id: 'vacation', attributes: { name: 'Отпуск'}},
  ];

  useEffect(() => {
    doFetchMovingTableData();
  }, []);

  useEffect(() => {
    if (!movingTableDataResponse) {
      return;
    }
    setMovingTableData(movingTableDataResponse.data);
    setLoading(false);
  }, [movingTableDataResponse]);

  useEffect(() => {
    if (saveResponse || updateResponse || deleteResponse) {
      setCurrentItem(emptyItem);
      setChangeId(null);
      doFetchMovingTableData();
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
    setCurrentItem(movingTableData.find(it => it.id === id));
    setLoading(true);
  };

  const onItemSave = (movingItem) => {
    if (changeId === null) {
      doFetchItemSave({
        method: 'POST',
        data: movingItem,
      });
    } else {
      doFetchItemUpdate({
        method: 'PUT',
        data: movingItem,
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
    <div className="staff-edit__appointment">
      <div className="staff-edit__title">Прием на работу / увольнение / перевод</div>
      {movingTableData.length !== 0 && (
        <StaffEditOrdersMovingTable
          sortedBy={sortedBy}
          sortedDown={sortedDown}
          onSortClick={onSortClick}
          tableData={movingTableData}
          statusList={statusList}
          isLoading={false}
          error={false}
          onItemEdit={onItemEdit}
          onItemDelete={onItemDelete}
        />
      )}
      <div className="staff-edit__subtitle">Добавление новой записи в группу: Прием на работу / Увольнение / Перевод</div>
      <StaffEditOrdersMovingForm
        divisionsList={divisionsList}
        postsList={postsList}
        currentItem={currentItem}
        statusList={statusList}
        onItemSave={onItemSave}
      />
    </div>
  )
};

export default StaffEditOrdersMoving;
