import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useCallback } from 'react';
import { useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { Action } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components/native';

import { IState } from './reducers';
import { AppToggleMode } from './reducers/app/app.action';
import { AppContainer } from './router';
import { persistor, store } from './store';
import { getTheme } from './theme';

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
      <NavigationContainer theme={{ ...DarkTheme, colors: { ...DarkTheme.colors, background: 'red' } }}>
        <AppContainer />
      </NavigationContainer>
    </ThemeProvider>
  );
}

function MySafeAreaProvider({ children }: { children: React.ReactNode }) {
  const dark = useSelector((state: IState) => state.appReducer.dark);

  return (
    <SafeAreaProvider style={{ flexGrow: 1, backgroundColor: dark ? 'black' : undefined }}>{children}</SafeAreaProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MySafeAreaProvider>
          <GestureHandlerRootView style={{ flexGrow: 1 }}>
            <Root />
          </GestureHandlerRootView>
        </MySafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
