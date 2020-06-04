import { initStore } from './store';

const configureStore = () => {
  const actions = {
    SET_DROP_OPENED: (curState, value) => {
      return { isDropOpened: value }
    },
    SET_MODAL_OPENED: (curState, value) => {
      return { isModalOpened: value }
    },
  };

  const initialState = {
    isDropOpened: false,
    isModalOpened: false,
  };

  initStore(actions, initialState);
};

export default configureStore;
