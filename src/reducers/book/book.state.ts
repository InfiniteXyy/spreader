import { SavedBook } from '../../model/Book';

export interface BookState {
  books: readonly SavedBook[];
}

export const bookInitialState: BookState = {
  books: [],
};
