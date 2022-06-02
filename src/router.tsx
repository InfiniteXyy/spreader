import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Chapters from './screens/chapters';
import { Home } from './screens/home';
import { Reader } from './screens/reader';
import { Search } from './screens/search/Search';
import { Setting } from './screens/setting';
import { Topic } from './screens/topic/Topic';

const Stack = createNativeStackNavigator();

const AppContainer = function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      {/* 首页 */}
      <Stack.Screen name="home" component={Home} />
      {/* 设置 */}
      <Stack.Screen name="setting" component={Setting} />
      {/* 章节列表 */}
      <Stack.Screen name="chapters" component={Chapters} />
      {/* 阅读器 */}
      <Stack.Screen name="reader" component={Reader} />
      {/* 搜索 */}
      <Stack.Screen name="search" component={Search} />
      {/* 标签列表 */}
      <Stack.Screen name="topic" component={Topic} />
    </Stack.Navigator>
  );
};
export { AppContainer };
