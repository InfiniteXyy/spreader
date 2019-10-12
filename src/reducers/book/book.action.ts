import { Action, Dispatch } from 'redux';
import { Book, SavedBook } from '../../model/Book';
import { Chapter } from '../../model/Chapter';
import { getList } from '../../agents/spider';

export enum BookActionType {
  LOAD_CHAPTERS = '[Book] load chapters',
  UPDATE_CHAPTERS = '[Book] update chapters',
  MARK_READ = '[Book] mark read',
  ADD_BOOK = '[Book] add book',
  REMOVE_BOOK = '[Book] remove book',
  TOGGLE_BOOK_MENU_INDEX = '[Book] toggle book menu index',
  MARK_ALL_READ = '[Book] mark all read',
}

abstract class BaseBookAction {
  bookId: string;

  constructor(book: SavedBook) {
    this.bookId = book.id;
  }
}

export class BookLoadChapters extends BaseBookAction implements Action {
  readonly type = BookActionType.LOAD_CHAPTERS;
}

export class BookMarkAsRead extends BaseBookAction implements Action {
  readonly type = BookActionType.MARK_READ;

  constructor(book: SavedBook, public readonly chapter: Chapter) {
    super(book);
  }
}

export class BookMarkAllAsRead extends BaseBookAction implements Action {
  readonly type = BookActionType.MARK_ALL_READ;
}

export class BookRemove extends BaseBookAction implements Action {
  readonly type = BookActionType.REMOVE_BOOK;
}

export class BookChangeIndex extends BaseBookAction implements Action {
  readonly type = BookActionType.TOGGLE_BOOK_MENU_INDEX;
  constructor(book: SavedBook, public readonly index: number, public readonly reversed: boolean) {
    super(book);
  }
}

export class BookUpdateChapters extends BaseBookAction implements Action {
  readonly type = BookActionType.UPDATE_CHAPTERS;
  constructor(book: SavedBook, public readonly chapters: Chapter[]) {
    super(book);
  }
}

export class BookAdd implements Action {
  readonly type = BookActionType.ADD_BOOK;

  constructor(public readonly book: Book) {}
}

export function BookLoadChaptersAsync(book: SavedBook) {
  return async (dispatch: Dispatch) => {
    dispatch(new BookLoadChapters(book));
    const chapters = await getList(book.methods.getList);
    dispatch(new BookUpdateChapters(book, chapters));
    return Promise.resolve(chapters.length);
  };
}

export type BookAction =
  | BookLoadChapters
  | BookMarkAllAsRead
  | BookMarkAsRead
  | BookAdd
  | BookChangeIndex
  | BookRemove
  | BookUpdateChapters;
