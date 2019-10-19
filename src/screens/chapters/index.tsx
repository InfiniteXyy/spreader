import React, { useEffect } from 'react';
import { Container, Header, Spinner } from '../../components';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { SavedBook } from '../../model/Book';
import { BookAction, BookLoadChaptersAsync } from '../../reducers/book/book.action';
import { ThunkDispatch } from 'redux-thunk';
import { ChapterList } from './ChapterList';

interface IStateProps {
  book?: SavedBook;
}

interface IDispatchProps {
  loadChapters(book: SavedBook): void;
}

function Chapters(props: NavigationInjectedProps & IStateProps & IDispatchProps) {
  const { book, navigation } = props;
  if (!book) {
    return <Container />;
  }
  useEffect(() => {
    if (book.chapters.length === 0) {
      props.loadChapters(book);
    }
  }, []);

  return (
    <Container>
      <Header goBack={() => navigation.goBack()} rightComponent={<Spinner loading={book.isFetching} />} />
      <ChapterList book={book} onLoad={() => props.loadChapters(book)} />
    </Container>
  );
}

function mapStateToProps(state: IState, props: NavigationInjectedProps): IStateProps {
  const bookId = props.navigation.getParam('bookId');
  return {
    book: state.bookReducer.books.find(i => i.id === bookId),
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, void, BookAction>): IDispatchProps {
  return {
    loadChapters: (book: SavedBook) => dispatch(BookLoadChaptersAsync(book)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Chapters));
