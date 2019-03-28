import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import React from 'react';

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
