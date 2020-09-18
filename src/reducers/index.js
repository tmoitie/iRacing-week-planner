import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import settings from './settings';

export default combineReducers({
  settings,
  app,
  auth,
});
