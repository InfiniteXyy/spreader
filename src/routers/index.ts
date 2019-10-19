import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Chapters from '../screens/chapters';
import { Platform } from 'react-native';
import { Reader } from '../screens/reader';
import { Search } from '../screens/search/Search';
import { fadeIn, fadeOut, fromBottom, fromRight, fromTop } from 'react-navigation-transitions';
import { Home } from '../screens/home';
import { Setting } from '../screens/setting';

const RouteConfigs = {
  home: {
    screen: Home,
  },
  setting: {
    screen: Setting,
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

const stack = createStackNavigator(RouteConfigs, {
  initialRouteName: 'home',
  defaultNavigationOptions: {
    header: null,
  },
  transitionConfig: ({ scenes }) => {
    const prevScene = scenes[scenes.length - 2];
    const nextScene = scenes[scenes.length - 1];
    if (nextScene.route.routeName === 'search') {
      return fadeIn();
    } else if (prevScene && prevScene.route.routeName === 'search') {
      return fadeOut();
    } else if (prevScene && prevScene.route.routeName === 'setting') {
      return fromTop();
    } else if (nextScene.route.routeName === 'setting') {
      return fromBottom();
    }
    return fromRight();
  },
  transparentCard: Platform.OS === 'android',
});

const AppContainer = createAppContainer(stack);
export { AppContainer };
