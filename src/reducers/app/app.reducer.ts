import { appInitialState, AppState } from './app.state';
import { AppAction, AppActionType } from './app.action';

export function appReducer(state = appInitialState, action: AppAction): AppState {
  switch (action.type) {
    case AppActionType.TOGGLE_FOLLOW_SYSTEM:
      return { ...state, modeFollowSystem: action.follow };
    case AppActionType.TOGGLE_MODE:
      return { ...state, dark: action.mode };
    default:
      return state;
  }
}
