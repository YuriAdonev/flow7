import React from 'react';

const StaffEditOrdersInterruptionForm = () => {
  return (
    <div className="staff-edit-orders-interruption-form">
      <ul className="staff-edit-fields-wide">
        <li className="staff-edit-fields-wide-item">
          <div className="staff-edit-fields-wide-item__label">Дата:</div>
          <input
            type="text"
            placeholder="Введите"
            className="staff-edit-fields-wide-item__input"
            // onChange={(evt) => handleInput(evt.target.value, 'secondName')}
            // value={secondName}
          />
        </li>
        <li className="staff-edit-fields-wide-item">
          <div className="staff-edit-fields-wide-item__label">Описание:</div>
          <input
            type="text"
            placeholder="Введите описание"
            className="staff-edit-fields-wide-item__input"
            // onChange={(evt) => handleInput(evt.target.value, 'secondName')}
            // value={secondName}
          />
        </li>
        <li className="staff-edit-fields-wide-item">
          <div className="staff-edit-fields-wide-item__label">Документ:</div>
          <input
            type="text"
            placeholder="Загрузить"
            className="staff-edit-fields-wide-item__input"
            // onChange={(evt) => handleInput(evt.target.value, 'secondName')}
            // value={secondName}
          />
        </li>
      </ul>
      <button className="staff-edit-fields-wide__btn btn" type="button">Сохранить</button>
    </div>
  )
};

export default StaffEditOrdersInterruptionForm;
