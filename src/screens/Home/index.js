import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import BookList from './BookList'

type Props = {};
export default class Home extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <BookList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
