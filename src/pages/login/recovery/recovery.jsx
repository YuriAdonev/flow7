import React, { useState } from 'react';

import { recovery, authenticate } from "../../../auth";

const Recovery = (props) => {

  const [values, setValues] = useState({
    email: '',
    error: '',
    loading: false,
  });

  const {
    email,
    error,
    loading,
  } = values;

  const handleChange = (name) => (evt) => {
    setValues({ ...values, error: false, [name]: evt.target.value })
  };

  const clickSubmit = (evt) => {
    evt.preventDefault();
    setValues({ ...values, error: false, loading: true });
    recovery({ email })
      .then((data) => {
        // if (data.error === undefined) {
        //   setValues({ ...values, error: data.error, loading: false })
        // } else {
        authenticate(data, () => {
          setValues({
            ...values,
          })
        });
        props.onSigninClick();
        // }
      });
  };

  const showError = () => (
    <div className="signup__error">
      {error}
    </div>
  );

  const showLoading = () => (
    loading && (<div className="signup__success">
      Загрузка.
    </div>)
  );

  return (
    <section className="recovery">
      <div className="recovery__wrap">
        <div className="login__title">Восстановление пароля</div>
        <label className="login__label">
          <span>E-mail:</span>
          <input
            className="login__input"
            type="text"
            name="email"
            onChange={handleChange('email')}
            value={email}
          />
        </label>
        <div className="login__row">
          <button
            className="login__btn btn"
            onClick={clickSubmit}
          >Отправить</button>
          {error ? showError() : ''}
          {loading ? showLoading() : ''}
        </div>
      </div>
    </section>
  );
};

export default Recovery;
