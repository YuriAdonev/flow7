import React, { useEffect, useContext } from 'react';

import useFetch from '../../hooks/use-fetch';
import useLocalStorage from '../../hooks/use-local-storage'
import { CurrentUserContext } from '../../contexts/current-user';

const CurrentUserChecker = ({ children }) => {
  const [, setCurrentUserState] = useContext(CurrentUserContext);
  const [{response, isLoading, error}, doFetchUser] = useFetch('/users/account', true);
  const [token] = useLocalStorage('weld-jwt');

  useEffect(() => {
    if (!token) {
      setCurrentUserState(state => ({
        ...state,
        isLoggedIn: false
      }));
      return;
    }

    doFetchUser();
    setCurrentUserState(state => ({
      ...state,
      isLoading: true
    }));
  }, []);

  useEffect(() => {
    if (!response) {
      return;
    }
    setCurrentUserState(state => ({
      ...state,
      currentUser: response.data,
      sites: response.data.attributes.sites,
      currentSite: response.data.attributes.sites.find(item => item.last_used),
      isLoading: false,
      isLoggedIn: true
    }));
  }, [response]);

  return children;
};

export default CurrentUserChecker;
