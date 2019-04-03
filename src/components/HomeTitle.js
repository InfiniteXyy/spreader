import React, { Component } from 'react';
import { View, Text } from '@shoutem/ui';

type Props = {
  title: string
};
class HomeTitle extends Component<Props> {
  render() {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = {
  titleContainer: {
    marginLeft: 25,
    marginTop: 25,
    marginBottom: 20
  },
  title: {
    fontSize: 36,
    fontWeight: '500',
    color: "black"
  }
};

export default HomeTitle;
