import React, { useState, useEffect } from 'react';
import AccountingSelectSearch
  from "../../../../../../components/form/accounting-select-search/accounting-select-search";
import AccountingSelect from "../../../../../../components/form/accounting-select/accounting-select";
import SubdivisionSelect from "../../../../../../components/form/subdivision-select/subdivision-select";
import TextField from "@atlaskit/textfield";
import {ErrorMessage, Field} from "@atlaskit/form";
import {Label} from "@atlaskit/field-base";
import { DatePicker } from '@atlaskit/datetime-picker';
import Select from "@atlaskit/select";

const EquipmentAccountingEditMovingForm = ({ currentItem, statusList, equipmentList, subdivisionList, onItemSave }) => {
  const [movingDate, setMovingDate] = useState(new Date(currentItem.attributes.at));
  const [status, setStatus] = useState(currentItem.attributes.status === null ? '' : currentItem.attributes.status);
  const [subdivision, setSubdivision] = useState(currentItem.attributes.division_id === null ? '' : currentItem.attributes.division_id);
  const [position, setPosition] = useState(currentItem.attributes.position === null ? '' : currentItem.attributes.position);
  const [parentEquipmentId, setParentEquipmentId] = useState(currentItem.attributes.parent_id === null ? '' : currentItem.attributes.parent_id);
  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [subdivisionOptions, setSubdivisionOptions] = useState([]);

  useEffect(() => {
    const newEquipmentList = [];
    const newStatusList = [];
    const newSubdivisionList = [];
    equipmentList.forEach(item => {
      newEquipmentList.push({
        label: item.attributes.name,
        value: item.id
      })
    });
    statusList.forEach(item => {
      newStatusList.push({
        label: item.attributes.name,
        value: item.id
      })
    });
    subdivisionList.forEach(item => {
      newSubdivisionList.push({
        label: item.attributes.name,
        value: item.id
      })
    });
    setEquipmentOptions(newEquipmentList);
    setStatusOptions(newStatusList);
    setSubdivisionOptions(newSubdivisionList);
  }, []);

  console.log('subdivisionList', subdivisionList);

  const onSaveClick = () => {
    onItemSave(
      {
        data: {
          division_id: subdivision === '' ? null : Number(subdivision),
          at: movingDate,
          status: status,
          parent_id: parentEquipmentId === '' ? null : Number(parentEquipmentId),
          position: position === '' ? null : Number(position)
        }
      }
    );
  };

  return (
    <div className="equipment-accounting-edit">
      <ul className="equipment-accounting-edit-fields custom-form">
        <li className="equipment-accounting-edit-fields-item">
          <Label htmlFor="react-select-datepicker-1--input" label="Дата:" />
          <DatePicker
            onChange={setMovingDate}
            value={movingDate}
            locale="ru-RU"
          />
        </li>
        <li className="equipment-accounting-edit-fields-item">
          <Field label="В составе другого оборудования:" name="device">
            {({ fieldProps, error }) => (
              <>
                <Select
                  {...fieldProps}
                  options={equipmentOptions}
                  placeholder="Выберите оборудование"
                  defaultValue={equipmentOptions[equipmentOptions.findIndex(it => it.value == parentEquipmentId)]}
                  onChange={value => setParentEquipmentId(value.value)}
                />
              </>
            )}
          </Field>
        </li>
        <li className="equipment-accounting-edit-fields-item">
          <Field label="Статус:" name="status">
            {({ fieldProps, error }) => (
              <>
                <Select
                  {...fieldProps}
                  options={statusOptions}
                  placeholder="Выберите статус"
                  defaultValue={statusList[statusList.findIndex(it => it.value == status)]}
                  onChange={value => setStatus(value.value)}
                />
              </>
            )}
          </Field>
        </li>
        <li className="equipment-accounting-edit-fields-item">
          <Field label="Подразделение:" name="subdivision">
            {({ fieldProps, error }) => (
              <>
                <Select
                  {...fieldProps}
                  options={subdivisionOptions}
                  placeholder="Выберите подразделение"
                  defaultValue={subdivisionList[subdivisionList.findIndex(it => it.value == subdivision)]}
                  onChange={value => setSubdivision(value.value)}
                />
              </>
            )}
          </Field>
        </li>
        <li className="equipment-accounting-edit-fields-item">
          <Field name="position" label="Позиция в составном оборудовании:">
            {({ fieldProps, error }) => (
              <>
                <TextField
                  autoComplete="off"
                  {...fieldProps}
                  placeholder="Введите позицию, где 0 это первая"
                  onChange={(evt) => setPosition(evt.target.value)}
                  value={position}
                />
                {error && (
                  <ErrorMessage>
                    Введите позицию
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
        onClick={onSaveClick}
      >Сохранить</button>
    </div>
  )
};

export default EquipmentAccountingEditMovingForm;
