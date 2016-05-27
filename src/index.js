import 'es5-shim';
import 'es5-shim/es5-sham';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

ReactDOM.render(
  <Provider store={configureStore({})}>
    <App />
  </Provider>,
  document.getElementById('root')
);
