import { readerInitialState, ReaderState } from './reader.state';
import { ReaderAction, ReaderActionType } from './reader.action';

export function readerReducer(state = readerInitialState, action: ReaderAction): ReaderState {
  switch (action.type) {
    case ReaderActionType.UPDATE_FONT_SIZE:
      return { ...state, fontSize: Math.round(action.fontSize) };
    case ReaderActionType.UPDATE_TITLE_SIZE:
      return { ...state, titleSize: Math.round(action.titleSize) };
    case ReaderActionType.SET_TITLE_ALIGN:
      return { ...state, titleAlign: action.titleAlign };
    case ReaderActionType.UPDATE_LINE_HEIGHT:
      return { ...state, lineHeightRatio: action.lineHeightRatio };
    case ReaderActionType.UPDATE_PARA_SPACE:
      return { ...state, paragraphSpace: action.paraSpacing };
    case ReaderActionType.UPDATE_READER_THEME:
      return { ...state, readerTheme: action.theme };
    case ReaderActionType.RESET_STYLE:
      return readerInitialState;
    default:
      return state;
  }
}
