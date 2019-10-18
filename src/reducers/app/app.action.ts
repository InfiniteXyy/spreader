import { Action } from 'redux';

export enum AppActionType {
  TOGGLE_MODE = '[App] toggle dark mode',
}

export class AppToggleMode implements Action {
  readonly type = AppActionType.TOGGLE_MODE;
  constructor(public readonly mode: boolean) {}
}

export type AppAction = AppToggleMode;
