import React from 'react';

import { createBottomTabNavigator } from 'react-navigation-tabs';

import Home from '../screens/home';
import Explore from '../screens/explore';
import Setting from '../screens/setting';

import Icon from 'react-native-vector-icons/AntDesign';
import { BottomBar } from '../components';

const RouteConfigs = {
  Home: {
    screen: Home,
    navigationOptions: {
      title: '书库',
    },
  },
  Explore: {
    screen: Explore,
    navigationOptions: {
      title: '发现',
    },
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      title: '我的',
    },
  },
};

const MainNavigator = createBottomTabNavigator(RouteConfigs, {
  defaultNavigationOptions: ({ navigation }) => ({
    lazy: false,
    tabBarIcon: props => {
      const { focused, horizontal, tintColor } = props;
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `home`;
      } else if (routeName === 'Explore') {
        iconName = `cloudo`;
      } else {
        iconName = 'setting';
      }
      return <Icon name={iconName} style={{ color: tintColor, fontSize: 24 }} />;
    },
    tabBarComponent: BottomBar,
  }),
});

export { MainNavigator };
