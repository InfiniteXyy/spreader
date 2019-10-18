import { createStackNavigator } from 'react-navigation-stack';
import { MainNavigator } from './app';
import Chapters from '../screens/chapters';
import { Platform } from 'react-native';
import { Reader } from '../screens/reader';
import { Search } from '../screens/search/Search';
import { fromRight, fadeIn, fadeOut } from 'react-navigation-transitions';

const RouteConfigs = {
  main: {
    screen: MainNavigator,
  },
  chapters: {
    screen: Chapters,
  },
  reader: {
    screen: Reader,
  },
  search: {
    screen: Search,
  },
};

export default createStackNavigator(RouteConfigs, {
  initialRouteName: 'main',
  defaultNavigationOptions: {
    header: null,
  },
  transitionConfig: ({ scenes }) => {
    const prevScene = scenes[scenes.length - 2];
    const nextScene = scenes[scenes.length - 1];
    if (prevScene && nextScene.route.routeName === 'search') {
      return fadeIn();
    } else if (prevScene && prevScene.route.routeName === 'search') {
      return fadeOut();
    }
    return fromRight();
  },
  transparentCard: Platform.OS === 'android',
});
