import React, {useState, useEffect, useRef, useContext} from 'react';

import './account-organizations-edit.scss';

import Modal from '../../../../components/modal/modal';
import useFetch from '../../../../hooks/use-fetch';
import ProfileFormValue
  from '../../../../components/profile-form-value/profile-form-value';
import {CurrentUserContext} from '../../../../contexts/current-user';

const AccountOrganizationsEdit = ({ itemId, onClose, reloadTable }) => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [formData, setFormData] = useState('');
  const [editItem, setEditItem] = useState('');
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [timezone, setTimezone] = useState('');
  const [imageId, setImageId] = useState('');

  const [{response, isLoading, error}, doFetchTableData] = useFetch('/users/sites', true);
  const [{response: userResponse}, doFetchUser] = useFetch('/users/account', true);
  const [{response: itemUpdateResponse, isLoading: itemUpdateIsLoading, error: itemUpdateError}, doFetchItemUpdate] = useFetch(`/users/sites/${itemId}`, true);
  const [{response: itemSaveResponse, isLoading: itemSaveIsLoading, error: itemSaveError}, doFetchItemSave] = useFetch(`/users/sites`, true);
  const [{response: imageUploadResponse, isLoading: imageUploadIsLoading, error: imageUploadError}, doFetchImageUpload] = useFetch(`/uploads`, true);

  const isNewItem = itemId === 'new';

  const headerData = {
    title: isNewItem ? 'Создание' : 'Редактирование',
    breadcrumbsList: [
      {
        name: 'Организации',
        link: '/'
      },
    ],
  };

  useEffect(() => {
    setFormData(new FormData());
    if (!isNewItem) {
      doFetchTableData();
    }
  }, []);

  useEffect(() => {
    if (!response) {
      return;
    }
    const organization = response.data.find(item => item.id === itemId);
    setName(organization.attributes.name);
    setShortName(organization.attributes.name);
    setSubdomain(organization.attributes.subdomain);
    setImageId(organization.attributes.image.id ? organization.attributes.image.id : '');
  }, [response]);

  useEffect(() => {
    if (!imageUploadResponse) {
      return;
    }
    doFetchItemUpdate({
      method: 'PUT',
      data: {
        data: {
          image: { ...imageUploadResponse.data },
        }
      }
    });
  }, [imageUploadResponse]);

  useEffect(() => {
    if (!itemUpdateResponse) {
      return;
    }
    if (!itemSaveResponse) {
      return;
    }
    doFetchUser();
    doFetchTableData();
  }, [itemUpdateResponse, itemSaveResponse]);

  useEffect(() => {
    if (!userResponse) {
      return;
    }
    setCurrentUserState(state => ({
      ...state,
      sites: userResponse.data.attributes.sites,
    }));
  }, [userResponse]);

  useEffect(() => {
    if (itemSaveResponse) {
      onClose();
    }
    reloadTable();
  }, [itemSaveResponse]);

  const onFileChoice = (value) => {
    formData.set('attachment', value);
    doFetchImageUpload({
      method: 'POST',
      data: formData
    });
  };

  const onSaveClick = () => {
    if (isNewItem) {
      doFetchItemSave({
        method: 'POST',
        data: {
          data: {
            name: name,
            subdomain: subdomain,
          }
        }
      });
    } else {
      doFetchItemUpdate({
        method: 'PUT',
        data: {
          data: {
            name: name,
            subdomain: subdomain,
          }
        }
      });
    }
  };

  return (
    <Modal
      headerData={headerData}
      onClose={onClose}
      isWide={true}
    >
      <div className="organizations-edit">
        <div className="organizations-edit-avatar">
          <div className="organizations-edit-avatar__img">
            {imageId === '' ? '' : (
              <img src={`https://staging.labsflow.ru/api/v1/uploads/${imageId}`} alt=""/>
            )}
          </div>
          <label className="organizations-edit-avatar__label">
            <span>Сменить аватар</span>
            <input
              type="file"
              className="organizations-edit-avatar__file"
              onChange={(evt) => onFileChoice(evt.target.files[0])}
            />
          </label>
        </div>
        <div className="organizations-edit-form">
          <div className="organizations-edit-form__name">
            <div className="organizations-edit-form__row">
              <div className="organizations-edit-form__label">Название:</div>
              <ProfileFormValue
                editItem={editItem}
                setEditItem={setEditItem}
                name="name"
                value={name}
                isPassword={false}
                handleChange={setName}
              />
            </div>
            <div className="organizations-edit-form__row">
              <div className="organizations-edit-form__label">Сокращенное название:</div>
              <ProfileFormValue
                editItem={editItem}
                setEditItem={setEditItem}
                name="shortName"
                value={shortName}
                isPassword={false}
                handleChange={setShortName}
              />
            </div>
            <div className="organizations-edit-form__row">
              <div className="organizations-edit-form__label">Поддомен:</div>
              <ProfileFormValue
                editItem={editItem}
                setEditItem={setEditItem}
                name="subdomain"
                value={subdomain}
                isPassword={false}
                handleChange={setSubdomain}
                url=".staging.labsflow.ru"
              />
            </div>
            <div className="organizations-edit-form__row">
              <div className="organizations-edit-form__label">Часовой пояс:</div>
              <ProfileFormValue
                editItem={editItem}
                setEditItem={setEditItem}
                name="timezone"
                value={timezone}
                isPassword={false}
                handleChange={setTimezone}
              />
            </div>
          </div>

          <button
            className="organizations-edit-form__btn btn"
            type="button"
            onClick={onSaveClick}
          >Сохранить</button>
        </div>
      </div>
    </Modal>
  );
};

export default AccountOrganizationsEdit;
