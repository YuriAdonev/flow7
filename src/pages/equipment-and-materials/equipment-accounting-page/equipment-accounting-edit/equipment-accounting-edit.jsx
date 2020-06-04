import React, {Fragment, useContext, useEffect, useState} from 'react';

import './equipment-accounting-edit.scss';

import Modal from "../../../../components/modal/modal";
import {CurrentUserContext} from "../../../../contexts/current-user";
import useFetch from "../../../../hooks/use-fetch";
import Spinner from "../../../../components/spinner/spinner";
import FormSelect from "../../../../components/form/form-select/form-select";
import AccountingSelectSearch from "../../../../components/form/accounting-select-search/accounting-select-search";
import AccountingSelect from "../../../../components/form/accounting-select/accounting-select";
import EquipmentAccountingEditUsed from "./equipment-accounting-edit-used/equipment-accounting-edit-used";
import Table from "../../../../components/table/table/table";
import EquipmentAccountingEditSensors from "./equipment-accounting-edit-sensors/equipment-accounting-edit-sensors";
import EquipmentAccountingEditConnection
  from "./equipment-accounting-edit-connection/equipment-accounting-edit-connection";
import EquipmentAccountingEditMoving from "./equipment-accounting-edit-moving/equipment-accounting-edit-moving";
import TextField from "@atlaskit/textfield";
import {ErrorMessage, Field} from "@atlaskit/form";
import {Label} from "@atlaskit/field-base";
import { DatePicker } from '@atlaskit/datetime-picker';
import Select from "@atlaskit/select";

const EquipmentAccountingEdit = ({ itemId, onClose, producersList, devicesList, equipmentList, location, parentDate }) => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [currentPageTab, setCurrentPageTab] = useState('base');
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [nameEmpty, setNameEmpty] = useState(false);
  const [inventoryNumber, setInventoryNumber] = useState('');
  const [inventoryNumberEmpty, setInventoryNumberEmpty] = useState(false);
  const [factoryNumber, setFactoryNumber] = useState('');
  const [factoryNumberEmpty, setFactoryNumberEmpty] = useState(false);
  const [status, setStatus] = useState(null);
  const [statusEmpty, setStatusEmpty] = useState(false);
  const [serviceInterval, setServiceInterval] = useState(null);
  const [currentFileField, setCurrentFileField] = useState('');
  const [passport, setPassport] = useState({});
  const [certificate, setCertificate] = useState({});
  const [producer, setProducer] = useState('');
  const [producerEmpty, setProducerEmpty] = useState(false);
  const [model, setModel] = useState('');
  const [modelEmpty, setModelEmpty] = useState(false);
  const [modelsOptions, setModelsOptions] = useState([]);
  const [balanceDate, setBalanceDate] = useState(null);
  const [balanceDateEmpty, setBalanceDateEmpty] = useState(false);
  const [releaseDate, setReleaseDate] = useState(null);
  const [releaseDateEmpty, setReleaseDateEmpty] = useState(false);
  const [responsible, setResponsible] = useState(null);
  const [responsibleOptions, setResponsibleOptions] = useState([]);

  const [{response: itemResponse, isLoading: itemIsLoading, error: itemError}, doFetchItem] = useFetch(`/directories/equipment_items/${itemId}`);
  const [{response: modelsResponse, isLoading: modelsIsLoading, error: modelsError}, doFetchModels] = useFetch(`/directories/equipment_models?producer_id=${producer}`);
  const [{response: saveResponse, isLoading: saveIsLoading, error: saveError}, doFetchItemSave] = useFetch(`/directories/equipment_items`);
  const [{response: updateResponse, isLoading: updateIsLoading, error: updateError}, doFetchItemUpdate] = useFetch(`/directories/equipment_items/${itemId}`);
  const [{response: fileUploadResponse, isLoading: fileUploadIsLoading, error: fileUploadError}, doFetchFileUpload] = useFetch(`/uploads`, true);

  const isNewItem = itemId === 'new';

  console.log('parentDate', parentDate);

  const headerData = {
    title: isNewItem ? 'Добавление оборудования' : 'Редактирование оборудования',
    breadcrumbsList: [
      {
        name: currentUserState.currentSite ? currentUserState.currentSite.name : '',
        link: '/'
      },
      {
        name: 'Оборудование и метериалы',
        link: '/equipment-and-materials'
      },
      {
        name: 'Учет оборудования',
        link: '/equipment-and-materials'
      },
    ],
    noBottomLine: true
  };

  useEffect(() => {
    if (!isNewItem) {
      doFetchItem();
    } else {
      setLoading(false);
    }
    // const newEquipmentList = equipmentList.slice().filter(it => it.id !== itemId);
    // newEquipmentList.unshift({id: '', attributes: { name: 'Нет'}});
    // setFilteredEquipmentList(newEquipmentList);
  }, []);

  useEffect(() => {
    if (!itemResponse) {
      return;
    }
    const itemData = itemResponse.data.attributes;
    setName(itemData.name);
    setInventoryNumber(itemData.inventory_number);
    setFactoryNumber(itemData.factory_number);
    setProducer(itemData.producer_id === null ? '' : itemData.producer_id.toString());
    setModel(itemData.equipment_model_id);
    setBalanceDate(new Date(itemData.balance_date));
    setReleaseDate(new Date(itemData.release_date));
    setPassport(itemData.passport);
    setCertificate(itemData.certificate);
    setServiceInterval(itemData.service_interval);
    setResponsible('');
    setLoading(false);
    if (location.search !== '') {
      const query = new URLSearchParams(location.search);
      if (query.get('equipment_id') !== '') {
        setCurrentPageTab('uses');
      }
    }
  }, [itemResponse]);

  useEffect(() => {
    if (producer === '') {
      return;
    }
    doFetchModels();
  }, [producer]);

  useEffect(() => {
    if (!modelsResponse) {
      return;
    }
    const newModelsList = [];
    modelsResponse.data.forEach(item => {
      newModelsList.push({
        label: item.attributes.name,
        value: item.id
      })
    });
    setModelsOptions(newModelsList);
  }, [modelsResponse]);

  useEffect(() => {
    if (!fileUploadResponse) {
      return;
    }
    if (currentFileField === 'passport') {
      setPassport({ ...fileUploadResponse });
    }
    if (currentFileField === 'certificate') {
      setCertificate({ ...fileUploadResponse });
    }
  }, [fileUploadResponse, fileUploadIsLoading]);

  useEffect(() => {
    if (saveResponse || updateResponse) {
      onClose();
    }
  }, [saveResponse, updateResponse]);

  const handleFileField = (type, file) => {
    setCurrentFileField(type);
    const formData = new FormData();
    formData.set('attachment', file);
    doFetchFileUpload({
      method: 'POST',
      data: formData
    });
  };

  const onSaveClick = () => {
    if (name === '' || inventoryNumber === '' || factoryNumber === '' || producer === '' || model === '' || releaseDate === null || balanceDate === '') {
      if (name === '') {
        setNameEmpty(true);
      }
      if (inventoryNumber === '') {
        setInventoryNumberEmpty(true);
      }
      if (factoryNumber === '') {
        setFactoryNumberEmpty(true);
      }
      if (producer === '') {
        setProducerEmpty(true);
      }
      if (model === '') {
        setModelEmpty(true);
      }
      if (releaseDate === null) {
        setReleaseDateEmpty(true);
      }
      if (balanceDate === null) {
        setBalanceDateEmpty(true);
      }
    } else {
      const item = {
        data: {
          name: name,
          factory_number: factoryNumber,
          inventory_number: inventoryNumber,
          equipment_model_id: model,
          balance_date: balanceDate,
          release_date: releaseDate,
          service_interval: serviceInterval,
          parent_equipment_item_id: null,
          passport: passport,
          certificate: certificate,
          producer_id: producer,
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

  console.log('producer', producer);
  console.log('producersList', producersList);

  return (
    <Modal
      headerData={headerData}
      onClose={onClose}
      isWide={true}
    >
      <div className="equipment-accounting-edit-triggers tabs-triggers">
        <div
          className={`equipment-accounting-edit-triggers__item tabs-triggers__item${currentPageTab === 'base' ? ' active' : ''}`}
          onClick={() => setCurrentPageTab('base')}
        >Основная информация</div>
        {isNewItem ? '' : (
          <Fragment>
            <div
              className={`equipment-accounting-edit-triggers__item tabs-triggers__item${currentPageTab === 'uses' ? ' active' : ''}`}
              onClick={() => setCurrentPageTab('uses')}
            >Использование</div>
            <div
              className={`equipment-accounting-edit-triggers__item tabs-triggers__item${currentPageTab === 'moving' ? ' active' : ''}`}
              onClick={() => setCurrentPageTab('moving')}
            >Перемещение</div>
            <div
              className={`equipment-accounting-edit-triggers__item tabs-triggers__item tabs-triggers__item--right${currentPageTab === 'device' ? ' active' : ''}`}
              onClick={() => setCurrentPageTab('device')}
            >Устройство</div>
          </Fragment>
        )}
      </div>
      {currentPageTab === 'base' && (
        <div className="equipment-accounting-edit">
          {loading ? <Spinner/> : (
            <div className="equipment-accounting-edit__wrap">
              <ul className="equipment-accounting-edit-fields custom-form">
                <li className="equipment-accounting-edit-fields-item">
                  <Field name="name" label="Название:" isRequired>
                    {({ fieldProps, error }) => (
                      <>
                        <TextField
                          autoComplete="off"
                          {...fieldProps}
                          placeholder="Название"
                          onChange={(evt) => setName(evt.target.value)}
                          value={name}
                        />
                        {error && (
                          <ErrorMessage>
                            Введите название
                          </ErrorMessage>
                        )}
                      </>
                    )}
                  </Field>
                </li>
                <li className="equipment-accounting-edit-fields-item">
                  <Field name="inventoryNumber" label="Инвентаризационный номер:" isRequired>
                    {({ fieldProps, error }) => (
                      <>
                        <TextField
                          autoComplete="off"
                          {...fieldProps}
                          placeholder="Инвентаризационный номер"
                          onChange={(evt) => setInventoryNumber(evt.target.value)}
                          value={inventoryNumber}
                        />
                        {error && (
                          <ErrorMessage>
                            Введите инвентаризационный номер
                          </ErrorMessage>
                        )}
                      </>
                    )}
                  </Field>
                </li>
                <li className="equipment-accounting-edit-fields-item">
                  <Field label="Производитель:" name="producer">
                    {({ fieldProps, error }) => (
                      <>
                        <Select
                          {...fieldProps}
                          options={producersList}
                          placeholder="Выберите производителя"
                          defaultValue={producersList[producersList.findIndex(it => it.value == producer)]}
                          onChange={value => setProducer(value.value)}
                        />
                      </>
                    )}
                  </Field>
                </li>
                <li className="equipment-accounting-edit-fields-item">
                  <Field label="Модель:" name="model">
                    {({ fieldProps, error }) => (
                      <>
                        <Select
                          {...fieldProps}
                          options={modelsOptions}
                          placeholder="Выберите модель"
                          defaultValue={modelsOptions[modelsOptions.findIndex(it => it.value == model)]}
                          onChange={value => setModel(value.value)}
                        />
                      </>
                    )}
                  </Field>
                </li>
                <li className={`equipment-accounting-edit-fields-item${releaseDateEmpty ? ' empty' : ''}`}>
                  <Label htmlFor="react-select-datepicker-1--input" label="Дата принятия на баланс:" />
                  <DatePicker
                    onChange={setBalanceDate}
                    value={balanceDate}
                    locale="ru-RU"
                  />
                </li>
                <li className="equipment-accounting-edit-fields-item">
                  <Field name="factoryNumber" label="Заводской номер:" isRequired>
                    {({ fieldProps, error }) => (
                      <>
                        <TextField
                          autoComplete="off"
                          {...fieldProps}
                          placeholder="Заводской номер"
                          onChange={(evt) => setFactoryNumber(evt.target.value)}
                          value={factoryNumber}
                        />
                        {error && (
                          <ErrorMessage>
                            Введите заводской номер
                          </ErrorMessage>
                        )}
                      </>
                    )}
                  </Field>
                </li>
                <li className={`equipment-accounting-edit-fields-item${releaseDateEmpty ? ' empty' : ''}`}>
                  <Label htmlFor="react-select-datepicker-1--input" label="Дата выпуска:" />
                  <DatePicker
                    onChange={setReleaseDate}
                    value={releaseDate}
                    locale="ru-RU"
                  />
                </li>
                <li className="equipment-accounting-edit-fields-item equipment-accounting-edit-fields-item--file">
                  <Label htmlFor="react-select-datepicker-1--input" label="Паспорт устройства:" />
                  <div className="equipment-accounting-edit-fields-item-file">
                    <div className="equipment-accounting-edit-fields-item-file__icon">
                      <label>
                        <input
                          type="file"
                          className="equipment-accounting-edit-fields-item__input"
                          onChange={(evt) => handleFileField('passport', evt.target.files[0])}
                        />
                        <svg width="16" height="12" viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.34375 6.65625H11.3438L8 3.34375L4.65625 6.65625H6.65625V9.34375H9.34375V6.65625ZM12.9062 4.6875C13.7604 4.75 14.4896 5.10417 15.0938 5.75C15.6979 6.375 16 7.125 16 8C16 8.91667 15.6667 9.70833 15 10.375C14.3542 11.0208 13.5729 11.3438 12.6562 11.3438H4C2.89583 11.3438 1.94792 10.9583 1.15625 10.1875C0.385417 9.39583 0 8.44792 0 7.34375C0 6.32292 0.34375 5.4375 1.03125 4.6875C1.71875 3.91667 2.5625 3.47917 3.5625 3.375C4 2.5625 4.61458 1.90625 5.40625 1.40625C6.19792 0.90625 7.0625 0.65625 8 0.65625C9.20833 0.65625 10.2708 1.04167 11.1875 1.8125C12.1042 2.5625 12.6771 3.52083 12.9062 4.6875Z"/>
                        </svg>
                      </label>
                    </div>
                    {passport.data === undefined ? (
                      <div
                        className={`equipment-accounting-edit-fields-item-file__placeholder`}
                      >
                        Выберите файл
                      </div>
                    ) : (
                      <div
                        className={`equipment-accounting-edit-fields-item-file__placeholder fill`}
                      >
                        <a href={`${process.env.REACT_APP_API_HTTP + process.env.REACT_APP_API_BASE_URL}/uploads/${passport.data.id}`} target="_blank">{passport.data.attributes.filename}</a>
                      </div>
                    )}
                  </div>
                </li>
                <li className="equipment-accounting-edit-fields-item">
                  <Field name="serviceInterval" label="Интервал профилактики оборудования в часах:">
                    {({ fieldProps, error }) => (
                      <>
                        <TextField
                          autoComplete="off"
                          {...fieldProps}
                          placeholder="Интервал профилактики"
                          onChange={(evt) => setServiceInterval(evt.target.value)}
                          value={serviceInterval}
                        />
                        {error && (
                          <ErrorMessage>
                            Введите интервал профилактики
                          </ErrorMessage>
                        )}
                      </>
                    )}
                  </Field>
                </li>
                <li className="equipment-accounting-edit-fields-item equipment-accounting-edit-fields-item--file">
                  <Label htmlFor="react-select-datepicker-1--input" label="Сертификат устройства:" />
                  <div className="equipment-accounting-edit-fields-item-file">
                    <div className="equipment-accounting-edit-fields-item-file__icon">
                      <label>
                        <input
                          type="file"
                          className="equipment-accounting-edit-fields-item__input"
                          onChange={(evt) => handleFileField('certificate', evt.target.files[0])}
                        />
                        <svg width="16" height="12" viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.34375 6.65625H11.3438L8 3.34375L4.65625 6.65625H6.65625V9.34375H9.34375V6.65625ZM12.9062 4.6875C13.7604 4.75 14.4896 5.10417 15.0938 5.75C15.6979 6.375 16 7.125 16 8C16 8.91667 15.6667 9.70833 15 10.375C14.3542 11.0208 13.5729 11.3438 12.6562 11.3438H4C2.89583 11.3438 1.94792 10.9583 1.15625 10.1875C0.385417 9.39583 0 8.44792 0 7.34375C0 6.32292 0.34375 5.4375 1.03125 4.6875C1.71875 3.91667 2.5625 3.47917 3.5625 3.375C4 2.5625 4.61458 1.90625 5.40625 1.40625C6.19792 0.90625 7.0625 0.65625 8 0.65625C9.20833 0.65625 10.2708 1.04167 11.1875 1.8125C12.1042 2.5625 12.6771 3.52083 12.9062 4.6875Z"/>
                        </svg>
                      </label>
                    </div>
                    {certificate.data === undefined ? (
                      <div
                        className={`equipment-accounting-edit-fields-item-file__placeholder`}
                      >
                        Выберите файл
                      </div>
                    ) : (
                      <div
                        className={`equipment-accounting-edit-fields-item-file__placeholder fill`}
                      >
                        <a href={`${process.env.REACT_APP_API_HTTP + process.env.REACT_APP_API_BASE_URL}/uploads/${certificate.data.id}`} target="_blank">{certificate.data.attributes.filename}</a>
                      </div>
                    )}
                  </div>
                </li>
                <li className="equipment-accounting-edit-fields-item">
                  <Field label="Ответственный:" name="responsible">
                    {({ fieldProps, error }) => (
                      <>
                        <Select
                          {...fieldProps}
                          options={responsibleOptions}
                          placeholder="Выберите статус"
                          defaultValue={responsibleOptions[responsibleOptions.findIndex(it => it.value == responsible)]}
                          onChange={value => setResponsible(value.value)}
                        />
                      </>
                    )}
                  </Field>
                </li>
              </ul>
              <button
                className="equipment-accounting-edit__btn btn"
                type="button"
                onClick={onSaveClick}
              >Сохранить</button>
            </div>
          )}
        </div>
      )}
      {currentPageTab === 'uses' && (
        <div className="equipment-accounting-edit">
          <EquipmentAccountingEditUsed
            itemId={itemId}
            balanceDate={balanceDate}
            parentDate={parentDate}
          />
        </div>
      )}
      {currentPageTab === 'moving' && (
        <EquipmentAccountingEditMoving
          itemId={itemId}
          equipmentList={equipmentList}
        />
      )}
      {currentPageTab === 'device' && (
        <EquipmentAccountingEditConnection
          itemId={itemId}
          devicesList={devicesList}
        />
      )}
    </Modal>
  )
};

export default EquipmentAccountingEdit;
