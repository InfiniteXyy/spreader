import React from 'react';
import { Button, Icon, View } from '@shoutem/ui';
import { connect } from 'react-redux';
import { ios } from '../utils';
import { Animated } from 'react-native';

type Props = {
  goBack: Function,
  openModal: Function
};
class AnimatedHeader extends React.Component<Props> {
  state = {
    opacityAnimate: new Animated.Value(0.8)
  };
  render() {
    return (
      <Animated.View
        style={{
          ...styles.navigation,
          opacity: this.state.opacityAnimate,
          backgroundColor: this.props.bgColor
        }}
      >
        <View styleName="space-between horizontal">
          <Button styleName="clear" onPress={this.onBack}>
            <Icon style={{ color: this.props.tintColor }} name="left-arrow" />
          </Button>
          <Button styleName="clear" onPress={this.onOpen}>
            <Icon style={{ color: this.props.tintColor }} name="settings" />
          </Button>
        </View>
      </Animated.View>
    );
  }

  onBack = () => {
    if (this.props.open) {
      this.props.goBack();
    }
  };

  onOpen = () => {
    if (this.props.open) {
      this.props.openModal();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      this.toggleOpacity(true);
    } else {
      this.toggleOpacity(false);
    }
  }

  toggleOpacity = visible => {
    if (visible) {
      Animated.timing(this.state.opacityAnimate, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(this.state.opacityAnimate, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      }).start();
    }
  };
}
const styles = {
  navigation: {
    position: 'absolute',
    paddingTop: 16,
    paddingBottom: 16,
    top: 0,
    left: 0,
    right: 0
  }
};
const mapStateToProps = ({ appReducer }) => ({
  tintColor: appReducer.theme.content.color,
  bgColor: appReducer.theme.root.backgroundColor
});
export default connect(mapStateToProps)(AnimatedHeader);
