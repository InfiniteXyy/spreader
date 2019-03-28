import React, { Component } from 'react';
import { Icon, Screen, ScrollView, Text } from '@shoutem/ui';
import { NavigationBar } from '@shoutem/ui/navigation';

type Props = {};
export default class Chapter extends Component<Props> {
  state = {
    font: 18
  };
  render() {
    const { chapter } = this.props;
    return (
      <Screen styleName="paper full-screen" style={styles.root}>
        <NavigationBar
          title={chapter.title}
          rightComponent={<Icon name="sidebar" onPress={this.fontBigger} />}
        />
        <ScrollView style={{ ...styles.content, fontSize: this.state.font }}>
          {chapter.content.split('\n').map((i, index) => {
            return <Text id={index}>{i}</Text>;
          })}
        </ScrollView>
      </Screen>
    );
  }

  fontBigger = () => {
    this.setState(prevState => {
      return { font: prevState.font + 1 };
    });
  };
}

const styles = {
  content: {
    lineHeight: 34,
    color: 'black',
    paddingHorizontal: 20
  },
  root: {}
};
