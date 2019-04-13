import React, { Component } from 'react';
import {
  Button,
  Divider,
  Image,
  Row,
  Screen,
  Spinner,
  Subtitle,
  Text,
  Title,
  Touchable,
  View
} from '@shoutem/ui';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import {
  loadChapters,
  markAllRead,
  PAGE_LENGTH,
  togglePage
} from '../reducers/bookReducer';
import { getPageRange, statusBarOffset } from '../utils';
import ChapterPicker from '../components/ChapterPicker';
import classNames from 'classnames';
import AnimatedHeader from '../components/AnimatedHeader';
import { showMessage } from 'react-native-flash-message';

import {
  darkBg,
  dividerColor,
  dividerColorLight,
  secondaryText,
  secondaryTextLight,
  tintColor,
  tintColorLight
} from '../theme';

const Stack = { key: '-1', title: '-1' };

function currentBook(books, bookId) {
  for (let i of books) {
    if (i.id === bookId) {
      return i;
    }
  }
  return null;
}

class ItemRow extends React.PureComponent {
  render() {
    const { onPress, item, dark } = this.props;
    return (
      <Touchable onPress={onPress}>
        <Row style={styles.listItem} styleName={classNames({ dark })}>
          {item.hasRead || (
            <View
              styleName="notification-dot"
              style={{
                backgroundColor: dark ? secondaryTextLight : secondaryText
              }}
            />
          )}
          <Text numberOfLines={1} style={styles.itemText}>
            {item.title}
          </Text>
          <Divider styleName="line" />
        </Row>
      </Touchable>
    );
  }
}

const Header = props => {
  let { book, dark, markAllRead, readNext } = props;
  return (
    <View>
      <View
        styleName={classNames('horizontal', 'v-center', { dark })}
        style={{ paddingLeft: 20, paddingBottom: 20 }}
      >
        <Image style={styles.coverImg} source={{ uri: book.coverImg }} />
        <View styleName="space-between stretch">
          <View>
            <Title style={styles.title} styleName={classNames({ dark })}>
              {book.title}
            </Title>
            <Subtitle styleName={classNames({ dark })} style={styles.subtitle}>
              {book.author}
            </Subtitle>
          </View>
          {book.lastRead && (
            <View>
              <Text
                styleName={classNames({ dark })}
                style={{ fontWeight: 'bold', marginBottom: 6 }}
              >
                上次读到
              </Text>
              <Text style={{ color: 'tomato' }}>{book.lastRead.title}</Text>
            </View>
          )}
        </View>
      </View>
      <View
        styleName={classNames('horizontal', 'v-center', { dark })}
        style={{ marginBottom: 10 }}
      >
        <Button styleName={classNames('small', { dark })} onPress={readNext}>
          <Text>继续阅读</Text>
        </Button>
        <Button styleName={classNames('small', { dark })} onPress={markAllRead}>
          <Text>全部已读</Text>
        </Button>
      </View>
    </View>
  );
};

const MySpinner = connect(({ bookReducer }) => ({ books: bookReducer.books }))(
  props => {
    let { id, books } = props;
    return currentBook(books, id).isFetching ? (
      <Spinner style={{ marginRight: 8 }} />
    ) : (
      <View />
    );
  }
);

class ChapterList extends Component {
  static navigationOptions = {
    header: null
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  getRealPage = pageIndex => {
    if (!this.book.reverse) return pageIndex;
    return Math.ceil(this.book.chapters.length / PAGE_LENGTH) - pageIndex - 1;
  };

  readNext = () => {
    let last = this.book.lastRead;
    let hasFound = false;
    for (let i of this.book.chapters) {
      if (hasFound) {
        this.navigateChapter(i)();
        return;
      }
      if (i.href === last.href) {
        hasFound = true;
      }
    }
    showMessage({ message: '没有新的章节了', type: 'default', icon: 'info' });
  };
  constructor(props) {
    super(props);
    this.bookId = props.navigation.getParam('bookId');
  }

  render() {
    const { books, onLoad, dark } = this.props;
    this.book = currentBook(books, this.bookId);
    const { chapters, reverse, page } = this.book;
    let pageIndex = page;
    if (page === undefined) pageIndex = 0;
    let data = [];
    if (chapters !== undefined) {
      let realPage = this.getRealPage(pageIndex);
      let [start, end] = getPageRange(realPage, PAGE_LENGTH, chapters.length);
      data = chapters.slice(start, end);
      if (reverse) data.reverse();
      data.unshift(Stack);
    }

    return (
      <Screen styleName={classNames({ dark })}>
        <FlatList
          style={{ marginTop: statusBarOffset(56) }}
          stickyHeaderIndices={[1]}
          ListHeaderComponent={
            <Header
              book={this.book}
              dark={dark}
              markAllRead={this.props.markAllRead(this.bookId)}
              readNext={this.readNext}
            />
          }
          onRefresh={onLoad(this.book)}
          refreshing={false}
          data={data}
          renderItem={this.renderRow}
          getItemLayout={this.getItemLayout}
        />
        <AnimatedHeader
          visible={true}
          goBack={this.onBack}
          rightComponent={
            <Button styleName="clear">
              <MySpinner id={this.bookId} />
            </Button>
          }
          bgColor={dark ? darkBg : '#fff'}
          tintColor={dark ? tintColorLight : tintColor}
        />
      </Screen>
    );
  }

  renderSection = () => {
    let length = this.book.chapters.length;
    let dark = this.props.dark;
    let page = this.book.page;
    let pageIndex = page;
    if (page === undefined) pageIndex = 0;

    return (
      <View
        style={{
          ...styles.section,
          backgroundColor: dark ? darkBg : '#fff',
          borderBottomColor: dark ? dividerColorLight : dividerColor
        }}
        styleName="horizontal v-center space-between"
      >
        <ChapterPicker
          page={this.getRealPage(pageIndex)}
          onPageChange={this.togglePage}
          maxLength={length}
          reversed={this.book.reverse}
          dark={dark}
        />

        <View styleName="horizontal v-center">
          <Text
            styleName={classNames('secondary', { dark })}
          >{`共 ${length} 章`}</Text>
          <View styleName="md-gutter-left">
            <Touchable onPress={this.toggleReverse}>
              <View
                style={{
                  ...styles.smButton,
                  backgroundColor: dark ? '#656565' : '#cccccc'
                }}
              >
                <Text
                  styleName="bold"
                  style={{ color: dark ? secondaryTextLight : '#fff' }}
                >
                  {this.book.reverse ? '逆序' : '顺序'}
                </Text>
              </View>
            </Touchable>
          </View>
        </View>
      </View>
    );
  };

  renderRow = ({ item }) => {
    if (!item.href) {
      return this.renderSection();
    } else {
      return (
        <ItemRow
          dark={this.props.dark}
          item={item}
          onPress={this.navigateChapter(item)}
        />
      );
    }
  };

  navigateChapter = chapter => () => {
    this.props.navigation.push('Chapter', { chapter, book: this.book });
  };

  toggleReverse = () => {
    this.props.togglePage(this.bookId, !this.book.reverse, 0);
  };

  togglePage = page => {
    let realPage = this.book.reverse ? this.getRealPage(page) : page;
    this.props.togglePage(this.bookId, this.book.reverse, realPage);
  };

  getItemLayout = (data, index) => ({
    length: styles.listItem.height,
    offset: styles.listItem.height * index,
    index
  });
}

const styles = {
  listItem: {
    justifyContent: 'center',
    height: 50,
    paddingVertical: 0,
    paddingHorizontal: 20
  },
  itemText: {
    fontSize: 14
  },
  coverImg: {
    height: 140,
    width: 100,
    borderRadius: 4,
    marginRight: 20
  },
  title: {
    lineHeight: 35,
    fontSize: 26
  },
  subtitle: {
    fontSize: 18
  },
  section: {
    height: 36,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5
  },
  smButton: {
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3
  }
};

const mapStateToProps = ({ bookReducer, appReducer: { darkMode } }) => ({
  books: bookReducer.books,
  dark: darkMode
});

const mapDispatchToProps = dispatch => ({
  onLoad: book => () => dispatch(loadChapters(book)),
  togglePage: (bookId, reverse, page) =>
    dispatch(togglePage(bookId, reverse, page)),
  markAllRead: bookId => () => dispatch(markAllRead(bookId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChapterList);
