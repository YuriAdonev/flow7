import React, { useEffect, useState } from 'react';
import { DatePicker } from "element-react";

import AccountingSelect from "../../../../../../components/form/accounting-select/accounting-select";
import AccountingSelectSearch
  from "../../../../../../components/form/accounting-select-search/accounting-select-search";
import useFetch from "../../../../../../hooks/use-fetch";

const StaffEditOrdersMovingForm = ({ currentItem, statusList, onItemSave, divisionsList, postsList }) => {
  const [fileOrder, setFileOrder] = useState({});
  const [division, setDivision] = useState('');
  const [post, setPost] = useState('');
  const [date, setDate] = useState(new Date(currentItem.attributes.at));
  const [leader, setLeader] = useState(null);
  const [orderNumber, setOrderNumber] = useState('');
  const [status, setStatus] = useState(null);
  const [{response: fileUploadResponse, isLoading: fileUploadIsLoading, error: fileUploadError}, doFetchFileUpload] = useFetch(`/uploads`, true);

  const leaderOptions = [
    {id: 'yes', attributes: { name: 'Руководитель'}},
    {id: 'no', attributes: { name: 'Не руководитель'}}
  ];

  useEffect(() => {
    if (!fileUploadResponse) {
      return;
    }
    setFileOrder({ ...fileUploadResponse });
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
    // if (secondName === '' || firstName === '') {
    //   if (secondName === '') {
    //     setSecondNameEmpty(true);
    //   }
    // } else {
    onItemSave(
      {
        data: {
          division_id: division,
          at: date,
          status: status,
          post_id: post,
          leader: leader === 'yes' ? true : leader === 'no' ? false : null,
          attachment: fileOrder,
          order_number: orderNumber === '' ? null : orderNumber
        }
      }
    );
    // }
  };

  return (
    <div className="staff-edit-orders-moving-form">
      <ul className="staff-edit-fields-wide">
        <li className="staff-edit-fields-wide-item">
          <div className="staff-edit-fields-wide-item__label">Дата:</div>
          <DatePicker
            onChange={setDate}
            format="dd.MM.yyyy"
            placeholder="Выберите дату"
            value={date}
            empty={false}
          />
        </li>
        <li className="staff-edit-fields-wide-item">
          <div className="staff-edit-fields-wide-item__label">Статус:</div>
          <AccountingSelect
            selectedId={status}
            placeholder="Выберите статус"
            setCurrentSelect={setStatus}
            selectList={statusList}
            empty={false}
          />
        </li>
        <li className="staff-edit-fields-wide-item">
          <div className="staff-edit-fields-wide-item__label">Должность:</div>
          <AccountingSelectSearch
            selectedId={post}
            placeholder="Выберите должность"
            setCurrentSelect={setPost}
            selectList={postsList}
            empty={false}
          />
        </li>
        <li className="staff-edit-fields-wide-item">
          <div className="staff-edit-fields-wide-item__label">Подразделение:</div>
          <AccountingSelectSearch
            selectedId={division}
            placeholder="Выберите подразделение"
            setCurrentSelect={setDivision}
            selectList={divisionsList}
            empty={false}
          />
        </li>
        <li className="staff-edit-fields-wide-item">
          <div className="staff-edit-fields-wide-item__label">Номер приказа:</div>
          <input
            type="text"
            placeholder="Введите"
            className="staff-edit-fields-wide-item__input"
            onChange={(evt) => setOrderNumber(evt.target.value)}
            value={orderNumber}
          />
        </li>
        <li className="staff-edit-fields-wide-item staff-edit-fields-wide-item--file">
          <div className="staff-edit-fields-wide-item__label">Файл приказа:</div>
          <div className="staff-edit-fields-wide-item-file">
            <div className="staff-edit-fields-wide-item-file__icon">
              <label>
                <input
                  type="file"
                  className="staff-edit-fields-wide-item__input"
                  onChange={(evt) => handleFileField(evt.target.files[0])}
                />
                <svg width="16" height="12" viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.34375 6.65625H11.3438L8 3.34375L4.65625 6.65625H6.65625V9.34375H9.34375V6.65625ZM12.9062 4.6875C13.7604 4.75 14.4896 5.10417 15.0938 5.75C15.6979 6.375 16 7.125 16 8C16 8.91667 15.6667 9.70833 15 10.375C14.3542 11.0208 13.5729 11.3438 12.6562 11.3438H4C2.89583 11.3438 1.94792 10.9583 1.15625 10.1875C0.385417 9.39583 0 8.44792 0 7.34375C0 6.32292 0.34375 5.4375 1.03125 4.6875C1.71875 3.91667 2.5625 3.47917 3.5625 3.375C4 2.5625 4.61458 1.90625 5.40625 1.40625C6.19792 0.90625 7.0625 0.65625 8 0.65625C9.20833 0.65625 10.2708 1.04167 11.1875 1.8125C12.1042 2.5625 12.6771 3.52083 12.9062 4.6875Z"/>
                </svg>
              </label>
            </div>
            {fileOrder.data === undefined ? (
              <div
                className={`staff-edit-fields-wide-item-file__placeholder`}
              >
                Выберите файл
              </div>
            ) : (
              <div
                className={`staff-edit-fields-wide-item-file__placeholder fill`}
              >
                <a href={`${process.env.REACT_APP_API_HTTP + process.env.REACT_APP_API_BASE_URL}/uploads/${fileOrder.data.id}`} target="_blank">{fileOrder.data.attributes.filename}</a>
              </div>
            )}
          </div>
        </li>
        <li className="staff-edit-fields-wide-item">
          <div className="staff-edit-fields-wide-item__label">Руководитель:</div>
          <AccountingSelect
            selectedId={leader}
            placeholder="Выберите"
            setCurrentSelect={setLeader}
            selectList={leaderOptions}
            empty={false}
          />
        </li>
      </ul>
      <button
        className="staff-edit-fields-wide__btn btn"
        type="button"
        onClick={onSaveClick}
      >Сохранить</button>
    </div>
  )
};

export default StaffEditOrdersMovingForm;
