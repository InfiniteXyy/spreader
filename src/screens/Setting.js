import React from 'react';
import { Button, View, Text } from 'react-native';
import { connect } from 'react-redux';

class Setting extends React.Component {
  render() {
    return (
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 100 }}>{1}</Text>
      </View>
    );
  }
}

export default connect()(Setting);
