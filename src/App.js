import React, { Component } from 'react';
import { applyMiddleware, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import storage from 'redux-persist/lib/storage';

import { StatusBar } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import reducers from './reducers';

import Home from './screens/Home';
import Chapter from './screens/Reader';
import ChapterList from './screens/ChapterList';

export const ReaderThemes = require('../assets/data/themes.json');
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    Book: ChapterList,
    Chapter: Chapter
  },
  {
    initialRouteName: 'Home',
    mode: 'card',
    cardStyle: {
      backgroundColor: 'white'
    },
    defaultNavigationOptions: {
      headerStyle: {
        borderBottomColor: 'transparent',
        elevation: 0
      }
    }
  }
);

const persistConfig = {
  key: 'root',
  storage
};

const Spreader = createAppContainer(AppNavigator);
const store = createStore(
  persistReducer(persistConfig, reducers),
  applyMiddleware(thunk)
);
const persistor = persistStore(store);

class MyStatusBar extends React.Component {
  render() {
    let { theme } = this.props;
    return (
      <StatusBar
        backgroundColor={this.props.theme.root.backgroundColor}
        barStyle={theme.mode === 'light' ? 'dark-content' : 'light-content'}
      />
    );
  }
}

MyStatusBar = connect(({ appReducer }) => ({ theme: appReducer.theme }))(
  MyStatusBar
);
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MyStatusBar />
          <Spreader />
        </PersistGate>
      </Provider>
    );
  }
}
