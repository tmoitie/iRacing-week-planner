import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';

import rootReducer from './reducers';

const reducer = compose(
  mergePersistedState(),
)(rootReducer);

const storage = compose(filter('settings'))(adapter(window.localStorage));
const STORAGE_KEY = 'iwp-settings';

let enhancer = compose(
  applyMiddleware(thunk),
  persistState(storage, STORAGE_KEY),
);

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const { createLogger } = require('redux-logger');
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  enhancer = compose(
    applyMiddleware(thunk, logger),
    persistState(storage, STORAGE_KEY),
  );
}

const store = createStore(reducer, enhancer);

export default store;
