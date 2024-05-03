import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useDispatch } from 'react-redux';

import { ChapterList } from './ChapterList';
import { Container, Header, Spinner } from '../../components';
import { SavedBook } from '../../model/Book';
import { BookLoadChaptersAsync } from '../../reducers/book/book.action';
import { useTrackedSelector } from '../../store';

interface IStateProps {
  book?: SavedBook;
}

export function Chapters() {
  const navigation = useNavigation<any>();
  const { book } = useChapterState();
  const [titleVisible, setTitleVisible] = useState(false);

  const dispatch = useDispatch<any>();
  const loadChapters = useCallback((book: SavedBook) => dispatch(BookLoadChaptersAsync(book)), [dispatch]);

  useEffect(() => {
    if (book?.chapters.length === 0) {
      loadChapters(book);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only call once on mounted
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
      <ChapterList onScroll={onScroll} book={book} onLoad={() => loadChapters(book)} />
    </Container>
  );
}

function useChapterState(): IStateProps {
  const route = useRoute<any>();
  const { books } = useTrackedSelector().bookReducer;
  const bookId = route.params.bookId;
  return useMemo(() => {
    return { book: books.find((b) => b.id === bookId) };
  }, [bookId, books]);
}
