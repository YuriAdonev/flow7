import { initStore } from './store';

const configureStore = () => {
  const actions = {
    SET_USER: (curState, value) => {
      return { user: value }
    },
    SET_SITES: (curState, value) => {
      return { sites: value }
    },
    SET_CURRENT_SITE: (curState, value) => {
      return { currentSite: value }
    },
    SET_APPS_LIST: (curState, value) => {
      return { appsList: value }
    },
    SET_DIRECTORIES_LIST: (curState, value) => {
      return { directoriesList: value }
    },
  };

  const initialState = {
    user: {},
    currentSite: '',
    sites: [],
    appsList: [],
    directoriesList: []
  };

  initStore(actions, initialState);
};

export default configureStore;
