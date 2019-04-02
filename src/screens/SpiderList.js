import React from 'react';

import {
  Card,
  GridRow,
  Image,
  Switch,
  Text,
  TouchableOpacity,
  View
} from '@shoutem/ui';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { loadStore } from '../reducers/storeReducer';
import { addBook, removeBook } from '../reducers/bookReducer';

const hasBookInList = (books, spider) => {};

class SpiderList extends React.Component {
  componentDidMount() {
    for (let store of this.props.stores) {
      console.log(store);
      this.props.refreshStore(store);
    }
  }

  toggleStatus = (book, source) => value => {
    if (value) {
      this.props.addBook();
    } else {
    }
  };

  renderRow = ({ item }) => {
    const cellViews = item.map((book, id) => {
      return (
        <TouchableOpacity key={id} styleName="flexible">
          <Card styleName="flexible">
            <Image styleName="medium" source={{ uri: book.coverImg }} />
            <View styleName="content md-gutter-top md-gutter-left">
              <Text>{book.title}</Text>
              <Switch
                onValueChange={this.toggleStatus(book, book.source)}
                value={false}
              />
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
    const groupedData = GridRow.groupByRows(this.props.spiders, 2, () => 1);
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <Text
              style={{
                fontSize: 40,
                fontWeight: 'bold',
                color: '#4a4a4a',
                marginTop: 50,
                marginBottom: 20,
                marginLeft: 10
              }}
            >
              书虫
            </Text>
          }
          data={groupedData}
          renderItem={this.renderRow}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ storeReducer, bookReducer }) => ({
  spiders: storeReducer.spiders,
  stores: storeReducer.stores,
  books: bookReducer.books
});

const mapDispatchToProps = dispatch => ({
  refreshStore: store => dispatch(loadStore(store)),
  addBook: (spider, source) => dispatch(addBook(spider, source)),
  removeBook: bookId => dispatch(removeBook(bookId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpiderList);
