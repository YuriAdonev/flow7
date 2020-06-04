import React, {useState, useEffect, useRef, useContext} from 'react';

import './devices-add.scss';

import Modal from '../../../../components/modal/modal';
import useFetch from '../../../../hooks/use-fetch';
import {CurrentUserContext} from "../../../../contexts/current-user";
import TextField from "@atlaskit/textfield";
import {ErrorMessage, Field} from "@atlaskit/form";

const DevicesAdd = ({ onClose, reloadTable }) => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [nameEmpty, setNameEmpty] = useState(false);
  const [serialNumberEmpty, setSerialNumberEmpty] = useState(false);
  const [{response: itemSaveResponse, isLoading: itemSaveIsLoading, error: itemSaveError}, doFetchItemSave] = useFetch(`/devices/devices`);
  const nameInput = useRef(null);
  const serialNumberInput = useRef(null);

  const headerData = {
    title: 'Добавление устройства',
    breadcrumbsList: [
      {
        name: currentUserState.currentSite ? currentUserState.currentSite.name : ' ',
        link: '/'
      },
      {
        name: 'Устройства',
        link: '/'
      },
    ],
  };

  // useEffect(() => {
  //   nameInput.current.focus();
  // }, []);

  useEffect(() => {
    if (itemSaveResponse) {
      onClose();
    }
    reloadTable();
  }, [itemSaveResponse]);

  const onSaveClick = () => {
    if (name === '') {
      setNameEmpty(true);
      nameInput.current.focus();
    } else {
      if (serialNumber === '') {
        setSerialNumberEmpty(true);
        serialNumberInput.current.focus();
      } else {
        doFetchItemSave({
          method: 'POST',
          data: {
            data: {
              name: name,
              serial_number: serialNumber
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
      <div className="device-edit custom-form">
        <div className="device-edit__item">
          <Field name="name" label="Имя для устройства:" defaultValue={name}>
            {({ fieldProps, error }) => (
              <>
                <TextField
                  autoComplete="off"
                  {...fieldProps}
                  placeholder="Введите имя для вашего устройства"
                  onChange={(evt) => setName(evt.target.value)}
                  value={name}
                />
                {error && (
                  <ErrorMessage>
                    This user name is already in use, try another one.
                  </ErrorMessage>
                )}
              </>
            )}
          </Field>
        </div>
        <div className="device-edit__item">
          <Field name="serialNumber" label="Серийный номер:" isRequired>
            {({ fieldProps, error }) => (
              <>
                <TextField
                  autoComplete="off"
                  {...fieldProps}
                  placeholder="Введите серийный номер"
                  onChange={(evt) => setSerialNumber(evt.target.value)}
                  value={serialNumber}
                />
                {error && (
                  <ErrorMessage>
                    This user name is already in use, try another one.
                  </ErrorMessage>
                )}
              </>
            )}
          </Field>
        </div>
      </div>
      <button
        className="device-edit__btn btn"
        type="button"
        onClick={onSaveClick}
      >Добавить</button>
    </Modal>
  );
};

export default DevicesAdd;
