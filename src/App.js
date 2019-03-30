import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';

import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './screens/Home';
import Chapter from './screens/Reader';
import ChapterList from './screens/ChapterList';

export const ReaderThemes = {
  theme1: {
    root: {
      backgroundColor: 'white'
    },
    title: {
      color: '#4a4a4a'
    },
    content: {
      color: 'black'
    }
  },
  theme2: {
    root: {
      backgroundColor: 'black'
    },
    title: {
      color: 'rgba(170,170,170,0.97)'
    },
    content: {
      color: 'white'
    }
  }
};
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
        borderBottomColor: 'transparent',
        elevation: 0
      }
    }
  }
);

const Spreader = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Spreader />
      </View>
    );
  }
}
