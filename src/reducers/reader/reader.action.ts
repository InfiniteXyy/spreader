import { Action } from 'redux';
import { TitleAlign } from './reader.state';
import { ReaderTheme } from '../../model/Theme';

export enum ReaderActionType {
  UPDATE_FONT_SIZE = '[Reader] update font size',
  UPDATE_TITLE_SIZE = '[Reader] update title size',
  SET_TITLE_ALIGN = '[Reader] set title align',
  UPDATE_LINE_HEIGHT = '[Reader] update line height',
  UPDATE_PARA_SPACE = '[Reader] update paragraph spacing',
  UPDATE_SCREEN_PADDING = '[Reader] update screen padding',
  UPDATE_READER_THEME = '[Reader] set theme',
  RESET_STYLE = '[Reader] reset style',
}

export class ReaderSetFontSize implements Action {
  readonly type = ReaderActionType.UPDATE_FONT_SIZE;
  constructor(public readonly fontSize: number) {}
}
export class ReaderSetTitleSize implements Action {
  readonly type = ReaderActionType.UPDATE_TITLE_SIZE;
  constructor(public readonly titleSize: number) {}
}
export class ReaderSetTitleAlign implements Action {
  readonly type = ReaderActionType.SET_TITLE_ALIGN;
  constructor(public readonly titleAlign: TitleAlign) {}
}
export class ReaderSetLineHeight implements Action {
  readonly type = ReaderActionType.UPDATE_LINE_HEIGHT;
  constructor(public readonly lineHeightRatio: number) {}
}
export class ReaderSetParaSpacing implements Action {
  readonly type = ReaderActionType.UPDATE_PARA_SPACE;
  constructor(public readonly paraSpacing: number) {}
}
export class ReaderSetTheme implements Action {
  readonly type = ReaderActionType.UPDATE_READER_THEME;
  constructor(public readonly theme: ReaderTheme) {}
}
export class ReaderSetScreenPadding implements Action {
  readonly type = ReaderActionType.UPDATE_SCREEN_PADDING;
  constructor(public readonly screenPadding: number) {}
}
export class ReaderResetStyle implements Action {
  readonly type = ReaderActionType.RESET_STYLE;
}

export type ReaderAction =
  | ReaderSetFontSize
  | ReaderSetTitleSize
  | ReaderSetTitleAlign
  | ReaderSetLineHeight
  | ReaderSetParaSpacing
  | ReaderSetTheme
  | ReaderSetScreenPadding
  | ReaderResetStyle;
