import { Action, Dispatch } from 'redux';
import { BookFeed } from '../../model/Feed';
import { BookTag } from '../../model/BookTag';
import agent from '../../agents';

export enum HubActionType {
  UPDATE_TRENDING_LIST = '[hub] update trending list',
  UPDATE_TAG_LIST = '[hub] update tag list',
  LOAD_TRENDING = '[hub] load trending',
  LOAD_TAG = '[hub] load tag',
}

export class HubUpdateTrendingList implements Action {
  readonly type = HubActionType.UPDATE_TRENDING_LIST;
  constructor(public list: BookFeed[]) {}
}

export class HubUpdateTagList implements Action {
  readonly type = HubActionType.UPDATE_TAG_LIST;
  constructor(public list: BookTag[]) {}
}

export class HubLoadTrending implements Action {
  readonly type = HubActionType.LOAD_TRENDING;
}

export class HubLoadTag implements Action {
  readonly type = HubActionType.LOAD_TAG;
}

export function HubLoadTrendingAsync() {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(new HubLoadTrending());
    const trendingList = await agent.feed.getTrending();
    dispatch(new HubUpdateTrendingList(trendingList));
  };
}

export function HubLoadTagsAsync() {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(new HubLoadTag());
    const tagList = await agent.tag.getList();
    dispatch(new HubUpdateTagList(tagList));
  };
}

export type HubAction = HubUpdateTrendingList | HubUpdateTagList | HubLoadTrending | HubLoadTag;
