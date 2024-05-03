import AsyncStorage from '@react-native-async-storage/async-storage';
import { Middleware, applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';

import { reducer } from './reducers';

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

const store = createStore(persistReducer(persistConfig, reducer), applyMiddleware(actionObjectMiddleWare, thunk));
const persistor = persistStore(store);

export { store, persistor };
