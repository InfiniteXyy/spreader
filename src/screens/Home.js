import React, { Component } from 'react';
import {
  Caption,
  Divider,
  Image,
  ListView,
  Row,
  Subtitle,
  Touchable,
  View,
  Screen,
  Button,
  Icon
} from '@shoutem/ui';

function getBooks() {
  return require('../../assets/data/books.json');
}

class Home extends Component {
  static navigationOptions = {
    title: '书库',
    headerRight: (
      <Button>
        <Icon name="sidebar" />
      </Button>
    )
  };

  render() {
    return (
      <Screen styleName="paper">
        <ListView data={getBooks()} renderRow={this.renderRow} />
      </Screen>
    );
  }

  renderRow = book => {
    return (
      <View>
        <Touchable onPress={this.navigateBook(book)}>
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
        </Touchable>
        <Divider styleName="line" />
      </View>
    );
  };

  navigateBook = book => () => {
    this.props.navigation.push('Book', { book });
  };
}

export default Home;
