import { combineReducers } from 'redux';
import appReducer from './appReducer';
import bookReducer from './bookReducer';
import storeReducer from './storeReducer';

export default combineReducers({
  appReducer,
  bookReducer,
  storeReducer
});
