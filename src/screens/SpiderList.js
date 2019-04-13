import React from 'react';

import {
  GridRow,
  Icon,
  ImageBackground,
  Overlay,
  Screen,
  Subtitle,
  TextInput,
  Title,
  TouchableOpacity,
  View
} from '@shoutem/ui';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { loadStore } from '../reducers/storeReducer';
import { addBook, removeBook } from '../reducers/bookReducer';
import HomeTitle from '../components/HomeTitle';
import { statusBarOffset } from '../utils';
import classNames from 'classnames';
import { primaryText, primaryTextLight } from '../theme';

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
      if (!store.visible) continue;
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
    if (!item.visible) return <View />;
    let dark = this.props.darkMode;
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
                  <Overlay style={{ borderRadius: 4 }} styleName="fill-parent">
                    <Icon name="checkbox-on" />
                  </Overlay>
                )}
              </ImageBackground>
              <Title styleName={classNames({ dark })} style={styles.bookName}>
                {spider.title}
              </Title>
              <Subtitle
                styleName={classNames({ dark })}
                style={styles.authorName}
              >
                {spider.author}
              </Subtitle>
            </View>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <View>
        <Title styleName={classNames({ dark })} style={styles.storeName}>
          {item.title}
        </Title>
        <GridRow columns={3} style={{ marginHorizontal: 4 }}>
          {spiders}
        </GridRow>
      </View>
    );
  };

  render() {
    let dark = this.props.darkMode;
    return (
      <Screen styleName={classNames({ dark: this.props.darkMode })}>
        <FlatList
          style={{ marginTop: statusBarOffset() }}
          ListHeaderComponent={
            <View>
              <HomeTitle
                title="书虫"
                right={
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('AllStores')}
                  >
                    <Icon name="settings" styleName={classNames({ dark })} />
                  </TouchableOpacity>
                }
              />
              <View style={{ paddingHorizontal: 20 }}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="搜索"
                  style={{
                    paddingVertical: 0,
                    height: 40,
                    backgroundColor: 'rgba(0,0,0,0.08)',
                    borderRadius: 4,
                    selectionColor: this.props.darkMode
                      ? primaryTextLight
                      : primaryText,
                    color: this.props.darkMode ? primaryTextLight : primaryText
                  }}
                />
              </View>
            </View>
          }
          data={this.props.stores}
          renderItem={this.renderStore}
        />
      </Screen>
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
    fontSize: 14
  },
  authorName: {
    lineHeight: 20,
    fontSize: 12
  },
  storeName: {
    marginLeft: 25,
    marginVertical: 20
  }
};

const mapStateToProps = ({
  storeReducer,
  bookReducer,
  appReducer: { darkMode }
}) => ({
  stores: storeReducer.stores,
  books: bookReducer.books,
  darkMode
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
