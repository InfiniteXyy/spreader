import React from 'react';
import { Book, SavedBook } from '../../model/Book';
import { BookItem } from './BookItem';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { IState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { BookAction, BookLoadChaptersAsync, BookSetSavedList } from '../../reducers/book/book.action';
import { connect } from 'react-redux';
import { Vibration } from 'react-native';
import BookListEmptyView from './BookListEmptyView';

interface IBookListProps {
  onNavigate(book: SavedBook): () => void;
  onNavigateSearch(): void;
}

interface IStateProps {
  books: SavedBook[];
}

interface IDispatchProps {
  updateBooks(books: Book[]): void;
  setBookList(books: readonly SavedBook[]): void;
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
      renderItem={({ item, index, move, moveEnd, isActive }) => (
        <BookItem book={item} onPress={onNavigate(item)} onLongPress={move} onPressOut={moveEnd} />
      )}
      onMoveEnd={({ data }) => {
        if (data !== null) setBookList(data);
      }}
      onMoveBegin={() => Vibration.vibrate(400)}
    />
  );
}

function mapStateToProps(state: IState): IStateProps {
  return {
    books: state.bookReducer.books,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, null, BookAction>) {
  return {
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
