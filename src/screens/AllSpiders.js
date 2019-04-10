import { View } from '@shoutem/ui';
import React from 'react';
import { loadStore } from '../reducers/storeReducer';
import { addBook, removeBook } from '../reducers/bookReducer';
import { connect } from 'react-redux';

class AllSpiders extends React.Component {
  render() {
    return <View />;
  }
}

const mapStateToProps = ({ storeReducer, appReducer: { darkMode } }) => ({
  stores: storeReducer.stores,
  dark: darkMode
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllSpiders);
