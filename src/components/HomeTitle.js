import React, { Component } from 'react';
import { View, Text } from '@shoutem/ui';
import { connect } from 'react-redux';

type Props = {
  title: string,
  right: React.Component
};

class HomeTitle extends Component<Props> {
  render() {
    return (
      <View
        style={styles.titleContainer}
        styleName="horizontal v-center space-between"
      >
        <Text
          style={{ ...styles.title, color: this.props.dark ? '#fff' : '#000' }}
        >
          {this.props.title}
        </Text>
        {this.props.right || null}
      </View>
    );
  }
}

const styles = {
  titleContainer: {
    marginHorizontal: 25,
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
