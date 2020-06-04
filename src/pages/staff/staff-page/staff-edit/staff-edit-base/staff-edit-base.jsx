import React, {useState, useEffect, useContext} from 'react';
// import {DatePicker} from "element-react";
import { Label } from '@atlaskit/field-base';
import { DatePicker } from '@atlaskit/datetime-picker';

import useFetch from "../../../../../hooks/use-fetch";
import {CurrentUserContext} from "../../../../../contexts/current-user";
import TextField from "@atlaskit/textfield";
import {ErrorMessage, Field} from "@atlaskit/form";

const StaffEditBase = ({ itemId, currentItem }) => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [secondName, setSecondName] = useState('');
  const [secondNameEmpty, setSecondNameEmpty] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [firstNameEmpty, setFirstNameEmpty] = useState(false);
  const [middleName, setMiddleName] = useState('');
  const [middleNameEmpty, setMiddleNameEmpty] = useState(false);
  const [birthday, setBirthday] = useState(null);
  const [birthdayEmpty, setBirthdayEmpty] = useState(false);
  const [personnelNumber, setPersonnelNumber] = useState('');
  const [personnelNumberEmpty, setPersonnelNumberEmpty] = useState(false);
  const [formData, setFormData] = useState(null);
  const [photoId, setPhotoId] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [{response: saveResponse, isLoading: saveIsLoading, error: saveError}, doFetchItemSave] = useFetch(`/directories/personnels`);
  const [{response: updateResponse, isLoading: updateIsLoading, error: updateError}, doFetchItemUpdate] = useFetch(`/directories/personnels/${itemId}`);
  const [{response: imageUploadResponse, isLoading: imageUploadIsLoading, error: imageUploadError}, doFetchImageUpload] = useFetch(`/uploads`, true);

  const isNewItem = itemId === 'new';

  useEffect(() => {
    if (isNewItem) {
      return;
    }
    setFirstName(currentItem.attributes.first_name);
    setSecondName(currentItem.attributes.last_name);
    setMiddleName(currentItem.attributes.middle_name);
    setBirthday(currentItem.attributes.birth_date === null ? null : new Date(currentItem.attributes.birth_date));
    setPersonnelNumber(currentItem.attributes.personnel_number);
    setPhoto(currentItem.attributes.image);
    setPhotoId(currentItem.attributes.image.id);
  }, []);

  useEffect(() => {
    if (!imageUploadResponse) {
      return;
    }
    setPhotoId(imageUploadResponse.data.id);
    setPhoto(imageUploadResponse.data);
  }, [imageUploadResponse]);

  const onFileChoice = (value) => {
    const formData = new FormData();
    formData.set('attachment', value);
    doFetchImageUpload({
      method: 'POST',
      data: formData
    });
  };

  const onSaveClick = () => {
    if (secondName === '' || firstName === '' || middleName === '' || birthday === '' || personnelNumber === '') {
      if (secondName === '') {
        setSecondNameEmpty(true);
      }
      if (firstName === '') {
        setFirstNameEmpty(true);
      }
      if (middleName === '') {
        setMiddleNameEmpty(true);
      }
      if (birthday === '') {
        setBirthdayEmpty(true);
      }
      if (personnelNumber === '') {
        setPersonnelNumberEmpty(true);
      }
    } else {
      const item = {
        data: {
          first_name: firstName,
          last_name: secondName,
          middle_name: middleName,
          birth_date: birthday === null ? null : `${new Date(birthday).getFullYear()}-${new Date(birthday).getMonth() + 1}-${new Date(birthday).getDate()}`,
          personnel_number: personnelNumber,
          image: photo
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

  return (
    <div className="staff-edit">
      <div className="staff-edit__wrap">
        <div className="staff-edit-avatar">
          <div className="staff-edit-avatar__img">
            {photoId === null || photoId === undefined ? '' : (
              <img src={`${process.env.REACT_APP_API_HTTP + process.env.REACT_APP_API_BASE_URL}/uploads/${photoId}`} alt=""/>
            )}
          </div>
          <label>
            <input
              type="file"
              className="staff-edit-avatar__file"
              onChange={(evt) => onFileChoice(evt.target.files[0])}
            />
            <div className="staff-edit-avatar__upload">Загрузить</div>
          </label>
        </div>
        <ul className="staff-edit-fields custom-form">
          <li className="staff-edit-fields-item">
            <Field name="secondName" label="Фамилия:" isRequired>
              {({ fieldProps, error }) => (
                <>
                  <TextField
                    autoComplete="off"
                    {...fieldProps}
                    placeholder="Фамилия сотрудника"
                    onChange={(evt) => setSecondName(evt.target.value)}
                    value={secondName}
                  />
                  {error && (
                    <ErrorMessage>
                      Введите фамилию сотрудника
                    </ErrorMessage>
                  )}
                </>
              )}
            </Field>
          </li>
          <li className="staff-edit-fields-item">
            <Field name="firstName" label="Имя:" isRequired>
              {({ fieldProps, error }) => (
                <>
                  <TextField
                    autoComplete="off"
                    {...fieldProps}
                    placeholder="Имя сотрудника"
                    onChange={(evt) => setFirstName(evt.target.value)}
                    value={firstName}
                  />
                  {error && (
                    <ErrorMessage>
                      Введите имя сотрудника
                    </ErrorMessage>
                  )}
                </>
              )}
            </Field>
          </li>
          <li className="staff-edit-fields-item">
            <Field name="middleName" label="Отчество:">
              {({ fieldProps, error }) => (
                <>
                  <TextField
                    autoComplete="off"
                    {...fieldProps}
                    placeholder="Отчество сотрудника"
                    onChange={(evt) => setMiddleName(evt.target.value)}
                    value={middleName}
                  />
                </>
              )}
            </Field>
          </li>
          <li className="staff-edit-fields-item">
            <Label htmlFor="react-select-datepicker-1--input" label="Дата рождения:" />
            <DatePicker
              onChange={setBirthday}
              value={birthday}
              locale="ru-RU"
            />
            {/*<div className="staff-edit-fields-item__label">Дата рождения:</div>*/}
            {/*<DatePicker*/}
            {/*  onChange={setBirthday}*/}
            {/*  format="dd.MM.yyyy"*/}
            {/*  placeholder="Выберите дату"*/}
            {/*  value={birthday}*/}
            {/*  empty={false}*/}
            {/*/>*/}
          </li>
          <li className="staff-edit-fields-item">
            <Field name="personnelNumber" label="Номер / Табельный номер:" isRequired>
              {({ fieldProps, error }) => (
                <>
                  <TextField
                    autoComplete="off"
                    {...fieldProps}
                    placeholder="Табельный номер"
                    onChange={(evt) => setPersonnelNumber(evt.target.value)}
                    value={personnelNumber}
                  />
                  {error && (
                    <ErrorMessage>
                      Введите номер сотрудника
                    </ErrorMessage>
                  )}
                </>
              )}
            </Field>
          </li>
        </ul>
      </div>
      <button
        className="staff-edit__btn btn"
        type="button"
        onClick={onSaveClick}
      >Сохранить</button>
    </div>
  )
};

export default StaffEditBase;
