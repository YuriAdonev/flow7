import React, { useState, useRef} from 'react';

import './profile-form-value.scss';

const ProfileFormValue = ({ setEditItem, name, isPassword, value, handleChange, url = '' }) => {
  const [editable, setEditable] = useState(false);
  const nameInput = useRef(null);

  const onEditClick = (name) => {
    setEditItem(name);
    setEditable(true);
    nameInput.current.focus();
  };

  const onSaveClick = () => {
    setEditItem('');
    setEditable(false);
  };

  return (
    <div className={`account-profile-form-value${url === '' ? '' : ' account-profile-form-value--url'}`}>
      <div className={`account-profile-form-value__edit${editable ? ' hide' : ''}`}>
        <span
          onClick={() => {
            onEditClick(name);
          }}
        >(изменить)</span>
      </div>
      <input
        type={isPassword ? 'password' : 'text'}
        ref={nameInput}
        className={`account-profile-form-value__input${editable ? ' editable' : ''}`}
        placeholder="Не заполнено"
        value={value}
        onFocus={() => {
          onEditClick(name);
        }}
        onBlur={() => {
          onSaveClick();
        }}
        onChange={(evt) => handleChange(evt.target.value)}
      />
      {value === '' ? '' : (
        <div className="account-profile-form-value__url">
          <div className="account-profile-form-value__url--current">{value}</div>
          <div className="account-profile-form-value__url--base">{url}</div>
        </div>
      )}
      <div
        className={`account-profile-form-value__save${editable ? '' : ' hide'}`}
        onClick={() => onSaveClick()}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.25 4.75V1.76172H1.76172V4.75H9.25ZM5.41797 11.5703C5.86328 12.0156 6.39062 12.2383 7 12.2383C7.60938 12.2383 8.13672 12.0156 8.58203 11.5703C9.02734 11.125 9.25 10.5977 9.25 9.98828C9.25 9.37891 9.02734 8.85156 8.58203 8.40625C8.13672 7.96094 7.60938 7.73828 7 7.73828C6.39062 7.73828 5.86328 7.96094 5.41797 8.40625C4.97266 8.85156 4.75 9.37891 4.75 9.98828C4.75 10.5977 4.97266 11.125 5.41797 11.5703ZM10.7617 0.25L13.75 3.23828V12.2383C13.75 12.6367 13.5977 12.9883 13.293 13.293C12.9883 13.5977 12.6367 13.75 12.2383 13.75H1.76172C1.33984 13.75 0.976562 13.5977 0.671875 13.293C0.390625 12.9883 0.25 12.6367 0.25 12.2383V1.76172C0.25 1.36328 0.390625 1.01172 0.671875 0.707031C0.976562 0.402344 1.33984 0.25 1.76172 0.25H10.7617Z"/>
        </svg>
      </div>
    </div>
  );
};

export default ProfileFormValue;
