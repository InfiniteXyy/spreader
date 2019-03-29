import React, { Component } from 'react';
import { View } from 'react-native';

import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './screens/Home';
import Chapter from './screens/Reader';
import ChapterList from './screens/ChapterList';

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Book: ChapterList,
    Chapter: Chapter
  },
  {
    initialRouteName: 'Home',
    mode: 'card',
    defaultNavigationOptions: {
      headerStyle: {
        borderBottomColor: "#fff"
      },
    }
  }
);

const Spreader = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Spreader />
      </View>
    );
  }
}
