import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { AppContainer } from './routers';
import { connect, Provider } from 'react-redux';
import { persistor, store } from './store';
import { getTheme } from './theme';
import { IState } from './reducers';
import { View } from 'react-native';
import { StatusBar } from './components';
import { PersistGate } from 'redux-persist/integration/react';
import { useDarkMode } from 'react-native-dark-mode';
import { AppToggleMode } from './reducers/app/app.action';

function Root(props: { dark: boolean; followSystem: boolean; toggleDark(mode: boolean): void }) {
  const isDarkMode = useDarkMode();
  useEffect(() => {
    if (props.followSystem) props.toggleDark(isDarkMode);
  }, [isDarkMode, props.followSystem]);
  return (
    <ThemeProvider theme={getTheme(props.dark)}>
      <View style={{ flex: 1 }}>
        <StatusBar />
        <AppContainer />
      </View>
    </ThemeProvider>
  );
}

const StyledRoot = connect(
  (state: IState) => ({
    dark: state.appReducer.dark,
    followSystem: state.appReducer.modeFollowSystem,
  }),
  dispatch => ({ toggleDark: (mode: boolean) => dispatch(new AppToggleMode(mode)) }),
)(Root);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyledRoot />
      </PersistGate>
    </Provider>
  );
}

export default App;
