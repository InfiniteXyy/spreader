import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { AppContainer } from './routers';
import { connect, Provider } from 'react-redux';
import { store } from './store';
import { getTheme } from './theme';
import { IState } from './reducers';
import { View } from 'react-native';
import { StatusBar } from './components';

function Root(props: { dark: boolean }) {
  return (
    <ThemeProvider theme={getTheme(props.dark)}>
      <View style={{ flex: 1 }}>
        <StatusBar />
        <AppContainer />
      </View>
    </ThemeProvider>
  );
}

const StyledRoot = connect((state: IState) => ({
  dark: state.appReducer.dark,
}))(Root);

function App() {
  return (
    <Provider store={store}>
      <StyledRoot />
    </Provider>
  );
}

export default App;
