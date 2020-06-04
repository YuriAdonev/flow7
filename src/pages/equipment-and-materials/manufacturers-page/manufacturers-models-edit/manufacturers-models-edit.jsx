import React, { useState, useEffect, useRef } from 'react';

import './manufacturers-models-edit.scss';

import FormSelect from '../../../../components/form/form-select/form-select';
import Modal from "../../../../components/modal/modal";
import useFetch from "../../../../hooks/use-fetch";
import DirectoriesSelect from "../../../../components/form/directories-select/directories-select";
import DirectoriesSelectMultiple
  from "../../../../components/form/directories-select-multiple/directories-select-multiple";
import FormSelectMultiple from "../../../../components/form/form-select-multiple/form-select-multiple";
import TextField from "@atlaskit/textfield";
import {ErrorMessage, Field} from "@atlaskit/form";
import Select from "@atlaskit/select";

const ManufacturersModelsEdit = ({ product, modelItemId, modelType, onClose, producerId }) => {
  const [name, setName] = useState('');
  const [nameEmpty, setNameEmpty] = useState(false);
  const [currentType, setCurrentType] = useState({name: '', id: '', type: '', model: ''});
  const [fieldTypes, setFieldTypes] = useState([]);
  const [fields, setFields] = useState([]);
  const [fieldsList, setFieldsList] = useState([]);
  const [fieldsData, setFieldsData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [typeLink, setTypeLink] = useState('');
  const [typeId, setTypeId] = useState('');
  const [selectLists, setSelectLists] = useState({});
  const [fileUuid, setFileUuid] = useState('');

  const nameInput = useRef(null);
  const isNewItem = modelItemId === 'new';

  const [{response: itemResponse, isLoading: itemIsLoading, error: itemError}, doFetchItem] = useFetch(`/directories/${modelType}s/${modelItemId}`);
  const [{response: newResponse, isLoading: newIsLoading, error: newError}, doFetchNew] = useFetch(`/directories/${currentType.model}/new?equipment_type_id=${currentType.id}&producer_id=${producerId}`);
  const [{response: saveResponse}, doFetchSave] = useFetch(`/directories/${currentType.model}`);
  const [{response: updateResponse}, doFetchUpdate] = useFetch(`/directories/${currentType.model}/${modelItemId}`);
  const [{response: fileUploadResponse, isLoading: fileUploadIsLoading, error: fileUploadError}, doFetchFileUpload] = useFetch(`/uploads`, true);


  useEffect(() => {
    if (!isNewItem) {
      doFetchItem();
    } else {
      if (product.type === 'equipment_types') {
        setCurrentType({ ...product, model: 'equipment_models'});
      }
      if (product.type === 'material_types') {
        setCurrentType({ ...product, model: 'material_models'});
      }
      doFetchNew();
    }
  }, []);

  useEffect(() => {
    if (!itemResponse) {
      return;
    }
    if (itemResponse.data.type === 'equipment_model') {
      setCurrentType({id: itemResponse.data.attributes.equipment_type_id, type: 'equipment_types', model: 'equipment_models'});
    }
    if (itemResponse.data.type === 'material_model') {
      setCurrentType({id: itemResponse.data.attributes.equipment_type_id, type: 'material_types', model: 'material_models'});
    }
    setName(itemResponse.data.attributes.name);
    setFieldsList(itemResponse.data.attributes.fields);
    generateFields(itemResponse.data.attributes.fields);
  }, [itemResponse]);

  useEffect(() => {
    if (!isNewItem) {
      return;
    }
    if (!newResponse) {
      return;
    }
    setFieldsList(newResponse.data.attributes.fields);
    generateFields(newResponse.data.attributes.fields);
  }, [newResponse]);

  useEffect(() => {
    if (!saveResponse && !updateResponse) {
      return;
    }
    onClose();
  }, [saveResponse, updateResponse]);

  useEffect(() => {
    if (!fileUploadResponse) {
      return;
    }
    let newFieldTypes = fields.slice();
    const index = newFieldTypes.findIndex(it => it.uuid === fileUuid);
    newFieldTypes[index].data.value = fileUploadResponse;
    setFields(newFieldTypes);
  }, [fileUploadResponse, fileUploadIsLoading]);

  const generateFields = (arr) => {
    const newFields = [];

    arr.forEach((item) => {
      newFields.push(item);
      if (item.children) {
        item.children.forEach((childItem) => {
          newFields.push(childItem);
        });
      }
    });
    setFields(newFields);
  };

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
      {
        name: 'Модели',
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

  const onSaveClick = () => {
    if (name === '') {
      setNameEmpty(true);
      nameInput.current.focus();
    } else {
      const newFieldsData = {};
      fields.forEach(it => {
        newFieldsData[it.uuid] = it.data
      });
      let item;
      if (modelType === 'equipment_types') {
        item = {
          data: {
            name: name,
            producer_id: producerId,
            equipment_type_id: currentType.id,
            fields: newFieldsData
          }
        };
      } else {
        item = {
          data: {
            name: name,
            producer_id: producerId,
            material_type_id: currentType.id,
            fields: newFieldsData
          }
        };
      }
      if (modelItemId === 'new') {
        doFetchSave({
          method: 'POST',
          data: JSON.stringify(item)
        });
      } else {
        doFetchUpdate({
          method: 'PUT',
          data: JSON.stringify(item)
        });
      }
    }
  };

  const handleNumericField = (uuid, value) => {
    const newFieldTypes = fields.slice();
    const index = newFieldTypes.findIndex(it => it.uuid === uuid);
    newFieldTypes[index].data.value = value;
    setFields(newFieldTypes);
  };

  const handleStringField = (uuid, value) => {
    const newFieldTypes = fields.slice();
    const index = newFieldTypes.findIndex(it => it.uuid === uuid);
    newFieldTypes[index].data.value = value;
    setFields(newFieldTypes);
  };

  const handleRangeMinField = (uuid, min) => {
    const newFieldTypes = fields.slice();
    const index = newFieldTypes.findIndex(it => it.uuid === uuid);
    newFieldTypes[index].data.min = min;
    setFields(newFieldTypes);
  };

  const handleRangeMaxField = (uuid, max) => {
    const newFieldTypes = fields.slice();
    const index = newFieldTypes.findIndex(it => it.uuid === uuid);
    newFieldTypes[index].data.max = max;
    setFields(newFieldTypes);
  };

  const handleCheckboxField = (uuid) => {
    const newFieldTypes = fields.slice();
    const index = newFieldTypes.findIndex(it => it.uuid === uuid);
    newFieldTypes[index].data.value = !newFieldTypes[index].data.value;
    setFields(newFieldTypes);
  };

  const handleCollectionField = (uuid, value) => {
    const newFieldTypes = fields.slice();
    const index = newFieldTypes.findIndex(it => it.uuid === uuid);
    newFieldTypes[index].data.value = Number(value);
    setFields(newFieldTypes);
  };

  const handleCollectionMultipleField = (uuid, value) => {
    const newFieldTypes = fields.slice();
    const index = newFieldTypes.findIndex(it => it.uuid === uuid);
    newFieldTypes[index].data.value = value;
    setFields(newFieldTypes);
  };

  const handleSelectField = (uuid, id) => {
    let newFieldTypes = fields.slice();
    const index = newFieldTypes.findIndex(it => it.uuid === uuid);
    newFieldTypes[index].data.value = id;
    setFields(newFieldTypes);
  };

  const handleFileField = (uuid, file) => {
    setFileUuid(uuid);
    const formData = new FormData();
    formData.set('attachment', file);
    doFetchFileUpload({
      method: 'POST',
      data: formData
    });
  };

  const generateFieldItem = (item) => {
    switch (item.type) {
      case 'string':
        return (
          <div
            key={item.uuid}
            className="model-edit-fields-item"
          >
            <Field label={`${item.label}:`}>
              {({ fieldProps, error }) => (
                <>
                  <TextField
                    autoComplete="off"
                    {...fieldProps}
                    placeholder="Введите текст"
                    onChange={(evt) => handleStringField(item.uuid, evt.target.value)}
                    value={item.data.value === null ? item.default_value : item.data.value}
                  />
                  {error && (
                    <ErrorMessage>
                      Введите текст
                    </ErrorMessage>
                  )}
                </>
              )}
            </Field>
            {/*<div className="model-edit-fields-item__label">{item.label}:</div>*/}
            {/*<input*/}
            {/*  type="text"*/}
            {/*  placeholder="Введите текст"*/}
            {/*  className="model-edit-fields-item__input"*/}
            {/*  onChange={(evt) => handleStringField(item.uuid, evt.target.value)}*/}
            {/*  value={item.data.value === null ? item.default_value : item.data.value}*/}
            {/*/>*/}
          </div>
        );
      case 'numeric':
        return (
          <div
            key={item.uuid}
            className="model-edit-fields-item"
          >
            <Field label={`${item.label}:`}>
              {({ fieldProps, error }) => (
                <>
                  <TextField
                    autoComplete="off"
                    {...fieldProps}
                    placeholder="Введите число"
                    onChange={(evt) => handleNumericField(item.uuid, evt.target.value)}
                    value={item.data.value === null ? item.default_value : item.data.value}
                  />
                  {error && (
                    <ErrorMessage>
                      Введите текст
                    </ErrorMessage>
                  )}
                </>
              )}
            </Field>
            {/*<div className="model-edit-fields-item__label">{item.label}:</div>*/}
            {/*<input*/}
            {/*  type="text"*/}
            {/*  placeholder="Введите число"*/}
            {/*  className="model-edit-fields-item__input"*/}
            {/*  onChange={(evt) => handleNumericField(item.uuid, evt.target.value)}*/}
            {/*  value={item.data.value === null ? item.default_value : item.data.value}*/}
            {/*/>*/}
          </div>
        );
      case 'range':
        let valueArr = [];
        if (item.default_value) {
          valueArr = item.default_value.split('-');
        } else {
          valueArr = ['', '']
        }

        return (
          <div
            key={item.uuid}
            className="model-edit-fields-item model-edit-fields-item--range"
          >
            <div className="model-edit-fields-item__label">{item.label}:</div>
            <Field label="От:">
              {({ fieldProps, error }) => (
                <>
                  <TextField
                    autoComplete="off"
                    {...fieldProps}
                    placeholder="Введите число"
                    onChange={(evt) => handleRangeMinField(item.uuid, evt.target.value)}
                    value={item.data.min === null ? valueArr[0] : item.data.min}
                  />
                  {error && (
                    <ErrorMessage>
                      Введите значение
                    </ErrorMessage>
                  )}
                </>
              )}
            </Field>
            <Field label="До:">
              {({ fieldProps, error }) => (
                <>
                  <TextField
                    autoComplete="off"
                    {...fieldProps}
                    placeholder="Введите число"
                    onChange={(evt) => handleRangeMaxField(item.uuid, evt.target.value)}
                    value={item.data.max === null ? valueArr[1] : item.data.max}
                  />
                  {error && (
                    <ErrorMessage>
                      Введите значение
                    </ErrorMessage>
                  )}
                </>
              )}
            </Field>
            {/*<input*/}
            {/*  type="text"*/}
            {/*  placeholder="Значение от"*/}
            {/*  className="model-edit-fields-item__input"*/}
            {/*  onChange={(evt) => handleRangeMinField(item.uuid, evt.target.value)}*/}
            {/*  value={item.data.min === null ? valueArr[0] : item.data.min}*/}
            {/*/>*/}
            {/*<input*/}
            {/*  type="text"*/}
            {/*  placeholder="Значение до"*/}
            {/*  className="model-edit-fields-item__input"*/}
            {/*  onChange={(evt) => handleRangeMaxField(item.uuid, evt.target.value)}*/}
            {/*  value={item.data.max === null ? valueArr[1] : item.data.max}*/}
            {/*/>*/}
          </div>
        );
      case 'checkbox':
        return (
          <div
            key={item.uuid}
            className="model-edit-fields-item model-edit-fields-item--checkbox"
          >
            <label>
              <input
                type="checkbox"
                onChange={(evt) => handleCheckboxField(item.uuid)}
                checked={item.data.value === null ? item.default_value : item.data.value}
              />
              <span className="checkbox"/>
              <div className="model-edit-fields-item__label">{item.label}</div>
            </label>
          </div>
        );
      case 'collection':
        return (
          <div
            key={item.uuid}
            className="model-edit-fields-item model-edit-fields-item--select"
          >
            <DirectoriesSelect
              label={item.label}
              placeholder="Выберите из списка"
              uuid={item.uuid}
              id={item.data.value}
              slug={item.collection_name}
              setCurrentSelect={handleCollectionField}
            />
          </div>
        );
      case 'collection_multiple':
        return (
          <div
            key={item.uuid}
            className="model-edit-fields-item model-edit-fields-item--select"
          >
            <DirectoriesSelectMultiple
              label={item.label}
              placeholder="Выберите из списка"
              uuid={item.uuid}
              idList={item.data.value}
              slug={item.collection_name}
              setCurrentSelect={handleCollectionMultipleField}
            />
          </div>
        );
      case 'select':
        return (
          <div
            key={item.uuid}
            className="model-edit-fields-item model-edit-fields-item--select"
          >
            <FormSelect
              label={item.label}
              placeholder="Выберите из списка"
              uuid={item.uuid}
              id={item.data.value}
              selectList={item.options === undefined ? [] : item.options}
              setCurrentSelect={handleSelectField}
            />
          </div>
        );
      case 'select_multiple':
        return (
          <div
            key={item.uuid}
            className="model-edit-fields-item model-edit-fields-item--select"
          >
            <FormSelectMultiple
              label={item.label}
              placeholder="Выберите из списка"
              uuid={item.uuid}
              idList={item.data.value}
              selectList={item.options === undefined ? [] : item.options}
              setCurrentSelect={handleSelectField}
            />
          </div>
        );
      case 'file':
        return (
          <div
            key={item.uuid}
            className="model-edit-fields-item model-edit-fields-item--file"
          >
            <div className="model-edit-fields-item__label">{item.label}:</div>
            <label>
              <input
                type="file"
                className="model-edit-fields-item__input"
                onChange={(evt) => handleFileField(item.uuid, evt.target.files[0])}
              />
              <div className="model-edit-fields-item-file">
                <div
                  className={`model-edit-fields-item-file__placeholder${item.data.value ? ' fill' : ''}`}
                >{item.data.value ? item.data.value.data.attributes.filename : 'Выберите файл'}</div>
              </div>
            </label>
          </div>
        );
      case 'folder':
        return (
          <div
            key={item.uuid}
            className="model-edit-fields-item model-edit-fields-item--folder"
          >
            <div className="model-edit-fields-item__label">{item.label}:</div>
          </div>
        );
    }
  };

  const modelFields = [];

  fieldsList.forEach((item) => {
    if (item.type === 'folder') {
      const childList = [];
      item.children.forEach((childItem) => {
        childList.push(generateFieldItem(childItem));
      });
      modelFields.push(
        <div
          key={item.uuid}
          className="model-edit-fields-item-folder"
        >
          <div className="model-edit-fields-item-folder__label">{item.label}:</div>
          {item.children.length > 0 ? (
            <div className="model-edit-fields-item-folder__list">
              {childList}
            </div>
          ) : ''}
        </div>
      );
    } else {
      modelFields.push(generateFieldItem(item));
      if (item.children) {
        item.children.forEach((childItem) => {
          modelFields.push(generateFieldItem(childItem));
        });
      }
    }
  });

  return (
    <Modal
      headerData={headerData}
      onClose={onClose}
      isWide={true}
    >
      <div className="model-edit">
        <div className="model-edit-name custom-form">
          <Field name="name" label="Название:" isRequired>
            {({ fieldProps, error }) => (
              <>
                <TextField
                  autoComplete="off"
                  {...fieldProps}
                  placeholder="Название модели"
                  onChange={(evt) => setName(evt.target.value)}
                  value={name}
                />
                {error && (
                  <ErrorMessage>
                    Введите название модели
                  </ErrorMessage>
                )}
              </>
            )}
          </Field>
        </div>
        <div className="model-edit-fields custom-form">
          {modelFields}
        </div>
      </div>
    </Modal>
  );
};

export default ManufacturersModelsEdit;
