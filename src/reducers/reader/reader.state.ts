import { FlexAlignType } from 'react-native';

import { DefaultReaderThemes, ReaderTheme } from '../../model/Theme';

export type TitleAlign = FlexAlignType;

export interface ReaderState {
  fontSize: number;
  titleSize: number;
  titleAlign: TitleAlign;
  lineHeightRatio: number;
  paragraphSpace: number;
  readerTheme: ReaderTheme;
}

export const readerInitialState: ReaderState = {
  fontSize: 18,
  titleAlign: 'flex-start',
  titleSize: 22,
  lineHeightRatio: 1.8,
  paragraphSpace: 0.7,
  readerTheme: DefaultReaderThemes[0],
};
