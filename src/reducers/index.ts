import { combineReducers } from 'redux';
import { appReducer } from './app/app.reducer';
import { bookReducer } from './book/book.reducer';
import { readerReducer } from './reader/reader.reducer';
import { AppState } from './app/app.state';
import { BookState } from './book/book.state';
import { ReaderState } from './reader/reader.state';

const reducer = combineReducers({
  appReducer,
  bookReducer,
  readerReducer,
});

export interface IState {
  appReducer: AppState;
  bookReducer: BookState;
  readerReducer: ReaderState;
}

export { reducer };
