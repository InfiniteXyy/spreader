import React, { useCallback, useEffect, useState } from 'react';
import { Container, Header, Spinner } from '../../components';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { SavedBook } from '../../model/Book';
import { BookAction, BookLoadChaptersAsync } from '../../reducers/book/book.action';
import { ThunkDispatch } from 'redux-thunk';
import { ChapterList } from './ChapterList';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

interface IStateProps {
  book?: SavedBook;
}

interface IDispatchProps {
  loadChapters(book: SavedBook): void;
}

function Chapters(props: NavigationInjectedProps & IStateProps & IDispatchProps) {
  const { book, navigation } = props;
  const [titleVisible, setTitleVisible] = useState(false);
  if (!book) {
    return <Container />;
  }
  useEffect(() => {
    if (book.chapters.length === 0) {
      props.loadChapters(book);
    }
  }, []);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!titleVisible) {
        if (event.nativeEvent.contentOffset.y >= 70) {
          setTitleVisible(true);
        }
      } else {
        if (event.nativeEvent.contentOffset.y < 70) {
          setTitleVisible(false);
        }
      }
    },
    [titleVisible],
  );

  return (
    <Container>
      <Header
        title={book.title}
        titleVisible={titleVisible}
        goBack={() => navigation.goBack()}
        rightComponent={<Spinner loading={book.isFetching} />}
      />
      <ChapterList
        onScroll={onScroll}
        titleVisible={titleVisible}
        setTitleVisible={setTitleVisible}
        book={book}
        onLoad={() => props.loadChapters(book)}
      />
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
