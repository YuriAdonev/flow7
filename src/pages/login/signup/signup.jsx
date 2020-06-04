import React, { useState } from 'react';

import './signup.scss';

import { signup } from '../../../auth';

const Signup = (props) => {

  const [values, setValues] = useState({
    email: '',
    password: '',
    invite: '',
    error: '',
  });

  const {
    email,
    password,
    invite,
    error,
  } = values;

  const handleChange = (name) => (evt) => {
    setValues({ ...values, error: false, [name]: evt.target.value })
  };

  const clickSubmit = (evt) => {
    evt.preventDefault();
    setValues({ ...values, error: false });
    signup({
      email,
      password,
      invite,
    })
      .then((data) => {
        if (data.errors) {
          setValues({ ...values, error: data.errors[0].detail})
        } else {
          setValues({
            ...values,
            email: '',
            password: '',
            invite: '',
            error: '',
          });
        }
        props.onSigninClick();
      });
  };

  const showError = () => (
    <div className="signup__error">
      {error}
    </div>
  );

  return (
    <section className="signup">
      <div className="signup__wrap">
        <div className="login__title">Регистрация</div>
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
        <label className="login__label">
          <span>Пароль:</span>
          <input
            className="login__input"
            type="password"
            name="password"
            onChange={handleChange('password')}
            value={password}
          />
        </label>
        <label className="login__label">
          <span>Приглашение:</span>
          <input
            className="login__input"
            type="text"
            name="invite"
            onChange={handleChange('invite')}
            value={invite}
          />
        </label>
        <div className="login__row">
          <button
            className="login__btn btn"
            onClick={clickSubmit}
          >Зарегистрировать</button>
          {error ? showError() : ''}
        </div>
        <div className="login__footer">
          <div
            className="login__tab"
            onClick={() => props.onSigninClick()}
          >Уже зарегестрирован</div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
