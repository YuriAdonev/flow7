import React, { useState, useEffect } from 'react';
// import {DatePicker} from "element-react";
import AccountingSelect from "../../../../../../components/form/accounting-select/accounting-select";
import {Label} from "@atlaskit/field-base";
import { DatePicker } from '@atlaskit/datetime-picker';
import TextField from "@atlaskit/textfield";
import {ErrorMessage, Field} from "@atlaskit/form";
import Select from '@atlaskit/select';

const StaffEditAccessForm = ({ currentItem, statusList, onItemSave }) => {
  const [selectedDate, setSelectedDate] = useState(new Date(currentItem.attributes.at));
  const [status, setStatus] = useState(currentItem.attributes.status);
  const [cardNumber, setCardNumber] = useState(currentItem.attributes.access_token_id);
  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    const newStatusList = [];
    statusList.forEach(item => {
      newStatusList.push({
        label: item.attributes.name,
        value: item.id
      })
    });
    setStatusOptions(newStatusList);
  }, []);

  const onSaveClick = () => {
    onItemSave({
      data: {
        at: selectedDate,
        status: status,
        access_token_id: cardNumber === '' ? null : cardNumber
      }
    })
  };

  return (
    <div className="staff-edit-access">
      <ul className="staff-edit-fields custom-form">
        <li className="staff-edit-fields-item">
          <Label htmlFor="react-select-datepicker-1--input" label="Дата регистрации:" />
          <DatePicker
            onChange={setSelectedDate}
            value={selectedDate}
            locale="ru-RU"
          />
        </li>
        <li className="staff-edit-fields-item">
          <Field name="cardNumber" label="Номер карты:" isRequired>
            {({ fieldProps, error }) => (
              <>
                <TextField
                  autoComplete="off"
                  {...fieldProps}
                  placeholder="Номер карты"
                  onChange={(evt) => setCardNumber(evt.target.value)}
                  value={cardNumber}
                />
                {error && (
                  <ErrorMessage>
                    Введите номер карты
                  </ErrorMessage>
                )}
              </>
            )}
          </Field>
        </li>
        <li className="staff-edit-fields-item">
          <Field label="Статус:" name="status">
            {({ fieldProps, error }) => (
              <>
                <Select
                  {...fieldProps}
                  options={statusOptions}
                  placeholder="Выберите статус"
                  value={status}
                  onChange={value => setStatus(value.value)}
                />
              </>
            )}
          </Field>
        </li>
      </ul>
      <button
        className="staff-edit-fields__btn btn"
        type="button"
        onClick={onSaveClick}
      >Сохранить</button>
    </div>
  )
};

export default StaffEditAccessForm;
