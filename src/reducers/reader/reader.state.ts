import { FlexAlignType } from 'react-native';

export type TitleAlign = FlexAlignType;

export interface ReaderState {
  fontSize: number;
  titleSize: number;

  titleAlign: TitleAlign;
  lineHeight: number;

  paragraphSpace: number;

  fontColor: string;
  bgColor: string;
}

export const readerInitialState: ReaderState = {
  bgColor: '#FFF',
  fontColor: '#4a4a4a',
  fontSize: 18,
  lineHeight: 34,
  paragraphSpace: 12,
  titleAlign: 'flex-start',
  titleSize: 22,
};
