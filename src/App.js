import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './screens/Home';
import Chapter from './screens/Reader';
import ChapterList from './screens/ChapterList';

export const ReaderThemes = require('../assets/data/themes.json');
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: '书库'
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
    }
  }
);

const Spreader = createAppContainer(AppNavigator);
const store = createStore(reducers, applyMiddleware(thunk));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <Spreader />
        </View>
      </Provider>
    );
  }
}
