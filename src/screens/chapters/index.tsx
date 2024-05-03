import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Container, Header, Spinner } from '../../components';
import { SavedBook } from '../../model/Book';
import { IState } from '../../reducers';
import { BookAction, BookLoadChaptersAsync } from '../../reducers/book/book.action';
import { ChapterList } from './ChapterList';

interface IStateProps {
  book?: SavedBook;
}

interface IDispatchProps {
  loadChapters(book: SavedBook): void;
}

function Chapters(props: IDispatchProps) {
  const navigation = useNavigation<any>();
  const { book } = useChapterState();
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    if (book?.chapters.length === 0) {
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

  if (!book) {
    return <Container />;
  }

  return (
    <Container>
      <Header
        title={book.title}
        titleVisible={titleVisible}
        goBack={() => navigation.goBack()}
        rightComponent={<Spinner loading={book.isFetching} />}
      />
      <ChapterList onScroll={onScroll} book={book} onLoad={() => props.loadChapters(book)} />
    </Container>
  );
}

function useChapterState(): IStateProps {
  const route = useRoute<any>();
  return useSelector((state: IState) => {
    const bookId = route.params.bookId;
    return {
      book: state.bookReducer.books.find((i) => i.id === bookId),
    };
  });
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, void, BookAction>): IDispatchProps {
  return {
    loadChapters: (book: SavedBook) => dispatch(BookLoadChaptersAsync(book)),
  };
}

export default connect(() => null, mapDispatchToProps)(Chapters);
