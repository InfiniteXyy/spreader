import React from 'react'

import {
  Caption,
  Card,
  GridRow,
  Image,
  Screen,
  Subtitle,
  TouchableOpacity,
  View,
} from '@shoutem/ui'
import { FlatList } from 'react-native'

function getBooks() {
  return require('../../assets/data/books.json');
}

class SpiderList extends React.Component {
  renderRow = ({ item }) => {
    const cellViews = item.map((book, id) => {
      return (
        <TouchableOpacity key={id} styleName="flexible">
          <Card styleName="flexible">
            <Image styleName="medium-wide" source={{ uri: book.coverImg }} />
            <View styleName="content">
              <Subtitle numberOfLines={3}>{book.title}</Subtitle>
              <View styleName="horizontal">
                <Caption styleName="collapsible" numberOfLines={2}>
                  {book.author}
                </Caption>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });

    return (
      <GridRow style={{ flex: 1 }} columns={2}>
        {cellViews}
      </GridRow>
    );
  };

  render() {
    const books = getBooks();
    const groupedData = GridRow.groupByRows(books, 2, () => 1);
    return (
      <Screen>
        <FlatList data={groupedData} renderItem={this.renderRow} />
      </Screen>
    );
  }
}

export default SpiderList;
