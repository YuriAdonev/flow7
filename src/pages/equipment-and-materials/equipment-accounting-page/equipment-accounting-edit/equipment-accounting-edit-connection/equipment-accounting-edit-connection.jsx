import React, { useState, useEffect } from 'react';
import Spinner from "../../../../../components/spinner/spinner";
import AccountingSelect from "../../../../../components/form/accounting-select/accounting-select";
import EquipmentAccountingEditSensors from "../equipment-accounting-edit-sensors/equipment-accounting-edit-sensors";
import useFetch from "../../../../../hooks/use-fetch";
import AccountingSelectSearch from "../../../../../components/form/accounting-select-search/accounting-select-search";
import EquipmentAccountingTable from "../../equipment-accounting-table/equipment-accounting-table";
import {Label} from "@atlaskit/field-base";
import { DatePicker } from '@atlaskit/datetime-picker';
import TextField from "@atlaskit/textfield";
import {ErrorMessage, Field} from "@atlaskit/form";
import Select from "@atlaskit/select";

const EquipmentAccountingEditConnection = ({ itemId, devicesList }) => {
  const [connectedDate, setConnectedDate] = useState(new Date());
  const [device, setDevice] = useState('');
  const [sensor, setSensor] = useState(null);
  const [idleLevel, setIdleLevel] = useState('');
  const [sensorList, setSensorList] = useState([]);
  const [devicesOptions, setDevicesOptions] = useState([]);
  const [sensorEmpty, setSensorEmpty] = useState(false);
  const [deviceEmpty, setDeviceEmpty] = useState(false);
  const [connectedDateEmpty, setConnectedDateEmpty] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSensor, setCurrentSensor] = useState(null);
  const [sortedBy, setSortedBy] = useState('at');
  const [sortedDown, setSortedDown] = useState(true);

  const [{response: sensorsResponse, isLoading: sensorsIsLoading, error: sensorsError}, doFetchSensors] = useFetch(`/devices/devices/${device}`);
  const [{response: saveConnectedResponse, isLoading: saveConnectedIsLoading, error: saveConnectedError}, doFetchConnectedSave] = useFetch(`/directories/equipment_items/${itemId}/sensors`);
  const [{response: tableDataResponse, isLoading: tableDataIsLoading, error: tableDataError}, doFetchTableData] = useFetch(`/directories/equipment_items/${itemId}/sensors`);
  const [{response: deleteResponse, isLoading: deleteIsLoading, error: deleteError}, doFetchDelete] = useFetch(`/directories/equipment_items/${itemId}/sensors/${currentSensor}`);

  useEffect(() => {
    doFetchTableData();
    const newDevicesList = [];
    devicesList.forEach(item => {
      newDevicesList.push({
        label: item.attributes.serial_number,
        value: item.id
      })
    });
    setDevicesOptions(newDevicesList);
  }, []);

  useEffect(() => {
    if (!tableDataResponse) {
      return;
    }
    const newTableData = [];
    tableDataResponse.data.forEach(it => {
      const newDate = new Date(it.attributes.equipment_item_connected_at).getTime();
      newTableData.push({
        id: it.id,
        attributes: {
          date: `${new Date(newDate).getDate() < 10 ? '0' + new Date(newDate).getDate() : new Date(newDate).getDate()}.${new Date(newDate).getMonth() < 9 ? '0' + (new Date(newDate).getMonth() + 1) : new Date(newDate).getMonth() + 1}.${new Date(newDate).getFullYear()}`,
          device: it.attributes.slot_name,
          serialNumber: it.attributes.device_serial_number,
          type: it.attributes.sensor_type.name,
          idle_level: it.attributes.idle_level,
          equipment: it.attributes.equipment_item_id.toString() === itemId ? 'Текущее' : '',
          status: it.attributes.online ? 'Работает' : 'Не работает',
        }
      });
    });
    setTableData(newTableData);
    setIsLoading(false);
  }, [tableDataResponse]);

  useEffect(() => {
    if (device === '') {
      return;
    }
    doFetchSensors();
    // setSensor(null);
    setDeviceEmpty(false);
  }, [device]);

  // useEffect(() => {
  //   if (sensor === null) {
  //     return;
  //   }
  //   setSensorEmpty(false);
  // }, [sensor]);

  useEffect(() => {
    if (!sensorsResponse) {
      return;
    }
    const newSlotsList = [];
    const slotsList = sensorsResponse.data.attributes.slots;
    slotsList.forEach((slotItem) => {
      slotItem.sensors.forEach(sensorItem => {
        if (sensorItem.equipment_item_id === null) {
          newSlotsList.push({
            value: sensorItem.id,
            label: slotsList.length > 1 ? `${sensorItem.sensor_type.name} | Слот ${slotItem.number}` : `${sensorItem.sensor_type.name}`,
          })
        }
      });
    });
    setSensorList(newSlotsList);
  }, [sensorsResponse]);

  useEffect(() => {
    if (!saveConnectedResponse) {
      return;
    }
    setSensor(null);
    setDevice('');
    setSensorList([]);
    doFetchTableData();
  }, [saveConnectedResponse]);

  useEffect(() => {
    if (deleteIsLoading) {
      return;
    }
    doFetchTableData();
    setCurrentSensor(null);
  }, [deleteIsLoading]);

  const onConnectedSave = () => {
    if (device === null || device === '' || sensor === null || sensor === '') {
      if (device === null || device === '') {
        setDeviceEmpty(true);
      }
      if (sensor === null || sensor === '') {
        setSensorEmpty(true);
      }
    } else {
      const item = {
        data: {
          sensor_id: sensor === null ? null : Number(sensor),
          equipment_item_connected_at: `${new Date(connectedDate).getFullYear()}-${new Date(connectedDate).getMonth() + 1}-${new Date(connectedDate).getDate()} 01:00:00 +0300`,
          idle_level: idleLevel === '' ? '1' : idleLevel
        }
      };
      doFetchConnectedSave({
        method: 'POST',
        data: item,
      });
    }
  };

  const onItemDelete = (id) => {
    setCurrentSensor(id);
    doFetchDelete({
      method: 'DELETE'
    });
  };

  const onSortClick = (name) => {
    if (name === sortedBy) {
      setSortedDown(!sortedDown);
    }
    if (name !== sortedBy) {
      setSortedBy(name);
      setSortedDown(true);
    }
  };

  console.log('sensorList', sensorList);
  console.log('device', device);
  console.log('devicesList', devicesList);
  console.log('devicesOptions', devicesOptions);

  return (
    <>
      <div className="equipment-accounting-edit">
        <div className="equipment-accounting-edit__wrap">
          <ul className="equipment-accounting-edit-fields custom-form">
            <li className="equipment-accounting-edit-fields-item">
              <Label htmlFor="react-select-datepicker-1--input" label="Дата подключения:" />
              <DatePicker
                onChange={setConnectedDate}
                value={connectedDate}
                locale="ru-RU"
              />
            </li>
            <li className="equipment-accounting-edit-fields-item">
              <Field label="Устройство:" name="device">
                {({ fieldProps, error }) => (
                  <>
                    <Select
                      {...fieldProps}
                      options={devicesOptions}
                      placeholder="Выберите устройство"
                      defaultValue={devicesOptions[devicesOptions.findIndex(it => it.value == device)]}
                      onChange={value => setDevice(value.value)}
                    />
                  </>
                )}
              </Field>
            </li>
            <li className="equipment-accounting-edit-fields-item">
              <Field label="Тип данных:" name="sensor">
                {({ fieldProps, error }) => (
                  <>
                    <Select
                      {...fieldProps}
                      options={sensorList}
                      placeholder="Тип данных"
                      defaultValue={sensorList[sensorList.findIndex(it => it.value == sensor)]}
                      onChange={value => setSensor(value.value)}
                    />
                  </>
                )}
              </Field>
            </li>
            <li className="equipment-accounting-edit-fields-item">
              <Field name="idleLevel" label="Порог простоя:">
                {({ fieldProps, error }) => (
                  <>
                    <TextField
                      autoComplete="off"
                      {...fieldProps}
                      placeholder="Порог простоя"
                      onChange={(evt) => setIdleLevel(evt.target.value)}
                      value={idleLevel}
                    />
                    {error && (
                      <ErrorMessage>
                        Введите порог простоя
                      </ErrorMessage>
                    )}
                  </>
                )}
              </Field>
            </li>
          </ul>
          <button
            className="equipment-accounting-edit__btn btn"
            type="button"
            onClick={onConnectedSave}
          >Сохранить</button>
        </div>
      </div>
      {isLoading ? '' : (
        <EquipmentAccountingEditSensors
          sortedBy={sortedBy}
          sortedDown={sortedDown}
          onSortClick={onSortClick}
          itemId={itemId}
          tableData={tableData}
          isLoading={isLoading}
          onItemDelete={onItemDelete}
          error={tableDataError}
        />
      )}
    </>
  )
};

export default EquipmentAccountingEditConnection;
