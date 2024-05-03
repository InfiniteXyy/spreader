import React, { useMemo } from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { BookItem } from './BookItem';
import BookListEmptyView from './BookListEmptyView';
import { SavedBook } from '../../model/Book';
import { SavedChapter } from '../../model/Chapter';
import {
  BookLoadChaptersAsync,
  BookMarkAllAsRead,
  BookRemove,
  BookSetSavedList,
} from '../../reducers/book/book.action';
import { useTrackedSelector } from '../../store';
import { findNext } from '../../utils';

interface IBookListProps {
  onNavigate(book: SavedBook): () => void;
  onNavigateSearch(): void;
  onNavigateChapter(book: SavedBook, chapter: SavedChapter): () => void;
}

export function BookList(props: IBookListProps) {
  const { books } = useTrackedSelector().bookReducer;
  const { onNavigate, onNavigateChapter, onNavigateSearch } = props;
  const { markAllRead, removeBook, setBookList, updateBooks } = useActions();

  return (
    <DraggableFlatList
      data={books}
      refreshing={false}
      ListEmptyComponent={<BookListEmptyView onPress={onNavigateSearch} />}
      onRefresh={() => updateBooks(books)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, drag }) => {
        let nextChapter = item.chapters[0];
        if (item.lastRead !== undefined) {
          const href = item.lastRead.href;
          nextChapter = findNext(item.chapters, (i) => href === i.href);
        }
        const menuActions = {
          markAllRead: () => markAllRead(item),
          continueRead: onNavigateChapter(item, nextChapter),
          deleteBook: () => removeBook(item),
        };
        return <BookItem book={item} onPress={onNavigate(item)} onLongPress={drag} menuActions={menuActions} />;
      }}
      onDragEnd={({ data }) => {
        if (data !== null) {
          setBookList(data);
        }
      }}
    />
  );
}

function useActions() {
  const dispatch = useDispatch<Dispatch<any>>();
  return useMemo(() => {
    return {
      markAllRead(book: SavedBook): void {
        dispatch(new BookMarkAllAsRead(book));
      },
      removeBook(book: SavedBook): void {
        dispatch(new BookRemove(book));
      },
      updateBooks(books: SavedBook[]) {
        for (const book of books) {
          dispatch(BookLoadChaptersAsync(book));
        }
      },
      setBookList(books: SavedBook[]) {
        dispatch(new BookSetSavedList(books));
      },
    };
  }, [dispatch]);
}
