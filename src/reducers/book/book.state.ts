import { SavedBook } from '../../model/Book';

export interface BookState {
  books: SavedBook[];
}

export const bookInitialState: BookState = {
  books: [],
};
