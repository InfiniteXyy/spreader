import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { AppContainer } from './router';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { persistor, store } from './store';
import { getTheme } from './theme';
import { IState } from './reducers';
import { useColorScheme, View } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { AppToggleMode } from './reducers/app/app.action';
import { NavigationContainer } from '@react-navigation/native';
import { useCallback } from 'react';
import { Action } from 'redux';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function Root() {
  const { dark, followSystem } = useSelector((state: IState) => ({
    dark: state.appReducer.dark,
    followSystem: state.appReducer.modeFollowSystem,
  }));
  const dispatch = useDispatch();
  const toggleDark = useCallback((mode: boolean) => dispatch(new AppToggleMode(mode) as Action), [dispatch]);

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (followSystem) {
      toggleDark(colorScheme === 'dark');
    }
  }, [colorScheme, followSystem, toggleDark]);

  const { top } = useSafeAreaInsets();

  return (
    <ThemeProvider theme={{ ...getTheme(dark), top }}>
      <StatusBar style={dark ? 'light' : 'dark'} />
      <View style={{ flexGrow: 1 }}>
        <AppContainer />
      </View>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <SafeAreaProvider style={{ flexGrow: 1 }}>
            <GestureHandlerRootView style={{ flexGrow: 1 }}>
              <Root />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
