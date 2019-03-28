import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Caption,
  Divider,
  Image,
  ListView,
  Row,
  Subtitle,
  TouchableOpacity
} from '@shoutem/ui';
import { connect } from 'react-redux';
import { navigatePush } from '../../redux';
import { NavigationBar } from '@shoutem/ui/navigation';

type Props = {};

class BookList extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title="书库" />
        <ListView data={BookList.getBooks()} renderRow={this.renderRow} />
      </View>
    );
  }

  static getBooks() {
    return require('../../../assets/data/books.json');
  }

  renderRow = book => {
    const { onButtonPress } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={onButtonPress(book)}>
          <Row>
            <Image
              styleName="small rounded-corners"
              source={{ uri: book.coverImg }}
            />
            <View styleName="vertical stretch space-between">
              <Subtitle>{book.title}</Subtitle>
              <Caption>{book.author}</Caption>
            </View>
          </Row>
        </TouchableOpacity>
        <Divider styleName="line" />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapDispatchToProps = dispatch => ({
  onButtonPress: book => () => {
    dispatch(
      navigatePush(
        {
          key: 'BookDetail'
        },
        { book }
      )
    );
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(BookList);
