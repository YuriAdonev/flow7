import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';
import configureAppStore from './hooks-store/app-store';
import { CurrentUserProvider } from "./contexts/current-user";

configureAppStore();

ReactDOM.render(
  <CurrentUserProvider>
    <App />
  </CurrentUserProvider>,
  document.getElementById('root')
);

