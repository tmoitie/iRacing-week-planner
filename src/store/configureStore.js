import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

let enhancer = applyMiddleware(thunk);

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger');
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  enhancer = applyMiddleware(thunk, logger);
}


export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  return store;
}
