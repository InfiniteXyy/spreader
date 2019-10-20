import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fadeIn, fadeOut, fromBottom, fromRight, fromTop } from 'react-navigation-transitions';

import Chapters from './screens/chapters';
import { Platform } from 'react-native';
import { Reader } from './screens/reader';
import { Search } from './screens/search/Search';
import { Home } from './screens/home';
import { Setting } from './screens/setting';
import { Topic } from './screens/topic/Topic';

const RouteConfigs = {
  // 首页
  home: Home,
  // 设置
  setting: Setting,
  // 章节列表
  chapters: Chapters,
  // 阅读器
  reader: Reader,
  // 搜索
  search: Search,
  // 标签列表
  topic: Topic,
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
    } else if (prevScene && prevScene.route.routeName === 'search' && nextScene.route.routeName === 'home') {
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
