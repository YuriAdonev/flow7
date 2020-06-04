import React, {useState, useEffect, useRef, useContext} from 'react';

import './structure-edit.scss';

import Modal from '../../../../components/modal/modal';
import useFetch from '../../../../hooks/use-fetch';
import {CurrentUserContext} from "../../../../contexts/current-user";
import AccountingSelect from "../../../../components/form/accounting-select/accounting-select";
import AccountingSelectSearch from "../../../../components/form/accounting-select-search/accounting-select-search";
import TextField from "@atlaskit/textfield";
import {ErrorMessage, Field} from "@atlaskit/form";

const StructureEdit = ({ itemId, onClose, reloadTable, parentId, structureList }) => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [nameEmpty, setNameEmpty] = useState(false);
  const [cipher, setCipher] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState({});
  const [currentParentId, setCurrentParentId] = useState(null);
  const [newStructureList, setNewStructureList] = useState([]);

  const [{response, isLoading, error}, doFetchItem] = useFetch(`/directories/divisions/${itemId}`);
  const [{response: itemUpdateResponse, isLoading: itemUpdateIsLoading, error: itemUpdateError}, doFetchItemUpdate] = useFetch(`/directories/divisions/${itemId}`);
  const [{response: itemSaveResponse, isLoading: itemSaveIsLoading, error: itemSaveError}, doFetchItemSave] = useFetch(`/directories/divisions`);
  const [{response: fileUploadResponse, isLoading: fileUploadIsLoading, error: fileUploadError}, doFetchFileUpload] = useFetch(`/uploads`, true);

  // const nameInput = useRef(null);
  const isNewItem = itemId === 'new';

  const headerData = {
    title: isNewItem ? 'Создание' : 'Редактирование',
    breadcrumbsList: [
      {
        name: currentUserState.currentSite ? currentUserState.currentSite.name : '',
        link: '/'
      },
      {
        name: 'Персонал',
        link: '/staff'
      },
      {
        name: 'Структура организации',
        link: '/staff/structure'
      },
    ],
  };

  useEffect(() => {
    if (isNewItem) {
      setCurrentParentId(parentId);
      return;
    }
    doFetchItem();
    const currentIndex = structureList.findIndex(it => it.id === itemId);
    const before = structureList.slice(0, currentIndex);
    const after = structureList.slice(currentIndex + 1);
    setNewStructureList([...before, ...after]);
  }, []);

  useEffect(() => {
    if (!response) {
      return;
    }
    const itemData = response.data.attributes;
    setName(itemData.name);
    setCipher(itemData.cipher);
    setOrderNumber(itemData.order_number);
    setOrder(itemData.attachment);
    setCurrentParentId(itemData.parent_id);
  }, [response]);

  useEffect(() => {
    if (itemUpdateResponse) {
      onClose();
    }
    if (itemSaveResponse) {
      onClose();
    }
    reloadTable();
  }, [itemUpdateResponse, itemSaveResponse]);

  useEffect(() => {
    if (!fileUploadResponse) {
      return;
    }
    setOrder({ ...fileUploadResponse });
  }, [fileUploadResponse, fileUploadIsLoading]);

  const handleFileField = (file) => {
    const formData = new FormData();
    formData.set('attachment', file);
    doFetchFileUpload({
      method: 'POST',
      data: formData
    });
  };

  const onSaveClick = () => {
    if (name === '') {
      setNameEmpty(true);
    } else {
      if (isNewItem) {
        doFetchItemSave({
          method: 'POST',
          data: {
            data: {
              name: name,
              parent_id: Number(currentParentId),
              cipher: cipher,
              attachment: order,
              order_number: orderNumber
            }
          }
        });
      } else {
        doFetchItemUpdate({
          method: 'PUT',
          data: {
            data: {
              name: name,
              parent_id: Number(currentParentId),
              cipher: cipher,
              attachment: order,
              order_number: orderNumber
            }
          }
        });
      }
    }
  };

  return (
    <Modal
      headerData={headerData}
      onClose={onClose}
      isWide={true}
    >
      <div className="structure-edit">
        <div className="structure-edit__wrap">
          <ul className="structure-edit-fields custom-form">
            <li className="structure-edit-fields-item">
              <Field name="name" label="Название структурного подразделения:" isRequired>
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
                        Введите название структурного подразделения
                      </ErrorMessage>
                    )}
                  </>
                )}
              </Field>
            </li>
            <li className="structure-edit-fields-item">
              <Field name="cipher" label="Код или шифр:" isRequired>
                {({ fieldProps, error }) => (
                  <>
                    <TextField
                      autoComplete="off"
                      {...fieldProps}
                      placeholder="Код или шифр"
                      onChange={(evt) => setCipher(evt.target.value)}
                      value={cipher}
                    />
                    {error && (
                      <ErrorMessage>
                        Введите код или шифр
                      </ErrorMessage>
                    )}
                  </>
                )}
              </Field>
            </li>
            <li className="structure-edit-fields-item">
              <Field name="orderNumber" label="Номер приказа:" isRequired>
                {({ fieldProps, error }) => (
                  <>
                    <TextField
                      autoComplete="off"
                      {...fieldProps}
                      placeholder="Номер приказа"
                      onChange={(evt) => setOrderNumber(evt.target.value)}
                      value={orderNumber}
                    />
                    {error && (
                      <ErrorMessage>
                        Введите номер приказа
                      </ErrorMessage>
                    )}
                  </>
                )}
              </Field>
            </li>
            <li className="structure-edit-fields-item structure-edit-fields-item--file">
              <div className="structure-edit-fields-item__label">Файл приказ о создании:</div>
              <div className="structure-edit-fields-item-file">
                <div className="structure-edit-fields-item-file__icon">
                  <label>
                    <input
                      type="file"
                      className="structure-edit-fields-item__input"
                      onChange={(evt) => handleFileField(evt.target.files[0])}
                    />
                    <svg width="16" height="12" viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.34375 6.65625H11.3438L8 3.34375L4.65625 6.65625H6.65625V9.34375H9.34375V6.65625ZM12.9062 4.6875C13.7604 4.75 14.4896 5.10417 15.0938 5.75C15.6979 6.375 16 7.125 16 8C16 8.91667 15.6667 9.70833 15 10.375C14.3542 11.0208 13.5729 11.3438 12.6562 11.3438H4C2.89583 11.3438 1.94792 10.9583 1.15625 10.1875C0.385417 9.39583 0 8.44792 0 7.34375C0 6.32292 0.34375 5.4375 1.03125 4.6875C1.71875 3.91667 2.5625 3.47917 3.5625 3.375C4 2.5625 4.61458 1.90625 5.40625 1.40625C6.19792 0.90625 7.0625 0.65625 8 0.65625C9.20833 0.65625 10.2708 1.04167 11.1875 1.8125C12.1042 2.5625 12.6771 3.52083 12.9062 4.6875Z"/>
                    </svg>
                  </label>
                </div>
                {order.data === undefined ? (
                  <div
                    className={`structure-edit-fields-item-file__placeholder`}
                  >
                    Выберите файл
                  </div>
                ) : (
                  <div
                    className={`structure-edit-fields-item-file__placeholder fill`}
                  >
                    <a href={`${process.env.REACT_APP_API_HTTP + process.env.REACT_APP_API_BASE_URL}/uploads/${order.data.id}`} target="_blank">{order.data.attributes.filename}</a>
                  </div>
                )}
              </div>
            </li>
            {isNewItem ? '' : (
              <li className="structure-edit-fields-item">
                <div className="structure-edit-fields-item__label">Переместить в:</div>
                <AccountingSelectSearch
                  selectedId={currentParentId}
                  placeholder="Выберите"
                  setCurrentSelect={setCurrentParentId}
                  selectList={newStructureList}
                  empty={false}
                />
              </li>
            )}
          </ul>
          <button
            className="structure-edit__btn btn"
            type="button"
            onClick={onSaveClick}
          >Сохранить</button>
        </div>
      </div>
    </Modal>
  );
};

export default StructureEdit;
