import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseSelector, useSelector } from 'react-redux';
import { createTrackedSelector } from 'react-tracked';
import { Middleware, applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';

import { IState, reducer } from './reducers';

const actionObjectMiddleWare: Middleware = () => (next) => (action) => {
  if (typeof action === 'function') {
    next(action);
  } else {
    next({ ...(action as object) });
  }
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// @ts-ignore
const store = createStore(persistReducer(persistConfig, reducer), applyMiddleware(actionObjectMiddleWare, thunk));
// @ts-ignore
const persistor = persistStore(store);

const useTrackedSelector = createTrackedSelector(useSelector as UseSelector<IState>);
export { store, persistor, useTrackedSelector };
