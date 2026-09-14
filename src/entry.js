import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import TagManager from 'react-gtm-module';

import i18n, { i18nInitialized, loadLocaleData } from './i18n';
import store from './store';
import App from './App';

TagManager.initialize({ gtmId: 'GTM-5SDMPT' });

i18nInitialized
  .then(() => loadLocaleData(i18n.language))
  .then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root'),
    );
  });
