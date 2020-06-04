import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import 'element-theme-default';
import './app.scss';
import '../styles/table.scss';
import '../styles/sort-item.scss';
import '../styles/title.scss';
import '../styles/form-select.scss';
import '../styles/tabs.scss';
import '../styles/filter-select.scss';
import '../styles/work-info.scss';
import '../styles/data-empty.scss';

import Navigation from '../components/nav/navigation/navigation';
import Routes from '../routes';
import { useStore } from '../hooks-store/store';
import LoginPage from '../pages/login/login-page';
import CurrentUserChecker from '../components/current-user-checker/current-user-checker';
import {CurrentUserContext} from "../contexts/current-user";
import {LayoutManager, NavigationProvider} from "@atlaskit/navigation-next";
import MainNav from "../components/nav/main-nav/main-nav";

const App = () => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [state, dispatch] = useStore();
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    if (currentUserState.currentSite === null || currentUserState.currentUser === null) {
      return;
    }
    setInitLoading(false);
  }, [currentUserState]);

  const onScreenClick = () => {
    if (!state.isDropOpened) {
      return;
    }
    dispatch('SET_DROP_OPENED', false);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage}/>
          <CurrentUserChecker>
            <div className="app" onClick={onScreenClick}>
              <Navigation initLoading={initLoading}/>
            </div>
          </CurrentUserChecker>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
