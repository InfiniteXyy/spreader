import { Book } from './Book';
import { Chapter } from './Chapter';

export interface BookFeed extends Book {
  uploader: string;
  lastUpdateChapter: ChapterFeed;
  chaptersCount: number;
  tags: BookTag[];
  source: BookSource;
}

interface BookSource {
  name: string;
  url: string;
}

interface ChapterFeed extends Chapter {
  updateAt: string;
}

interface BookTag {
  title: string;
}
