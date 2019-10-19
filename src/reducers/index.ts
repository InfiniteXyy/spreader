import { combineReducers } from 'redux';
import { appReducer } from './app/app.reducer';
import { bookReducer } from './book/book.reducer';
import { readerReducer } from './reader/reader.reducer';
import { hubReducer } from './hub/hub.reducer';
import { AppState } from './app/app.state';
import { BookState } from './book/book.state';
import { ReaderState } from './reader/reader.state';
import { HubState } from './hub/hub.state';

const reducer = combineReducers({
  appReducer,
  bookReducer,
  readerReducer,
  hubReducer,
});

export interface IState {
  appReducer: AppState;
  bookReducer: BookState;
  readerReducer: ReaderState;
  hubReducer: HubState;
}

export { reducer };
