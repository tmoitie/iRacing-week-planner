import { combineReducers } from 'redux';
import contributors from './contributors';
import app from './app';
import settings from './settings';

export default combineReducers({
  settings,
  app,
  contributors,
});
