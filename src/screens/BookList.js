import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Caption,
  Divider,
  Icon,
  Image,
  Row,
  Screen,
  Spinner,
  Subtitle,
  Title,
  Touchable,
  View
} from '@shoutem/ui';
import { FlatList } from 'react-native';
import { loadChapters } from '../reducers/bookReducer';

class BookList extends Component {
  componentDidMount() {
    this.props.books.forEach(this.props.onLoad);
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
              styleName="rounded-corners"
              style={{ width: 70, height: 95 }}
              source={{ uri: item.coverImg }}
            />
            <View styleName="vertical stretch space-between">
              <View>
                <Title style={{ color: '#4a4a4a' }} styleName="bold">
                  {item.title}
                </Title>
                <Subtitle>{item.author}</Subtitle>
              </View>
              {item.updatedNum === 0 ? (
                <Caption>无更新</Caption>
              ) : (
                <Caption style={{ color: '#007bbb' }}>{`${
                  item.updatedNum
                } 个更新`}</Caption>
              )}
            </View>
            {item.isFetching ? (
              <Button styleName="right-icon">
                <Spinner />
              </Button>
            ) : (
              <Icon styleName="disclosure" name="right-arrow" />
            )}
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
  onLoad: book => dispatch(loadChapters(book))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookList);
