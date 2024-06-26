import { BookTag } from '../../model/BookTag';
import { BookFeed } from '../../model/Feed';

export interface HubState {
  trendingList: {
    isLoading: boolean;
    data: BookFeed[];
  };
  tagList: {
    isLoading: boolean;
    data: BookTag[];
  };
}

export const hubInitialState: HubState = {
  tagList: { data: [], isLoading: false },
  trendingList: { data: [], isLoading: false },
};
