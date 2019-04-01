import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { Provider, connect } from 'react-redux';
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
        <View style={{ flex: 1 }}>
          <MyStatusBar />
          <Spreader />
        </View>
      </Provider>
    );
  }
}
