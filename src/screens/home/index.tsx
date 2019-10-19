import React from 'react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Container, HStack, SearchBar, Title } from '../../components';
import { BookList } from './bookList';
import { Book, SavedBook } from '../../model/Book';
import { BookAction, BookAdd } from '../../reducers/book/book.action';
import Icon from 'react-native-vector-icons/Feather';
import { IState } from '../../reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface IStateProps {
  books: SavedBook[];
}

interface IDispatchProps {
  addBooks(books: Book[]): void;
}

class _Home extends React.Component<NavigationInjectedProps & IStateProps & IDispatchProps> {
  onNavigateBook = (book: SavedBook) => () => {
    this.props.navigation.navigate({ routeName: 'chapters', params: { bookId: book.id } });
  };

  onNavigateSearch = () => {
    this.props.navigation.navigate('search');
  };

  onNavigateSetting = () => {
    this.props.navigation.navigate('setting');
  };

  render() {
    return (
      <Container>
        <HStack expand center>
          <Title>首页</Title>
          <Icon
            onPress={this.onNavigateSetting}
            name="settings"
            style={{ padding: 20, fontSize: 16, color: '#9b9b9b' }}
          />
        </HStack>
        <SearchBar onPress={this.onNavigateSearch} />
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

export const Home = connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(_Home));
