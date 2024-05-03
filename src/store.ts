import { Action, Middleware, applyMiddleware, createStore } from 'redux';
import { reducer } from './reducers';
import { thunk } from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
