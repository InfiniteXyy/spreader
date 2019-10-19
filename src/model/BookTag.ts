import { BookFeed } from './Feed';

export interface BookTag {
  id: number;
  title: string;
  feedsCount: number;
  feed?: BookFeed[];
  coverImg?: string;
}
