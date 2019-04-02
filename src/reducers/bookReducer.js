import { getList } from '../spiders/SpiderPlatform';

export const PAGE_LENGTH = 50;

const LOAD_CHAPTERS = 'LOAD_CHAPTERS';
const UPDATE_CHAPTERS = 'UPDATE_CHAPTERS';
const MARK_READ = 'MARK_READ';

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

export function currentBook(books, bookId) {
  for (let i of books) {
    if (i.id === bookId) {
      return i;
    }
  }
  return null;
}

const defaultState = {
  books: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
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
        if (action.payload.id === i.id) {
          return {
            ...i,
            isFetching: false,
            chapters: action.payload.chapters,
            updatedNum: action.payload.chapters.length - originLength
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
    default:
      return state;
  }
};
