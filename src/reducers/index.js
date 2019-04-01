import { combineReducers } from 'redux';
import appReducer from './appReducer';
import bookReducer from './bookReducer';

export default combineReducers({
  appReducer,
  bookReducer
});
