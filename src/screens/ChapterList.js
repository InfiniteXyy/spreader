import React, { Component } from 'react';
import {
  Button,
  Divider,
  Icon,
  Image,
  Row,
  Screen,
  Spinner,
  Text,
  Touchable,
  View
} from '@shoutem/ui';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import {
  currentBook,
  loadChapters,
  PAGE_LENGTH
} from '../reducers/bookReducer';
import { getPageRange } from '../utils';
import ChapterPicker from '../components/ChapterPicker';

const Stack = { key: '-1', title: '-1' };

class ItemRow extends React.PureComponent {
  render() {
    return (
      <Touchable onPress={this.props.onPress}>
        <Row style={styles.listItem}>
          <Text numberOfLines={1} style={styles.itemText}>
            {this.props.item.title}
          </Text>
        </Row>
        <Divider styleName="line" />
      </Touchable>
    );
  }
}

const Header = ({ book }) => {
  return (
    <View style={styles.headerContainer} styleName="horizontal v-start">
      <Image style={styles.coverImg} source={{ uri: book.coverImg }} />
      <View styleName="space-between stretch">
        <View>
          <Text style={styles.title} styleName="bold sm-gutter-bottom">
            {book.title}
          </Text>
          <Text style={styles.subtitle}>{book.author}</Text>
        </View>
        {book.lastRead && (
          <View>
            <Text styleName="bold sm-gutter-bottom">上次读到：</Text>
            <Text style={{ color: '#007bbb' }}>{book.lastRead.title}</Text>
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
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button styleName="clear" onPress={() => navigation.goBack()}>
          <Icon name="left-arrow" />
        </Button>
      ),
      headerRight: (
        <Button styleName="clear">
          <MySpinner id={navigation.getParam('bookId')} />
        </Button>
      )
    };
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
    const { books, onLoad } = this.props;
    const book = currentBook(books, this.bookId);
    this.book = book;
    const { chapters } = book;
    const { page, isReversed } = this.state;
    let data = [];
    if (chapters !== undefined) {
      let [start, end] = getPageRange(page, PAGE_LENGTH, chapters.length);
      data = chapters.slice(start, end);
      if (isReversed) data.reverse();
      data.unshift(Stack);
    }

    return (
      <Screen styleName="">
        <FlatList
          stickyHeaderIndices={[1]}
          ListHeaderComponent={<Header book={book} />}
          onRefresh={onLoad(book)}
          refreshing={false}
          data={data}
          renderItem={this.renderRow}
          getItemLayout={this.getItemLayout}
        />
      </Screen>
    );
  }

  renderSection = () => {
    let length = this.book.chapters.length;
    return (
      <View
        style={styles.section}
        styleName="horizontal v-center space-between"
      >
        <ChapterPicker
          page={this.state.page}
          onPageChange={this.togglePage}
          maxLength={this.book.chapters.length}
          reversed={this.state.isReversed}
        />

        <View styleName="horizontal v-center">
          <Text style={{ color: '#9b9b9b' }}>{`共 ${length} 章`}</Text>
          <View styleName="md-gutter-left">
            <Touchable onPress={this.toggleReverse}>
              <View style={styles.smButton}>
                <Text style={{ color: 'white' }}>
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
      return <ItemRow item={item} onPress={this.navigateChapter(item)} />;
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
    backgroundColor: 'white',
    height: 50,
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
  headerContainer: {
    backgroundColor: 'white',
    padding: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4a4a4a'
  },
  subtitle: {
    fontSize: 18
  },
  section: {
    backgroundColor: 'white',
    height: 36,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eeeeee'
  },
  smButton: {
    backgroundColor: '#cccccc',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3
  }
};

const mapStateToProps = ({ bookReducer }) => ({
  books: bookReducer.books
});

const mapDispatchToProps = dispatch => ({
  onLoad: book => () => dispatch(loadChapters(book))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChapterList);
