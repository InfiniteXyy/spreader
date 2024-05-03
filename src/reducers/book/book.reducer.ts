import _ from 'lodash';

import { BookAction, BookActionType } from './book.action';
import { bookInitialState, BookState } from './book.state';
import { SavedBook } from '../../model/Book';

export function bookReducer(state = bookInitialState, action: BookAction): BookState {
  switch (action.type) {
    case BookActionType.SET_SAVED_BOOK_LIST:
      return {
        ...state,
        books: action.books,
      };
    case BookActionType.ADD_BOOK: {
      const savedBook: SavedBook = {
        ...action.book,
        chapters: [],
        isFetching: false,
        currentPage: 0,
      };
      return {
        ...state,
        books: [...state.books, savedBook],
      };
    }

    case BookActionType.REMOVE_BOOK: {
      return {
        ...state,
        books: state.books.filter((i) => i.id !== action.bookId),
      };
    }

    case BookActionType.LOAD_CHAPTERS: {
      return {
        ...state,
        books: state.books.map((i) => (action.bookId === i.id ? { ...i, isFetching: true } : i)),
      };
    }

    case BookActionType.UPDATE_CHAPTERS: {
      const books = state.books.map((i) =>
        action.bookId === i.id
          ? {
              ...i,
              isFetching: false,
              chapters: _.merge(action.chapters, i.chapters),
            }
          : i,
      );
      return { ...state, books };
    }

    // 上次阅读
    case BookActionType.MARK_READ: {
      return {
        ...state,
        books: state.books.map((i) => {
          if (action.bookId === i.id) {
            return {
              ...i,
              lastRead: { ...action.chapter },
              chapters: i.chapters.map((chapter) => {
                if (chapter.href === action.chapter.href) {
                  return { ...chapter, hasRead: true };
                }
                return chapter;
              }),
            };
          }
          return i;
        }),
      };
    }

    // 设置上次阅读到的页面
    case BookActionType.TOGGLE_BOOK_MENU_INDEX: {
      return {
        ...state,
        books: state.books.map((book) => {
          if (book.id !== action.bookId) {
            return book;
          }
          return { ...book, currentPage: action.index, reverse: action.reversed };
        }),
      };
    }

    // 设置全部阅读
    case BookActionType.MARK_ALL_READ: {
      return {
        ...state,
        books: state.books.map((book) => {
          if (book.id !== action.bookId) {
            return book;
          }
          return {
            ...book,
            chapters: book.chapters.map((chapter) => ({
              ...chapter,
              hasRead: true,
            })),
            lastRead: book.chapters[book.chapters.length - 1],
          };
        }),
      };
    }

    default:
      return state;
  }
}
