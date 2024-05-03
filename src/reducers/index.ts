import { combineReducers } from 'redux';

import { appReducer } from './app/app.reducer';
import { AppState } from './app/app.state';
import { bookReducer } from './book/book.reducer';
import { BookState } from './book/book.state';
import { hubReducer } from './hub/hub.reducer';
import { HubState } from './hub/hub.state';
import { readerReducer } from './reader/reader.reducer';
import { ReaderState } from './reader/reader.state';

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
