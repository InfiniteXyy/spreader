import React, { Component } from 'react';
import {
  Divider,
  ListView,
  Row,
  Screen,
  Text,
  TouchableOpacity
} from '@shoutem/ui';
import { NavigationBar } from '@shoutem/ui/navigation';
import { navigatePush } from '../../redux';
import { connect } from 'react-redux';

type Props = {};
class Book extends Component<Props> {
  render() {
    const { book } = this.props;
    return (
      <Screen styleName="paper full-screen">
        <NavigationBar title={book.title} />
        <ListView data={book.chapters} renderRow={this.renderRow} />
      </Screen>
    );
  }

  renderRow = chapter => {
    const { onButtonPress } = this.props;
    return (
      <TouchableOpacity onPress={onButtonPress(chapter)}>
        <Row styleName="small">
          <Text numberOfLines={1}>{chapter.title}</Text>
        </Row>
        <Divider styleName="line" />
      </TouchableOpacity>
    );
  };
}

const mapDispatchToProps = dispatch => ({
  onButtonPress: chapter => () => {
    dispatch(
      navigatePush(
        {
          key: 'Chapter'
        },
        { chapter }
      )
    );
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(Book);
