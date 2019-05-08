import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { hot } from 'react-hot-loader/root'

const HotApp = hot(App);

ReactDOM.render(
  <Provider store={configureStore({})}>
    <HotApp />
  </Provider>,
  document.getElementById('root')
);
