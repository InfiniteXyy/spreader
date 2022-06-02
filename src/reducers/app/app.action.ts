import { Action } from 'redux';

export enum AppActionType {
  TOGGLE_MODE = '[App] toggle dark mode',
  TOGGLE_FOLLOW_SYSTEM = '[App] toggle mode follow system',
}

export class AppToggleMode implements Action {
  readonly type = AppActionType.TOGGLE_MODE;
  constructor(public mode: boolean) {}
}

export class AppToggleModeFollowSystem implements Action {
  readonly type = AppActionType.TOGGLE_FOLLOW_SYSTEM;
  constructor(public follow: boolean) {}
}

export type AppAction = AppToggleMode | AppToggleModeFollowSystem;
