import React from 'react';
import { Button, Icon, View } from '@shoutem/ui';
import { connect } from 'react-redux';

type Props = {
  goBack: Function,
  openModal: Function
};
class AnimatedHeader extends React.Component<Props> {
  render() {
    return (
      <View style={styles.navigation} styleName="space-between horizontal">
        <Button styleName="clear" onPress={this.props.goBack}>
          <Icon style={{ color: this.props.tintColor, opacity: 0.8 }} name="left-arrow" />
        </Button>
        <Button styleName="clear" onPress={this.props.openModal}>
          <Icon style={{ color: this.props.tintColor, opacity: 0.8 }} name="settings" />
        </Button>
      </View>
    );
  }
}
const styles = {
  navigation: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0
  }
};
const mapStateToProps = ({ appReducer }) => ({
  tintColor: appReducer.theme.content.color
});
export default connect(mapStateToProps)(AnimatedHeader);
