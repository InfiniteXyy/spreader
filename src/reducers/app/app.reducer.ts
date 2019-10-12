import { appInitialState, AppState } from './app.state';
import { AppAction, AppActionType } from './app.action';

export function appReducer(state = appInitialState, action: AppAction): AppState {
  switch (action.type) {
    case AppActionType.TOGGLE_MODE:
      return { ...state, dark: !state.dark };
    default:
      return state;
  }
}
