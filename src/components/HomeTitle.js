import React, { Component } from 'react';
import { View, Text } from '@shoutem/ui';
import { connect } from 'react-redux';

type Props = {
  title: string
};
class HomeTitle extends Component<Props> {
  render() {
    return (
      <View style={styles.titleContainer}>
        <Text
          style={{ ...styles.title, color: this.props.dark ? '#fff' : '#000' }}
        >
          {this.props.title}
        </Text>
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
    fontWeight: '500'
  }
};

export default connect(({ appReducer }) => ({ dark: appReducer.darkMode }))(
  HomeTitle
);
