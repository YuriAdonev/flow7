import React, { useState, useEffect, useRef } from 'react';

import './manufacturers-edit.scss';

import ManufacturersModelsEdit from '../manufacturers-models-edit/manufacturers-models-edit';
import ManufacturersModelsTable from '../manufacturers-models-table/manufacturers-models-table';
import useFetch from '../../../../hooks/use-fetch';
import { useStore } from '../../../../hooks-store/store';
import Modal from '../../../../components/modal/modal';
import Spinner from "../../../../components/spinner/spinner";
import ManufacturersTable from "../manufacturers-table/manufacturers-table";

const ManufacturersEdit = ({ itemId, onClose }) => {
  const [state, dispatch] = useStore();
  const [filters, setFilters] = useState([]);
  const [modelItemId, setModelItemId] = useState('new');
  const [showModal, setShowModal] = useState(false);
  const [createModel, setCreateModel] = useState(false);
  const [selectCountryActive, setSelectCountryActive] = useState(false);
  const [selectTypesOpen, setSelectTypesOpen] = useState(false);
  const [modelsLoading, setModelsLoading] = useState(true);
  const [dropActive, setDropActive] = useState('');
  const [sortedBy, setSortedBy] = useState('name');
  const [sortedDown, setSortedDown] = useState(true);

  const [name, setName] = useState('');
  const [nameEmpty, setNameEmpty] = useState(false);
  const [country, setCountry] = useState('');
  const [countryId, setCountryId] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [filteredCountryList, setFilteredCountryList] = useState([]);
  // const [equipmentType, setEquipmentType] = useState('');
  const [modelType, setModelType] = useState('');
  const [equipmentTypesList, setEquipmentTypesList] = useState([]);
  const [filteredEquipmentTypesList, setFilteredEquipmentTypesList] = useState([]);
  // const [materialType, setMaterialType] = useState('');
  const [materialTypesList, setMaterialTypesList] = useState([]);
  const [filteredMaterialTypesList, setFilteredMaterialTypesList] = useState([]);

  const [tableData, setTableData] = useState([]);

  const nameInput = useRef(null);
  const countryInput = useRef(null);
  const typeInput = useRef(null);
  const isNewItem = itemId === 'new';
  const [product, setProduct] = useState({type: '', id: '', name: ''});

  const [{response: responseEquipment, isLoading: isLoadingEquipment, error: errorEquipment}, doFetchTableDataEquipment] = useFetch(`/directories/equipment_models?producer_id=${itemId}`);
  const [{response: responseMaterial, isLoading: isLoadingMaterial, error: errorMaterial}, doFetchTableDataMaterial] = useFetch(`/directories/material_models?producer_id=${itemId}`);
  const [{response: equipmentItemDeleteResponse, isLoading: equipmentItemDeleteIsLoading, error: equipmentItemDeleteError}, doFetchEquipmentItemDelete] = useFetch(`/directories/equipment_models/${modelItemId}`);
  const [{response: materialItemDeleteResponse, isLoading: materialItemDeleteIsLoading, error: materialItemDeleteError}, doFetchMaterialItemDelete] = useFetch(`/directories/material_models/${modelItemId}`);
  const [{response: itemResponse, isLoading: itemIsLoading, error: itemError}, doFetchItem] = useFetch(`/directories/producers/${itemId}`);
  const [{response: itemSaveResponse, isLoading: itemSaveIsLoading, error: itemSaveError}, doFetchItemSave] = useFetch(`/directories/producers`);
  const [{response: itemUpdateResponse, isLoading: itemUpdateIsLoading, error: itemUpdateError}, doFetchItemUpdate] = useFetch(`/directories/producers/${itemId}`);
  const [{response: countryListResponse, isLoading: countryListIsLoading, error: countryListError}, doFetchCountryList] = useFetch(`/directories/countries`);
  const [{response: equipmentTypesListResponse, isLoading: equipmentTypesListIsLoading, error: equipmentTypesListError}, doFetchEquipmentTypesList] = useFetch(`/directories/equipment_types`);
  const [{response: materialTypesListResponse, isLoading: materialTypesListIsLoading, error: materialTypesListError}, doFetchMaterialTypesList] = useFetch(`/directories/material_types`);

  const headerData = {
    title: isNewItem ? 'Создание' : 'Редактирование',
    breadcrumbsList: [
      {
        name: 'Оборудование и материалы',
        link: '/'
      },
      {
        name: 'Производители',
        link: '/'
      },
    ],
    buttonsList: [
      {
        text: 'Сохранить',
        action: () => onSaveClick()
      }
    ],
  };

  useEffect(() => {
    switch (dropActive) {
      case 'type':
        setSelectTypesOpen(true);
        setSelectCountryActive(false);
        return;
      case 'country':
        setSelectTypesOpen(false);
        setSelectCountryActive(true);
        return;
      default:
        setSelectTypesOpen(false);
        setSelectCountryActive(false);
        return;
    }
  }, [dropActive]);

  useEffect(() => {
    dispatch('SET_DROP_OPENED', selectTypesOpen);
  }, [selectTypesOpen]);

  useEffect(() => {
    dispatch('SET_DROP_OPENED', selectCountryActive);
  }, [selectCountryActive]);

  useEffect(() => {
    if (state.isDropOpened) {
      return;
    }
    setDropActive('')
  }, [state.isDropOpened]);

  useEffect(() => {
    doFetchEquipmentTypesList();
    doFetchMaterialTypesList();
    doFetchCountryList();
    if (!isNewItem) {
      doFetchItem();
    }
  }, []);

  useEffect(() => {
    if (!countryListResponse || !equipmentTypesListResponse || !materialTypesListResponse) {
      return
    }
    if (!isNewItem) {
      if (!itemResponse) {
        return;
      }
    }
    setCountryList(countryListResponse.data);
    setFilteredCountryList(countryListResponse.data);
    if (!isNewItem) {
      const currentCountry = countryListResponse.data.slice().find((item) => item.id === itemResponse.data.relationships.country.data.id);
      setCountry(currentCountry.attributes.name);
      setCountryId(currentCountry.id);
    } else {
      setCountry('');
      setCountryId('');
    }
    setEquipmentTypesList(equipmentTypesListResponse.data);
    setMaterialTypesList(materialTypesListResponse.data);
    setFilteredEquipmentTypesList(equipmentTypesListResponse.data);
    setFilteredMaterialTypesList(materialTypesListResponse.data);
  }, [countryListResponse, equipmentTypesListResponse, materialTypesListResponse, itemResponse]);

  useEffect(() => {
    doFetchTableDataEquipment();
    doFetchTableDataMaterial();
  }, [equipmentItemDeleteResponse, materialItemDeleteResponse]);

  useEffect(() => {
    if (!itemSaveResponse && !itemUpdateResponse) {
      return;
    }
    onClose();
    doFetchTableDataEquipment();
    doFetchTableDataMaterial();
  }, [itemSaveResponse, itemUpdateResponse]);

  useEffect(() => {
    if (!responseEquipment || !responseMaterial || !itemResponse) {
      return
    }
    if (!isNewItem) {
      setName(itemResponse.data.attributes.name);
    }
    setModelsLoading(false);
    setTableData([...responseEquipment.data, ...responseMaterial.data]);
  }, [responseEquipment, responseMaterial, itemResponse]);

  useEffect(() => {
    if (equipmentItemDeleteIsLoading) {
      return;
    }
    setModelItemId('new');
    doFetchTableDataEquipment();
    doFetchTableDataMaterial();
  }, [equipmentItemDeleteIsLoading]);

  useEffect(() => {
    if (materialItemDeleteIsLoading) {
      return;
    }
    setModelItemId('new');
    doFetchTableDataEquipment();
    doFetchTableDataMaterial();
  }, [materialItemDeleteIsLoading]);

  useEffect(() => {
    dispatch('SET_MODAL_OPENED', showModal);
  }, [showModal]);

  const onSortClick = (name) => {
    if (name === sortedBy) {
      setSortedDown(!sortedDown);
    }
    if (name !== sortedBy) {
      setSortedBy(name);
      setSortedDown(true);
    }
  };

  const onSaveClick = () => {
    if (name === '') {
      setNameEmpty(true);
      nameInput.current.focus();
    } else {
      const item = {
        data: {
          name: name,
          country_id: countryId,
        }
      };
      if (isNewItem) {
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
    }
  };

  const onCountryChange = (item) => {
    setCountry(item.attributes.name);
    setCountryId(item.id);
    setSelectCountryActive(false);
  };

  const typesChange = (item) => {
    setProduct({
      type: item.type,
      id: item.id,
      name: item.attributes.name
    });
    setSelectTypesOpen(false);
  };

  const addModel = () => {
    setCreateModel(true);
    setModelItemId('new');
    setModelType(product.type);
  };

  const onCloseAddModelClick = () => {
    setCreateModel(false);
    setProduct({name: '', id: '', type: ''});
    setModelItemId('new');
    reloadTable();
  };

  const onItemDelete = (id, type) => {
    setModelItemId(id);
    if (type === 'equipment_model') {
      doFetchEquipmentItemDelete({
        method: 'DELETE'
      });
    } else {
      doFetchMaterialItemDelete({
        method: 'DELETE'
      });
    }
    reloadTable();
  };

  const reloadTable = () => {
    doFetchTableDataEquipment();
    doFetchTableDataMaterial();
  };

  const setShowEdit = (id, type) => {
    setModelType(type);
    setModelItemId(id);
    setCreateModel(true);
  };

  const countryHandle = (value) => {
    setCountry(value);
    let newCountryList = [];
    const regex = new RegExp(value.toLowerCase(), 'g');
    newCountryList = countryList.slice().filter((item) => item.attributes.name.toLowerCase().match(regex));
    setFilteredCountryList(newCountryList);
  };

  const typeHandle = (value) => {
    setProduct(productState => ({ ...productState, name: value}));
    let newEquipmentTypeList = [];
    let newMaterialTypeList = [];
    const regex = new RegExp(value.toLowerCase(), 'g');
    newEquipmentTypeList = equipmentTypesList.slice().filter((item) => item.attributes.name.toLowerCase().match(regex));
    newMaterialTypeList = materialTypesList.slice().filter((item) => item.attributes.name.toLowerCase().match(regex));
    setFilteredEquipmentTypesList(newEquipmentTypeList);
    setFilteredMaterialTypesList(newMaterialTypeList);
  };

  const countryItems = filteredCountryList.map((item) => {
    return (
      <li
        key={item.id}
        className="manufacturers-edit-country-list__item"
        onClick={() => onCountryChange(item)}
      >
        {item.attributes.name}
      </li>
    )
  });

  const equipmentTypesItems = filteredEquipmentTypesList.map((item) => {
    return (
      <li
        key={item.id}
        className={`manufacturers-models-add-types-list__item${product.type === item.type && product.id === item.id ? ' active' : ''}`}
        onClick={() => typesChange(item)}
      >
        {item.attributes.name}
      </li>
    )
  });

  const materialTypesItems = filteredMaterialTypesList.map((item) => {
    return (
      <li
        key={item.id}
        className={`manufacturers-models-add-types-list__item${product.type === item.type && product.id === item.id ? ' active' : ''}`}
        onClick={() => typesChange(item)}
      >
        {item.attributes.name}
      </li>
    )
  });

  return (
    <Modal
      headerData={headerData}
      onClose={onClose}
      isWide={true}
    >
      {createModel ? (
        <ManufacturersModelsEdit
          onClose={onCloseAddModelClick}
          product={product}
          modelItemId={modelItemId}
          modelType={modelType}
          producerId={itemId}
          reloadTableData={reloadTable}
        />
      ) : (
        <div className="manufacturers-edit">
          <div className="manufacturers-edit__row">
            <div className="manufacturers-edit-name">
              <input
                ref={nameInput}
                autoFocus={nameEmpty}
                type="text"
                placeholder="Название производителя"
                className={`manufacturers-edit-name__input${nameEmpty ? ' error' : ''}`}
                onChange={(evt) => setName(evt.target.value)}
                value={name}
              />
              {nameEmpty ? (
                <span className="manufacturers-edit__error">Введите название производителя</span>
              ) : ''}
            </div>
            <div className={`manufacturers-edit-country${selectCountryActive ? ' active': ''}`}>
              <div
                className="manufacturers-edit-country__input"
                onClick={(evt) => evt.stopPropagation()}
              >
                <div className="manufacturers-edit-country__drop">
                  <svg width="10" height="6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.44531 0.433594L9.5 1.48828L5 5.98828L0.5 1.48828L1.55469 0.433594L5 3.87891L8.44531 0.433594Z"/>
                  </svg>
                </div>
                <input
                  ref={countryInput}
                  type="text"
                  placeholder="Выберите страну"
                  onChange={(evt) => countryHandle(evt.target.value)}
                  onFocus={() => {
                    setDropActive('country')
                    setSelectCountryActive(true)
                  }}
                  value={country}
                />
                <ul className={`manufacturers-edit-country-list${selectCountryActive ? '' : ' disabled'}`}>
                  {countryItems}
                </ul>
              </div>
            </div>
          </div>
          {isNewItem ? '' : (
            <div className="manufacturers-models">
              <div className="manufacturers-models-add">
                <div className={`manufacturers-models-add-types${selectTypesOpen ? ' active' : ''}`}>
                  <div
                    className="manufacturers-models-add-types__input"
                    onClick={(evt) => evt.stopPropagation()}
                  >
                    <div className="manufacturers-models-add-types__drop">
                      <svg width="10" height="6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.44531 0.433594L9.5 1.48828L5 5.98828L0.5 1.48828L1.55469 0.433594L5 3.87891L8.44531 0.433594Z"/>
                      </svg>
                    </div>
                    <input
                      ref={typeInput}
                      type="text"
                      placeholder="Выберите тип оборудования / материала для добавления"
                      onChange={(evt) => typeHandle(evt.target.value)}
                      onFocus={() => {
                        setDropActive('type');
                        // setSelectTypesOpen(true);
                      }}
                      value={product.name}
                    />
                    <div
                      className={`manufacturers-models-add-types-drop${selectTypesOpen ? '' : ' disabled'}`}
                    >
                      <div className="manufacturers-models-add-types-drop__title">Типы оборудования</div>
                      <ul className="manufacturers-models-add-types-list">
                        {equipmentTypesItems}
                      </ul>
                      <div className="manufacturers-models-add-types-drop__title">Типы материалов</div>
                      <ul className="manufacturers-models-add-types-list">
                        {materialTypesItems}
                      </ul>
                    </div>
                  </div>
                </div>
                <button
                  className="manufacturers-models-add__btn btn"
                  type="button"
                  onClick={addModel}
                  disabled={product.name === ''}
                >Добавить</button>
              </div>
              {modelsLoading ? <Spinner/> : (
                <ManufacturersModelsTable
                  sortedBy={sortedBy}
                  sortedDown={sortedDown}
                  onSortClick={onSortClick}
                  tableData={tableData}
                  setShowEdit={setShowEdit}
                  onItemDelete={onItemDelete}
                  equipmentTypesList={equipmentTypesList}
                  materialTypesList={materialTypesList}
                />
              )}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ManufacturersEdit;
