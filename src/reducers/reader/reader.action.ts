import { Action } from 'redux';
import { TitleAlign } from './reader.state';
import { ReaderTheme } from '../../model/Theme';

export enum ReaderActionType {
  UPDATE_FONT_SIZE = '[Reader] update font size',
  UPDATE_TITLE_SIZE = '[Reader] update title size',
  SET_TITLE_ALIGN = '[Reader] set title align',
  UPDATE_LINE_HEIGHT = '[Reader] update line height',
  UPDATE_PARA_SPACE = '[Reader] update paragraph spacing',
  UPDATE_READER_THEME = '[Reader] set theme',
  RESET_STYLE = '[Reader] reset style',
}

export class ReaderSetFontSize implements Action {
  readonly type = ReaderActionType.UPDATE_FONT_SIZE;
  constructor(public fontSize: number) {}
}
export class ReaderSetTitleSize implements Action {
  readonly type = ReaderActionType.UPDATE_TITLE_SIZE;
  constructor(public titleSize: number) {}
}
export class ReaderSetTitleAlign implements Action {
  readonly type = ReaderActionType.SET_TITLE_ALIGN;
  constructor(public titleAlign: TitleAlign) {}
}
export class ReaderSetLineHeight implements Action {
  readonly type = ReaderActionType.UPDATE_LINE_HEIGHT;
  constructor(public lineHeightRatio: number) {}
}
export class ReaderSetParaSpacing implements Action {
  readonly type = ReaderActionType.UPDATE_PARA_SPACE;
  constructor(public paraSpacing: number) {}
}
export class ReaderSetTheme implements Action {
  readonly type = ReaderActionType.UPDATE_READER_THEME;
  constructor(public theme: ReaderTheme) {}
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
  | ReaderResetStyle;
