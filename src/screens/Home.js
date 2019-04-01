import React from 'react'
import { Icon } from '@shoutem/ui'
import { createBottomTabNavigator } from 'react-navigation'

import Setting from './Setting'
import SpiderList from './SpiderList'
import BookList from './BookList'

const HomeNavigator = createBottomTabNavigator(
  {
    BookList,
    SpiderList,
    Setting
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'BookList') {
          iconName = `books`;
        } else if (routeName === 'SpiderList') {
          iconName = `search`;
        } else {
          iconName = 'user-profile';
        }
        return <Icon name={iconName} style={{ color: tintColor }} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      showLabel: false
    }
  }
);

export default HomeNavigator;
