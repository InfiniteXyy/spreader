import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Caption,
  Divider,
  Image,
  Row,
  Screen,
  Subtitle,
  Touchable,
  View
} from '@shoutem/ui';
import { FlatList } from 'react-native';
import { loadBooks } from '../reducers/bookReducer';

class BookList extends Component {
  componentDidMount() {
    this.props.load();
  }

  render() {
    return (
      <Screen>
        <FlatList data={this.props.books} renderItem={this.renderRow} />
      </Screen>
    );
  }

  renderRow = ({ item }) => {
    return (
      <View>
        <Touchable onPress={this.navigateBook(item)}>
          <Row>
            <Image
              styleName="small rounded-corners"
              source={{ uri: item.coverImg }}
            />
            <View styleName="vertical stretch space-between">
              <Subtitle>{item.title}</Subtitle>
              <Caption>{item.isFetching ? '加载中' : '加载完成'}</Caption>
            </View>
          </Row>
        </Touchable>
        <Divider styleName="line" />
      </View>
    );
  };

  navigateBook = book => () => {
    this.props.navigation.navigate('Book', { bookId: book.id });
  };
}

const mapStateToProps = ({ bookReducer }) => ({
  books: bookReducer.books
});

const mapDispatchToProps = dispatch => ({
  load: () => dispatch(loadBooks())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookList);
