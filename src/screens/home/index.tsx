import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Dispatch } from 'redux';
import { IState } from '../../reducers';
import { Container, Title } from '../../components';
import { BookList } from './bookList';
import agent from '../../agents';
import { Book, SavedBook } from '../../model/Book';
import { BookAction, BookAdd } from '../../reducers/book/book.action';

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
          console.log(store);
          this.props.addBooks(store.spiders);
        });
  }

  onNavigateBook = (book: SavedBook) => () => {
    this.props.navigation.navigate({ routeName: 'chapters', params: { bookId: book.id } });
  };

  render() {
    return (
      <Container>
        <ScrollView>
          <Title>首页</Title>
          <BookList onNavigate={this.onNavigateBook} books={this.props.books} />
        </ScrollView>
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
