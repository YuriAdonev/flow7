import React, { useContext, useEffect, useState } from 'react';

import './account-profile.scss';

import ProfileFormValue from '../../../../../components/profile-form-value/profile-form-value';
import useFetch from '../../../../../hooks/use-fetch';
import { CurrentUserContext } from '../../../../../contexts/current-user';

const AccountProfile = () => {
  const [, setCurrentUserState] = useContext(CurrentUserContext);
  const [formData, setFormData] = useState('');
  const [editItem, setEditItem] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [imageId, setImageId] = useState('');

  const [{response, isLoading, error}, doFetchUser] = useFetch('/users/account', true);
  const [{response: itemUpdateResponse, isLoading: itemUpdateIsLoading, error: itemUpdateError}, doFetchUserSave] = useFetch(`/users/account`, true);
  const [{response: imageUploadResponse, isLoading: imageUploadIsLoading, error: imageUploadError}, doFetchImageUpload] = useFetch(`/uploads`, true);

  useEffect(() => {
    setFormData(new FormData());
    doFetchUser();
  }, []);

  useEffect(() => {
    if (!response) {
      return
    }
    const user = response.data.attributes;
    setFirstName(user.first_name === null ? '' : user.first_name);
    setMiddleName(user.middle_name === null ? '' : user.middle_name);
    setLastName(user.last_name === null ? '' : user.last_name);
    setEmail(user.email === null ? '' : user.email);
    setPassword(user.password === null ? '' : user.password);
    setPhone(user.phone === null ? '' : user.phone);
    setOrganization(user.organization === null ? '' : user.organization);
    setImageId(user.image.id === null ? '' : user.image.id)
    setCurrentUserState(state => ({
      ...state,
      currentUser: response.data,
    }));
  }, [response]);

  useEffect(() => {
    if (!imageUploadResponse) {
      return;
    }
    doFetchUserSave({
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
    doFetchUser();
    setCurrentUserState(state => ({
      ...state,
      isLoading: true
    }));
  }, [itemUpdateResponse]);

  const onFileChoice = (value) => {
    formData.set('attachment', value);
    doFetchImageUpload({
      method: 'POST',
      data: formData
    });
  };

  const onSaveClick = () => {
    doFetchUserSave({
      method: 'PUT',
      data: {
        data: {
          "email": email,
          "first_name": firstName,
          "middle_name": middleName,
          "last_name": lastName,
          "phone": phone,
          "organization": organization,
        }
      }
    });
  };

  return (
    <div className="account-profile">
      <div className="account-profile-avatar">
        <div className="account-profile-avatar__img">
          {imageId === '' ? '' : (
            <img src={`${process.env.REACT_APP_API_HTTP + process.env.REACT_APP_API_BASE_URL}/uploads/${imageId}`} alt=""/>
          )}
        </div>
        <label className="account-profile-avatar__label">
          <span>Сменить аватар</span>
          <input
            type="file"
            className="account-profile-avatar__file"
            onChange={(evt) => onFileChoice(evt.target.files[0])}
          />
        </label>
      </div>
      <div className="account-profile-form">
        <div className="account-profile-form__name">
          <div className="account-profile-form__row">
            <div className="account-profile-form__label">Имя:</div>
            <ProfileFormValue
              editItem={editItem}
              setEditItem={setEditItem}
              name="firstName"
              value={firstName}
              isPassword={false}
              handleChange={setFirstName}
            />
          </div>
          <div className="account-profile-form__row">
            <div className="account-profile-form__label">Фамилия:</div>
            <ProfileFormValue
              editItem={editItem}
              setEditItem={setEditItem}
              name="lastName"
              value={lastName}
              isPassword={false}
              handleChange={setLastName}
            />
          </div>
          <div className="account-profile-form__row">
            <div className="account-profile-form__label">Отчество:</div>
            <ProfileFormValue
              editItem={editItem}
              setEditItem={setEditItem}
              name="middleName"
              value={middleName}
              isPassword={false}
              handleChange={setMiddleName}
            />
          </div>
        </div>

        <div className="account-profile-form__row">
          <div className="account-profile-form__label">E-mail:</div>
          <ProfileFormValue
            editItem={editItem}
            setEditItem={setEditItem}
            name="email"
            value={email}
            isPassword={false}
            handleChange={setEmail}
          />
        </div>

        <div className="account-profile-form__row">
          <div className="account-profile-form__label">Пароль:</div>
          <ProfileFormValue
            editItem={editItem}
            setEditItem={setEditItem}
            name="password"
            value={password}
            isPassword={true}
            handleChange={setPassword}
          />
        </div>

        <div className="account-profile-form__row">
          <div className="account-profile-form__label">Телефон:</div>
          <ProfileFormValue
            editItem={editItem}
            setEditItem={setEditItem}
            name="phone"
            value={phone}
            isPassword={false}
            handleChange={setPhone}
          />
        </div>

        <button
          className="account-profile-form__btn btn"
          type="button"
          onClick={onSaveClick}
        >Сохранить</button>
      </div>
    </div>
  );
};

export default AccountProfile;
