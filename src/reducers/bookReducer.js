import { getList } from '../spiders/SpiderPlatform';

export const PAGE_LENGTH = 50;

const LOAD_CHAPTERS = 'LOAD_CHAPTERS';
const UPDATE_CHAPTERS = 'UPDATE_CHAPTERS';
const MARK_READ = 'MARK_READ';
const ADD_BOOK = 'ADD_BOOK';
const REMOVE_BOOK = 'REMOVE_BOOK';
const TOGGLE_BOOK_MENU_INDEX = 'TOGGLE_BOOK_MENU_INDEX';

export function loadChapters(book) {
  return async dispatch => {
    dispatch({
      type: LOAD_CHAPTERS,
      payload: book.id
    });
    const chapters = await getList(book.methods.getList);

    dispatch({
      type: UPDATE_CHAPTERS,
      payload: {
        chapters,
        id: book.id
      }
    });
  };
}

export function markAsRead(book, chapter) {
  return {
    type: MARK_READ,
    bookId: book.id,
    chapter
  };
}

export function addBook(spider, sourceHref) {
  return dispatch => {
    let book = { ...spider, id: sourceHref + '/' + spider.key };
    dispatch({
      type: ADD_BOOK,
      book
    });
    dispatch(loadChapters(book));
  };
}

export function removeBook(bookId) {
  return {
    type: REMOVE_BOOK,
    bookId: bookId
  };
}

export function togglePage(bookId, reverse, page) {
  return {
    type: TOGGLE_BOOK_MENU_INDEX,
    reverse,
    page,
    bookId
  };
}

const defaultState = {
  books: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.book]
      };
    case REMOVE_BOOK:
      return {
        ...state,
        books: state.books.filter(i => i.id !== action.bookId)
      };
    case LOAD_CHAPTERS:
      // 开始加载章节
      return {
        ...state,
        books: state.books.map(i => {
          if (action.payload === i.id) {
            return { ...i, isFetching: true };
          }
          return i;
        })
      };

    case UPDATE_CHAPTERS:
      // 章节加载完成
      let books = state.books.map(i => {
        let originLength = i.chapters ? i.chapters.length : 0;
        let chapters = action.payload.chapters.map((i, index) => {
          if (index >= originLength) {
            return { ...i, isNew: true };
          }
          return i;
        });
        if (action.payload.id === i.id) {
          return {
            ...i,
            isFetching: false,
            chapters: chapters
          };
        }
        return i;
      });
      return { ...state, books };
    case MARK_READ:
      // 上次阅读
      return {
        ...state,
        books: state.books.map(i => {
          if (action.bookId === i.id) {
            return {
              ...i,
              lastRead: { ...action.chapter }
            };
          }
          return i;
        })
      };
    case TOGGLE_BOOK_MENU_INDEX:
      // 设置上次阅读到的页面
      return {
        ...state,
        books: state.books.map(book => {
          if (book.id !== action.bookId) {
            return book;
          }
          return { ...book, page: action.page, reverse: action.reverse };
        })
      };
    default:
      return state;
  }
};
