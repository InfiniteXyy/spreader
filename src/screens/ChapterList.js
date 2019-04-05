import React, { Component } from 'react';
import {
  Button,
  Caption,
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
import { loadChapters, PAGE_LENGTH } from '../reducers/bookReducer';
import { getPageRange, statusBarOffset } from '../utils';
import ChapterPicker from '../components/ChapterPicker';
import classNames from 'classnames';
import AnimatedHeader from '../components/AnimatedHeader';
import {
  darkBg,
  dividerColor,
  dividerColorLight,
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
          <Text numberOfLines={1} style={styles.itemText}>
            {item.title}
          </Text>
          <Divider styleName="line" />
        </Row>
      </Touchable>
    );
  }
}

const Header = ({ book, dark }) => {
  return (
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

  constructor(props) {
    super(props);
    this.bookId = props.navigation.getParam('bookId');
    this.state = {
      isReversed: false,
      page: 0
    };
  }

  render() {
    const { books, onLoad, dark } = this.props;
    this.book = currentBook(books, this.bookId);
    const { chapters } = this.book;
    const { page, isReversed } = this.state;
    let data = [];
    if (chapters !== undefined) {
      let [start, end] = getPageRange(page, PAGE_LENGTH, chapters.length);
      data = chapters.slice(start, end);
      if (isReversed) data.reverse();
      data.unshift(Stack);
    }

    return (
      <Screen styleName={classNames({ dark })}>
        <FlatList
          style={{ marginTop: statusBarOffset(56) }}
          stickyHeaderIndices={[1]}
          ListHeaderComponent={<Header book={this.book} dark={dark} />}
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
          page={this.state.page}
          onPageChange={this.togglePage}
          maxLength={this.book.chapters.length}
          reversed={this.state.isReversed}
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
                  {this.state.isReversed ? '逆序' : '顺序'}
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
    let maxPage = Math.ceil(this.book.chapters.length / PAGE_LENGTH);
    this.setState(prevState => {
      const { isReversed } = prevState;
      return {
        ...prevState,
        isReversed: !isReversed,
        page: !isReversed ? maxPage - 1 : 0
      };
    });
  };
  togglePage = page => {
    this.setState({ page });
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
  onLoad: book => () => dispatch(loadChapters(book))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChapterList);
