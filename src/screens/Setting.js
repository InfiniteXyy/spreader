import React from 'react';
import { Screen, Button, Text, View } from '@shoutem/ui';
import { connect } from 'react-redux';
import { toggleMode } from '../reducers/appReducer';
import classNames from 'classnames';

class Setting extends React.Component {
  render() {
    return (
      <Screen styleName={classNames({ dark: this.props.darkMode })}>
        <View styleName="vertical v-center h-center fill-parent">
          <Button
            styleName={this.props.darkMode ? 'default' : 'secondary'}
            onPress={this.props.toggle(!this.props.darkMode)}
            style={{ width: 100 }}
          >
            <Text>{this.props.darkMode ? 'dark' : 'light'}</Text>
          </Button>
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({ appReducer }) => ({
  darkMode: appReducer.darkMode
});

const mapDispatchToProps = dispatch => ({
  toggle: darkMode => () => dispatch(toggleMode(darkMode))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
