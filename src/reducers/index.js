import { combineReducers } from 'redux';
import contributors from './contributors';
import app from './app';

export default combineReducers({
  contributors,
  app
});
