import React from 'react';
import { Button, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { addNum } from '../reducers/appReducer';

class Setting extends React.Component {
  render() {
    return (
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 100 }}>{this.props.num}</Text>
        <Button title="click me" onPress={this.props.onClick} />
      </View>
    );
  }
}

const mapStateToProps = ({ appReducer }) => ({
  num: appReducer.num
});

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(addNum());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
