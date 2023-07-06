import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import TagManager from 'react-gtm-module';

import './i18n';
import store from './store';
import App from './App';

TagManager.initialize({ gtmId: 'GTM-5SDMPT' });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
