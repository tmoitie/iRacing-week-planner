import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

ReactDOM.render(
  <Provider store={configureStore({})}>
    <App />
  </Provider>,
  document.getElementById('root')
);
