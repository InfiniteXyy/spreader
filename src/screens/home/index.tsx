import React from 'react';
import { ScrollView } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Container, HStack, SearchBar, Text, Title } from '../../components';
import { BookList } from './bookList';
import agent from '../../agents';
import { Book, SavedBook } from '../../model/Book';
import { BookAction, BookAdd } from '../../reducers/book/book.action';
import Icon from 'react-native-vector-icons/Ionicons';
import { IState } from '../../reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface IStateProps {
  books: SavedBook[];
}

interface IDispatchProps {
  addBooks(books: Book[]): void;
}

class Home extends React.Component<NavigationInjectedProps & IStateProps & IDispatchProps> {
  componentDidMount() {
    if (this.props.books.length === 0)
      agent
        .getJSON('https://raw.githubusercontent.com/InfiniteXyy/spreader/master/assets/data/books.json')
        .then(store => {
          this.props.addBooks(store.spiders);
        });
  }

  onNavigateBook = (book: SavedBook) => () => {
    this.props.navigation.navigate({ routeName: 'chapters', params: { bookId: book.id } });
  };

  render() {
    return (
      <Container>
        <HStack expand center>
          <Title>首页</Title>
          <HStack center style={{ marginRight: 20 }}>
            <Icon name="md-refresh" style={{ marginRight: 8, fontSize: 16, color: '#9b9b9b' }} />
            <Text secondary variant="tip">
              更新
            </Text>
          </HStack>
        </HStack>
        <SearchBar />
        <BookList onNavigate={this.onNavigateBook} books={this.props.books} />
      </Container>
    );
  }
}

function mapStateToProps(state: IState): IStateProps {
  return {
    books: state.bookReducer.books,
  };
}

function mapDispatchToProps(dispatch: Dispatch<BookAction>) {
  return {
    addBooks(books: Book[]) {
      for (let book of books) {
        dispatch(new BookAdd(book));
      }
    },
  };
}

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Home));
