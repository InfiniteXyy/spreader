import { hubInitialState, HubState } from './hub.state';
import { HubAction, HubActionType } from './hub.action';

export function hubReducer(state = hubInitialState, action: HubAction): HubState {
  switch (action.type) {
    case HubActionType.UPDATE_TRENDING_LIST:
      return {
        ...state,
        trendingList: {
          isLoading: false,
          data: action.list,
        },
      };
    case HubActionType.UPDATE_TAG_LIST:
      return {
        ...state,
        tagList: {
          isLoading: false,
          data: action.list,
        },
      };
    case HubActionType.LOAD_TRENDING:
      return {
        ...state,
        trendingList: {
          ...state.trendingList,
          isLoading: true,
        },
      };
    case HubActionType.LOAD_TAG:
      return {
        ...state,
        tagList: {
          ...state.tagList,
          isLoading: true,
        },
      };
    default:
      return hubInitialState;
  }
}
