import React from 'react';
import { Book, SavedBook } from '../../model/Book';
import { BookItem } from './BookItem';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { IState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import {
  BookAction,
  BookLoadChaptersAsync,
  BookMarkAllAsRead,
  BookRemove,
  BookSetSavedList,
} from '../../reducers/book/book.action';
import { connect } from 'react-redux';
import BookListEmptyView from './BookListEmptyView';
import { SavedChapter } from '../../model/Chapter';
import { findNext } from '../../utils';

interface IBookListProps {
  onNavigate(book: SavedBook): () => void;
  onNavigateSearch(): void;
  onNavigateChapter(book: SavedBook, chapter: SavedChapter): () => void;
}

interface IStateProps {
  books: SavedBook[];
}

interface IDispatchProps {
  updateBooks(books: Book[]): void;
  setBookList(books: readonly SavedBook[]): void;
  removeBook(book: SavedBook): void;
  markAllRead(book: SavedBook): void;
}

function _BookList(props: IBookListProps & IStateProps & IDispatchProps) {
  const { onNavigate, books, updateBooks, setBookList, onNavigateSearch } = props;

  return (
    <DraggableFlatList
      data={books}
      refreshing={false}
      ListEmptyComponent={<BookListEmptyView onPress={onNavigateSearch} />}
      onRefresh={() => updateBooks(books)}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item, index, move, moveEnd, isActive }) => {
        let nextChapter = item.chapters[0];
        if (item.lastRead !== undefined) {
          const href = item.lastRead.href;
          nextChapter = findNext(item.chapters, i => href === i.href);
        }
        const menuActions = {
          markAllRead: () => props.markAllRead(item),
          continueRead: props.onNavigateChapter(item, nextChapter),
          deleteBook: () => props.removeBook(item),
        };
        return (
          <BookItem
            book={item}
            onPress={onNavigate(item)}
            onLongPress={move}
            onPressOut={moveEnd}
            menuActions={menuActions}
          />
        );
      }}
      onMoveEnd={({ data }) => {
        if (data !== null) setBookList(data);
      }}
    />
  );
}

function mapStateToProps(state: IState): IStateProps {
  return {
    books: state.bookReducer.books,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, null, BookAction>): IDispatchProps {
  return {
    markAllRead(book: SavedBook): void {
      dispatch(new BookMarkAllAsRead(book));
    },
    removeBook(book: SavedBook): void {
      dispatch(new BookRemove(book));
    },
    updateBooks(books: SavedBook[]) {
      for (let book of books) {
        dispatch(BookLoadChaptersAsync(book));
      }
    },
    setBookList(books: readonly SavedBook[]) {
      dispatch(new BookSetSavedList(books));
    },
  };
}

export const BookList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_BookList);
