import React from 'react';
import { Button, Icon, View } from '@shoutem/ui';
import { connect } from 'react-redux';
import { Animated, ScrollView } from 'react-native';
import { ios } from '../utils';

type Props = {
  goBack: Function,
  visible: boolean,
  rightComponent: React.Component,
  bgColor: string,
  tintColor: string
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
          {this.props.rightComponent}
        </View>
      </Animated.View>
    );
  }

  onBack = () => {
    if (this.props.visible) {
      this.props.goBack();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
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
    top: ios ? 20 : 0,
    left: 0,
    right: 0
  }
};

export default AnimatedHeader;
