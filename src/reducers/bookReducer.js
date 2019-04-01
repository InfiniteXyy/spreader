import { getList } from '../spiders/SpiderPlatform'

export const PAGE_LENGTH = 50;

const LOAD_BOOK = 'LOAD_BOOK';
const LOAD_CHAPTERS = 'LOAD_CHAPTERS';
const UPDATE_CHAPTERS = 'UPDATE_CHAPTERS';

function getBooks() {
  return new Promise((resolve, reject) => {
    const result = require('../../assets/data/books.json');
    resolve(result);
  });
}

export function loadBooks() {
  return async dispatch => {
    const result = await getBooks();
    dispatch({
      type: LOAD_BOOK,
      payload: result
    });
    for (let i of result) {
      dispatch(loadChapters(i));
    }
  };
}

export function loadChapters(book) {
  return async dispatch => {
    dispatch({
      type: LOAD_CHAPTERS,
      payload: book.id
    });
    console.log(book.id);
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
    case LOAD_BOOK:
      // 加载目录
      return { ...state, books: action.payload };

    case LOAD_CHAPTERS:
      // 开始加载章节
      let temp = state.books.map(i => {
        if (action.payload === i.id) {
          return { ...i, isFetching: true };
        }
        return i;
      });
      return { ...state, books: temp };

    case UPDATE_CHAPTERS:
      // 章节加载完成
      let books = state.books.map(i => {
        if (action.payload.id === i.id) {
          return {
            ...i,
            isFetching: false,
            chapters: action.payload.chapters
          };
        }
        return i;
      });
      return { ...state, books };
    default:
      return state;
  }
};
