import { readerInitialState, ReaderState } from './reader.state';
import { ReaderAction, ReaderActionType } from './reader.action';

export function readerReducer(state = readerInitialState, action: ReaderAction): ReaderState {
  switch (action.type) {
    case ReaderActionType.UPDATE_FONT_SIZE:
      return { ...state, fontSize: action.fontSize };
    case ReaderActionType.UPDATE_TITLE_SIZE:
      return { ...state, titleSize: action.titleSize };
    case ReaderActionType.SET_TITLE_ALIGN:
      return { ...state, titleAlign: action.titleAlign };
    case ReaderActionType.UPDATE_LINE_HEIGHT:
      return { ...state, lineHeight: action.lineHeight };
    case ReaderActionType.UPDATE_PARA_SPACE:
      return { ...state, paragraphSpace: action.paraSpacing };
    case ReaderActionType.UPDATE_FONT_COLOR:
      return { ...state, fontColor: action.fontColor };
    case ReaderActionType.UPDATE_BG_COLOR:
      return { ...state, bgColor: action.bgColor };
    default:
      return state;
  }
}
