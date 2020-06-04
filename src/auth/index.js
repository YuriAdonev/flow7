import { useStore } from "../hooks-store/store";

export const signup = (user) => {
  return fetch(process.env.REACT_APP_API_HTTP + process.env.REACT_APP_API_BASE_URL + '/users/registrations', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user})
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      console.log(err)
    });
};

export const signin = (user) => {
  return fetch(process.env.REACT_APP_API_HTTP + process.env.REACT_APP_API_BASE_URL + '/users/sessions', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      console.log(err)
    });
};

export const recovery = (email) => {
  // return fetch('https://staging.labsflow.ru/api/v1/users/sessions', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(email)
  // })
  //   .then((response) => {
  //     return response.json()
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   });
};

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('weld-jwt', JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('weld-jwt');
    next();
    return fetch('/api/v1/users/signout', {
      method: 'GET'
    })
      .then((response) => {
        console.log('signout', response)
      })
      .catch((err) => console.log(err))
  }
};

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('weld-jwt')) {
    return JSON.parse(localStorage.getItem('weld-jwt'));
  } else {
    return false;
  }
};
