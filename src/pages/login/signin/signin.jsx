import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import './signin.scss';

import useFetch from '../../../hooks/use-fetch';
import useLocalStorage from '../../../hooks/use-local-storage';

const Signin = (props) => {
  const [, setToken] = useLocalStorage('weld-jwt');
  const [{response, isLoading, error: loginError}, doFetchLogin] = useFetch('/users/sessions', true);
  // const [{response: responseUser, isLoading: isLoadingUser, error: errorUser}, doFetchUser] = useFetch('/users/account', true);

  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false
  });

  const {
    email,
    password,
    error,
    loading,
    redirectToReferrer
  } = values;

  useEffect(() => {
    if (!response) {
      return;
    }
    setToken(JSON.stringify(response));
    setValues({
      ...values,
      redirectToReferrer: true
    });
  }, [response]);

  useEffect(() => {
    if (!loginError) {
      return;
    }
    setValues({ ...values, error: true, loading: false})
  }, [loginError]);

  const handleChange = (name) => (evt) => {
    setValues({ ...values, error: false, [name]: evt.target.value })
  };

  const clickSubmit = (evt) => {
    evt.preventDefault();
    setValues({ ...values, error: false, loading: true });
    doFetchLogin({
      method: 'POST',
      data: { email, password }
    });
  };

  const showError = () => (
    error && (<div className="signup__error">
      Неправильный логин или пароль
    </div>)
  );

  const showLoading = () => (
    loading && (<div className="signup__success">
      Загрузка.
    </div>)
  );

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/"/>
    }
  };

  return (
    <section className="signin">
      <div className="signin__wrap">
        <div className="login__title">Вход в систему</div>
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
        <div className="login__row">
          <button
            className="login__btn btn"
            onClick={clickSubmit}
          >Войти</button>
          {error ? showError() : ''}
          {loading ? showLoading() : ''}
        </div>
        <div className="login__footer">
          <div
            className="login__tab"
            onClick={() => props.onRecoveryClick()}
          >Забыли пароль?</div>
          <div
            onClick={() => props.onSignupClick()}
            className="login__tab"
          >Запрос на регистрацию</div>
        </div>
        {redirectUser()}
      </div>
    </section>
  );
};

export default Signin;
