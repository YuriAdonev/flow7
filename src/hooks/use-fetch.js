import {useState, useEffect, useContext} from 'react';
import axios from 'axios';

import {isAuthenticated} from "../auth";
import {CurrentUserContext} from "../contexts/current-user";

export default (url, isBase = false) => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);

  const currentSubdomain = currentUserState.currentSite ? currentUserState.currentSite.subdomain : '';
  const baseUrl = isBase ? process.env.REACT_APP_API_HTTP + process.env.REACT_APP_API_BASE_URL : process.env.REACT_APP_API_HTTP + currentSubdomain + process.env.REACT_APP_API_USER_URL;
  const baseOption = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${isAuthenticated().token}`
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = (options = {}) => {
    setOptions({
      ...baseOption,
      ...options
    });
    setIsLoading(true);
  };

  useEffect(() => {
    let skipGetResponseAfterDestroy = false;
    if (!isLoading) {
      return;
    }
    setIsLoading(true);
    axios(baseUrl + url, options)
      .then((res) => {
        if (!skipGetResponseAfterDestroy) {
          setResponse(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!skipGetResponseAfterDestroy) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      skipGetResponseAfterDestroy = true;
    };
  }, [isLoading]);

  return [{response, isLoading, error}, doFetch];
}
