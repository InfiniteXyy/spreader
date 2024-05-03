import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Provider, useDispatch } from 'react-redux';
import { Action } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components/native';

import { AppToggleMode } from './reducers/app/app.action';
import { AppContainer } from './router';
import { persistor, store, useTrackedSelector } from './store';
import { getTheme } from './theme';

function Root() {
  const { dark, modeFollowSystem } = useTrackedSelector().appReducer;
  const dispatch = useDispatch();
  const toggleDark = useCallback((mode: boolean) => dispatch(new AppToggleMode(mode) as Action), [dispatch]);

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (modeFollowSystem) {
      toggleDark(colorScheme === 'dark');
    }
  }, [colorScheme, modeFollowSystem, toggleDark]);

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
  const { dark } = useTrackedSelector().appReducer;

  return (
    <SafeAreaProvider style={{ flexGrow: 1, backgroundColor: dark ? '#2C2D30' : undefined }}>
      {children}
    </SafeAreaProvider>
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
