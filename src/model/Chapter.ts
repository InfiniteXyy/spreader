export interface SavedChapter extends Chapter {
  hasRead: boolean;
}

export interface Chapter {
  title: string;
  href: string;
}
