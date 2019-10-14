import { SavedChapter } from './Chapter';

export interface Book {
  key: string;
  title: string;
  author: string;
  coverImg: string;
  methods: BookMethods;
}

export interface SavedBook extends Book {
  id: string;
  isFetching: boolean;
  chapters: SavedChapter[];
  currentPage: number;
  lastRead?: SavedChapter;
  reverse?: boolean;
}

export interface BookMethods {
  getList: GetListMethod;
  getContent: GetContentMethod;
}

export interface GetContentMethod {
  query: string;
}

export interface GetListMethod {
  url: string;
  query: string;
  href_prefix?: string;
  reverse?: boolean;
}
