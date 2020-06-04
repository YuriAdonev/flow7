import React, { useState, useEffect } from 'react';
import {DatePicker} from "element-react";

import './equipment-accounting-edit-moving.scss';

import AccountingSelectSearch from "../../../../../components/form/accounting-select-search/accounting-select-search";
import AccountingSelect from "../../../../../components/form/accounting-select/accounting-select";
import SubdivisionSelect from "../../../../../components/form/subdivision-select/subdivision-select";
import Spinner from "../../../../../components/spinner/spinner";
import useFetch from "../../../../../hooks/use-fetch";
import EquipmentAccountingEditMovingDynamicTable
  from "./equipment-accounting-edit-moving-dynamic-table/equipment-accounting-edit-moving-dynamic-table";
import EquipmentAccountingEditMovingConnectedTable
  from "./equipment-accounting-edit-moving-connected-table/equipment-accounting-edit-moving-connected-table";
import EquipmentAccountingEditMovingForm
  from "./equipment-accounting-edit-moving-form/equipment-accounting-edit-moving-form";
import EquipmentAccountingTable from "../../equipment-accounting-table/equipment-accounting-table";

const emptyItem = {
  attributes: {
    at: new Date().toDateString(),
    division_id: null,
    status: null,
    parent_id: null,
    position: null
  }
};

const EquipmentAccountingEditMoving = ({ itemId, equipmentList }) => {
  const [currentItem, setCurrentItem] = useState(emptyItem);
  const [loading, setLoading] = useState(true);
  const [changeId, setChangeId] = useState(null);
  const [subdivisionList, setSubdivisionList] = useState([]);
  const [filteredEquipmentList, setFilteredEquipmentList] = useState([]);
  const [dynamicTableData, setDynamicTableData] = useState([]);
  const [dynamicSortedBy, setDynamicSortedBy] = useState('at');
  const [dynamicSortedDown, setDynamicSortedDown] = useState(true);
  const [connectedSortedBy, setConnectedSortedBy] = useState('at');
  const [connectedSortedDown, setConnectedSortedDown] = useState(true);

  const [{response: subdivisionResponse, isLoading: subdivisionIsLoading, error: subdivisionError}, doFetchSubdivisions] = useFetch(`/directories/divisions`);
  const [{response: dynamicResponse, isLoading: dynamicIsLoading, error: dynamicError}, doFetchDynamicTableData] = useFetch(`/directories/equipment_items/${itemId}/changes`);
  const [{response: saveResponse, isLoading: saveIsLoading, error: saveError}, doFetchItemSave] = useFetch(`/directories/equipment_items/${itemId}/changes`);
  const [{response: updateResponse, isLoading: updateIsLoading, error: updateError}, doFetchItemUpdate] = useFetch(`/directories/equipment_items/${itemId}/changes/${changeId}`);
  const [{response: deleteResponse, isLoading: deleteIsLoading, error: deleteError}, doFetchItemDelete] = useFetch(`/directories/equipment_items/${itemId}/changes/${changeId}`);

  const statusList = [
    { id: 'works', attributes: { name: "Исправен"}},
    { id: 'broken', attributes: { name: "Не исправен"}},
    { id: 'decommissioned', attributes: { name: "Списан"}},
  ];

  useEffect(() => {
    doFetchSubdivisions();
    doFetchDynamicTableData();
    const customEquipmentList = [];
    const newEquipmentList = equipmentList.slice().filter(it => it.id !== itemId);
    newEquipmentList.forEach(it => {
      customEquipmentList.push({
        id: it.id,
        attributes: {
          name: `${it.attributes.inventory_number} / ${it.attributes.name} / ${it.attributes.factory_number}`
        }
      })
    });
    customEquipmentList.unshift({id: '', attributes: { name: 'Нет'}});
    setFilteredEquipmentList(customEquipmentList);
  }, []);

  useEffect(() => {
    if (!subdivisionResponse || !dynamicResponse) {
      return;
    }
    setSubdivisionList(subdivisionResponse.data);
    setDynamicTableData(dynamicResponse.data);
    setLoading(false);
  }, [subdivisionResponse, dynamicResponse]);

  useEffect(() => {
    if (saveResponse || updateResponse || deleteResponse) {
      setCurrentItem(emptyItem);
      setChangeId(null);
      doFetchDynamicTableData();
      setLoading(false);
    }
  }, [saveResponse, saveIsLoading, updateResponse, updateIsLoading, deleteResponse, deleteIsLoading]);

  useEffect(() => {
    setLoading(false);
  }, [currentItem]);

  const onItemEdit = (id) => {
    setChangeId(id);
    setCurrentItem(dynamicTableData.find(it => it.id === id));
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

  const onDynamicSortClick = (name) => {
    if (name === dynamicSortedBy) {
      setDynamicSortedDown(!dynamicSortedDown);
    }
    if (name !== dynamicSortedBy) {
      setDynamicSortedBy(name);
      setDynamicSortedDown(true);
    }
  };

  const onConnectedSortClick = (name) => {
    if (name === connectedSortedBy) {
      setConnectedSortedDown(!connectedSortedDown);
    }
    if (name !== connectedSortedBy) {
      setConnectedSortedBy(name);
      setConnectedSortedDown(true);
    }
  };

  return (
    <>
      {loading ? <Spinner/> : (
        <div className="equipment-accounting-edit-moving">
          <EquipmentAccountingEditMovingForm
            currentItem={currentItem}
            statusList={statusList}
            equipmentList={filteredEquipmentList}
            subdivisionList={subdivisionList}
            onItemSave={onItemSave}
          />
          <div className="equipment-accounting-edit-moving-dynamic">
            <div className="equipment-accounting-edit-moving-dynamic__title inner-title">Динамика перемещения оборудования</div>
            <EquipmentAccountingEditMovingDynamicTable
              sortedBy={dynamicSortedBy}
              sortedDown={dynamicSortedDown}
              onSortClick={onDynamicSortClick}
              tableData={dynamicTableData}
              onItemEdit={onItemEdit}
              onItemDelete={onItemDelete}
              isLoading={dynamicIsLoading}
              error={dynamicError}
              subdivisionList={subdivisionList}
              statusList={statusList}
            />
          </div>
          <div className="equipment-accounting-edit-moving-connected">
            <div className="equipment-accounting-edit-moving-connected__title inner-title">Привязанное оборудования</div>
            <EquipmentAccountingEditMovingConnectedTable
              sortedBy={connectedSortedBy}
              sortedDown={connectedSortedDown}
              onSortClick={onConnectedSortClick}
              // tableData={dynamicTableData}
              // isLoading={dynamicIsLoading}
              // error={dynamicError}
              // subdivisionList={subdivisionList}
              equipmentList={equipmentList}
              itemId={itemId}
            />
          </div>
        </div>
      )}
    </>
  )
};

export default EquipmentAccountingEditMoving;
