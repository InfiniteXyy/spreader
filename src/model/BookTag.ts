import { BookFeed } from './Feed';

export interface BookTag {
  id: string;
  title: string;
  feedsCount: number;
  feed?: BookFeed[];
  coverImg?: string;
}
