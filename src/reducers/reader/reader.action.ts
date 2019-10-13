import { Action } from 'redux';
import { TitleAlign } from './reader.state';

export enum ReaderActionType {
  UPDATE_FONT_SIZE = '[Reader] update font size',
  UPDATE_TITLE_SIZE = '[Reader] update title size',
  SET_TITLE_ALIGN = '[Reader] set title align',
  UPDATE_LINE_HEIGHT = '[Reader] update line height',
  UPDATE_PARA_SPACE = '[Reader] update paragraph spacing',
  UPDATE_FONT_COLOR = '[Reader] update font color',
  UPDATE_BG_COLOR = '[Reader] update bgcolor',
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
  constructor(public readonly lineHeight: number) {}
}
export class ReaderSetParaSpacing implements Action {
  readonly type = ReaderActionType.UPDATE_PARA_SPACE;
  constructor(public readonly paraSpacing: number) {}
}
export class ReaderSetFontColor implements Action {
  readonly type = ReaderActionType.UPDATE_FONT_COLOR;
  constructor(public readonly fontColor: string) {}
}
export class ReaderSetBgColor implements Action {
  readonly type = ReaderActionType.UPDATE_BG_COLOR;
  constructor(public readonly bgColor: string) {}
}

export type ReaderAction =
  | ReaderSetFontSize
  | ReaderSetTitleSize
  | ReaderSetTitleAlign
  | ReaderSetLineHeight
  | ReaderSetParaSpacing
  | ReaderSetFontColor
  | ReaderSetBgColor;
