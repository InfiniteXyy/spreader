import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigatePop } from './redux';
import { CardStack } from '@shoutem/ui/navigation';
import Chapter from './screens/Chapter';
import Book from './screens/Book';
import Home from './screens/Home';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Book: Book,
    Chapter: Chapter
  },
  {
    initialRouteName: 'Home'
  }
);

class Spreader extends Component {
  render() {
    const { navigationState, onNavigateBack } = this.props;
    return <AppNavigator />;
  }
}

export default connect(
  state => ({ navigationState: state.navigationState }),
  { onNavigateBack: navigatePop }
)(Spreader);
