import { Action, applyMiddleware, createStore, Store } from 'redux';
import { reducer } from './reducers';
import thunk from 'redux-thunk';

const actionObjectMiddleWare = (store: Store) => (next: Function) => (action: Action) => {
  if (typeof action === 'function') next(action);
  else next({ ...action });
};

const store = createStore(reducer, applyMiddleware(actionObjectMiddleWare, thunk));

export { store };
