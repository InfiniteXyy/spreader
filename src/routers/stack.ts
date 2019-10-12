import { createStackNavigator } from 'react-navigation-stack';
import { MainNavigator } from './app';
import Chapters from '../screens/chapters';
import { Platform } from 'react-native';
import { Reader } from '../screens/reader';

const RouteConfigs = {
  Main: {
    screen: MainNavigator,
  },
  chapters: {
    screen: Chapters,
  },
  reader: {
    screen: Reader,
  },
};

const StackNavigatorConfig = {
  initialRouteName: 'Main',
  defaultNavigationOptions: {
    header: null,
  },
  transparentCard: Platform.OS === 'android',
};

export default createStackNavigator(RouteConfigs, StackNavigatorConfig);
