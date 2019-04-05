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
import { StyleProvider } from '@shoutem/theme';
import theme, { darkBg } from './theme';
import { View } from '@shoutem/ui';
import { ios } from './utils';

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
    defaultNavigationOptions: {
      headerStyle: {
        borderBottomColor: 'transparent',
        elevation: 0
      }
    },
    transparentCard: !ios
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

class Root extends React.Component {
  render() {
    let { dark } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={dark ? darkBg : '#fff'}
          barStyle={dark ? 'light-content' : 'dark-content'}
        />
        <Spreader />
      </View>
    );
  }
}

Root = connect(({ appReducer }) => ({ dark: appReducer.darkMode }))(Root);
export default class App extends Component {
  render() {
    return (
      <StyleProvider style={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Root />
          </PersistGate>
        </Provider>
      </StyleProvider>
    );
  }
}
