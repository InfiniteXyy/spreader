import React from 'react';

import {
  GridRow, Icon,
  Image,
  ImageBackground,
  Overlay,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from '@shoutem/ui'
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { loadStore } from '../reducers/storeReducer';
import { addBook, removeBook } from '../reducers/bookReducer';
import HomeTitle from '../components/HomeTitle';

function hasSpiderInList(books, key) {
  for (let book of books) {
    if (book.id === key) {
      return true;
    }
  }
  return false;
}

class SpiderList extends React.Component {
  componentDidMount() {
    for (let store of this.props.stores) {
      this.props.refreshStore(store);
    }
  }

  toggleInList = (type, spider, href) => () => {
    if (type) {
      this.props.addBook(spider, href);
    } else {
      this.props.removeBook(href + '/' + spider.key);
    }
  };

  renderStore = ({ item }) => {
    const spiders = item.spiders.map((spider, id) => {
      let bookId = item.href + '/' + spider.key;
      let inList = hasSpiderInList(this.props.books, bookId);
      return (
        <TouchableOpacity
          key={id}
          onPress={this.toggleInList(!inList, spider, item.href)}
        >
          <View styleName="vertical h-center">
            <View>
              <ImageBackground
                imageStyle={{ borderRadius: 4 }}
                style={styles.image}
                source={{ uri: spider.coverImg }}
              >
                {inList && (
                  <Overlay
                    style={{ borderRadius: 4 }}
                    styleName="fill-parent"
                  >
                    <Icon name="checkbox-on"/>
                  </Overlay>
                )}
              </ImageBackground>
              <Text style={styles.bookName}>{spider.title}</Text>
              <Text style={styles.authorName}>{spider.author}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <View>
        <Text style={styles.storeName}>{item.title}</Text>
        <GridRow columns={3} style={{ marginHorizontal: 4 }}>
          {spiders}
        </GridRow>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <View>
              <HomeTitle title="书虫" />
              <TextInput placeholder="搜索" />
            </View>
          }
          data={this.props.stores}
          renderItem={this.renderStore}
        />
      </View>
    );
  }
}

const styles = {
  image: {
    height: 140,
    width: 100
  },
  bookName: {
    marginTop: 6,
    color: '#4a4a4a',
    fontSize: 14,
    fontWeight: '500'
  },
  authorName: {
    marginTop: 2,
    color: '#9b9b9b',
    fontSize: 12
  },
  storeName: {
    color: '#4a4a4a',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 25,
    marginVertical: 20
  }
};

const mapStateToProps = ({ storeReducer, bookReducer }) => ({
  stores: storeReducer.stores,
  books: bookReducer.books
});

const mapDispatchToProps = dispatch => ({
  refreshStore: store => dispatch(loadStore(store)),
  addBook: (spider, href) => dispatch(addBook(spider, href)),
  removeBook: bookId => dispatch(removeBook(bookId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpiderList);
