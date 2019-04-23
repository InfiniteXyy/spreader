import React from 'react'
import { connect } from 'react-redux'
import { Icon } from '@shoutem/ui'
import { BottomTabBar, createBottomTabNavigator } from 'react-navigation'

import Setting from './Setting'
import SpiderList from './SpiderList'
import BookList from './BookList'
import { darkBg, dividerColor, dividerColorLight } from '../theme'

const mapStateToProps = ({ appReducer }) => ({ dark: appReducer.darkMode });
const TabBarComponent = props => (
  <BottomTabBar
    {...props}
    showLabel={false}
    activeTintColor="tomato"
    style={{
      backgroundColor: props.dark ? darkBg : '#fff',
      borderTopWidth: 0.5,
      borderTopColor: props.dark ? dividerColorLight : dividerColor,
      height: 60
    }}
  />
);
const StyledTabBar = connect(mapStateToProps)(TabBarComponent);

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
    tabBarComponent: StyledTabBar
  }
);

export default HomeNavigator;
