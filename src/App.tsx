import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { AppContainer } from './router';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { persistor, store } from './store';
import { getTheme } from './theme';
import { IState } from './reducers';
import { View } from 'react-native';
import { StatusBar } from './components';
import { PersistGate } from 'redux-persist/integration/react';
import { useDarkMode } from 'react-native-dynamic';
import { AppToggleMode } from './reducers/app/app.action';
import { NavigationContainer } from '@react-navigation/native';
import { useCallback } from 'react';

function Root() {
  const { dark, followSystem } = useSelector((state: IState) => ({
    dark: state.appReducer.dark,
    followSystem: state.appReducer.modeFollowSystem,
  }));
  const dispatch = useDispatch();
  const toggleDark = useCallback((mode: boolean) => dispatch(new AppToggleMode(mode)), [dispatch]);

  const isDarkMode = useDarkMode();

  useEffect(() => {
    if (followSystem) {
      toggleDark(isDarkMode);
    }
  }, [isDarkMode, followSystem, toggleDark]);

  return (
    <ThemeProvider theme={getTheme(dark)}>
      <View style={{ flex: 1 }}>
        <StatusBar />
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
          <Root />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
