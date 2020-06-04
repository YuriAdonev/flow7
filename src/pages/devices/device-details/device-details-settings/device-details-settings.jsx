import React, { useState, useEffect } from 'react';
import TextField from '@atlaskit/textfield';
import Form, {
  CheckboxField,
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage,
  ValidMessage,
} from '@atlaskit/form';

import './device-details-settings.scss';
import DeviceDetailsSettingsTable from "./device-details-settings-table/device-details-settings-table";

const convertDate = (date) => {
  const initializedAt = Date.parse(date);
  let initializedAtDay = new Date(initializedAt).getDate();
  let initializedAtMonth = new Date(initializedAt).getMonth() + 1;
  const initializedAtYear = new Date(initializedAt).getFullYear();

  if (initializedAtDay < 10) {
    initializedAtDay = '0' + initializedAtDay;
  }

  if (initializedAtMonth < 10) {
    initializedAtMonth = '0' + initializedAtMonth;
  }
  return `${initializedAtDay}.${initializedAtMonth}.${initializedAtYear}`
};

const DeviceDetailsSettings = ({ currentItem, sensorTypes }) => {
  const [name, setName] = useState(currentItem.attributes.name);
  const [serialNumber, setSerialNumber] = useState(currentItem.attributes.serial_number);
  const [firmwareVersion, setFirmwareVersion] = useState(currentItem.attributes.firmware_version);
  const [initializedDate, setInitializedDate] = useState(convertDate(currentItem.attributes.initialized_at));
  const [sortedBy, setSortedBy] = useState('serialNumber');
  const [sortedDown, setSortedDown] = useState(true);

  const onSortClick = (name) => {
    if (name === sortedBy) {
      setSortedDown(!sortedDown);
    }
    if (name !== sortedBy) {
      setSortedBy(name);
      setSortedDown(true);
    }
  };

  console.log('currentItem', currentItem);

  return (
    <div className="device-details-settings">
      <div className="device-details-settings-base">
        <div className="device-details-settings-base__wrap custom-form">
          <div className="device-details-settings-base__row">
            <div className="device-details-settings-base__item">
              <Field name="name" label="Имя устройства:">
                {({ fieldProps, error }) => (
                  <>
                    <TextField
                      autoComplete="off"
                      {...fieldProps}
                      onChange={(evt) => setName(evt.target.value)}
                      value={name === null ? '' : name}
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
            <div className="device-details-settings-base__item">
              <Field name="serialNumber" label="Серийный номер:" isRequired>
                {({ fieldProps, error }) => (
                  <>
                    <TextField
                      autoComplete="off"
                      {...fieldProps}
                      onChange={(evt) => setSerialNumber(evt.target.value)}
                      value={serialNumber === null ? '' : serialNumber}
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
          <div className="device-details-settings-base__row">
            <div className="device-details-settings-base__item">
              <Field name="initializedDate" label="Прошивка:">
                {({ fieldProps, error }) => (
                  <>
                    <TextField
                      autoComplete="off"
                      {...fieldProps}
                      onChange={(evt) => setFirmwareVersion(evt.target.value)}
                      value={firmwareVersion === null ? '' : firmwareVersion}
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
            <div className="device-details-settings-base__item">
              <div className="device-details-settings-base__label">Дата установки:</div>
              <input
                type="text"
                placeholder="Дата установки"
                className={`device-details-settings-base__input`}
                onChange={(evt) => setInitializedDate(evt.target.value)}
                value={initializedDate}
              />
            </div>
          </div>
          <button className="device-details-settings-base__reload btn">Перезагрузить</button>
        </div>
      </div>
      <div className="device-details-settings-sensors">
        <div className="device-details-settings-sensors__wrap">
          <div className="device-details-settings-sensors__title">Датчики</div>
          <div className="device-details-settings-sensors__desc">Список датчиков на устройстве</div>
        </div>
        <DeviceDetailsSettingsTable
          sortedBy={sortedBy}
          sortedDown={sortedDown}
          onSortClick={onSortClick}
          tableData={currentItem.attributes.slots}
          sensorTypes={sensorTypes}
        />
      </div>
    </div>
  )
};

export default DeviceDetailsSettings;
