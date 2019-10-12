import { combineReducers } from 'redux';
import { appReducer } from './app/app.reducer';
import { bookReducer } from './book/book.reducer';
import { AppState } from './app/app.state';
import { BookState } from './book/book.state';

const reducer = combineReducers({
  appReducer,
  bookReducer,
});

export interface IState {
  appReducer: AppState;
  bookReducer: BookState;
}

export { reducer };
