import React, { createContext } from 'react';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { ReaderState, TitleAlign } from '../../reducers/reader/reader.state';
import { Dispatch } from 'redux';
import Modal from 'react-native-modal';
import { Container, Text } from '../../components';

import {
  ReaderAction,
  ReaderSetFontSize,
  ReaderSetLineHeight,
  ReaderSetParaSpacing,
  ReaderSetTheme,
  ReaderSetTitleAlign,
  ReaderSetTitleSize,
} from '../../reducers/reader/reader.action';
import { AlignOptionContainer, EditorSlider, ThemeOptionContainer } from './EditorItem';
import { View } from 'react-native';
import { DefaultReaderThemes, ReaderTheme } from '../../model/Theme';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface IStateProps {
  style: ReaderState;
}

interface IDispatchProps {
  setFontSize(size: number): void;
  setTitleSize(size: number): void;
  setLineHeight(height: number): void;
  setParaSpace(space: number): void;
  setTitleAlign(align: TitleAlign): void;
  setTheme(theme: ReaderTheme): void;
}

interface IEditorProps {
  visible: boolean;
  onClose(): void;
}

function _Editor(props: IStateProps & IDispatchProps & IEditorProps) {
  const {
    style,
    style: { readerTheme },
  } = props;

  return (
    <Modal
      isVisible={props.visible}
      backdropOpacity={0.24}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      onBackdropPress={props.onClose}
      style={{
        flex: 1,
        margin: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      <View style={{ backgroundColor: readerTheme.bgColor, width: 280, paddingTop: getStatusBarHeight(true) }}>
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <Text variant="title" bold style={{ marginBottom: 10, color: readerTheme.fontColor }}>
            阅读器样式
          </Text>
          <AlignOptionContainer value={style.titleAlign} onChange={props.setTitleAlign} label="标题对齐" />
          <EditorSlider value={style.titleSize} onChange={props.setTitleSize} range={[18, 30]} label="标题大小" />
          <EditorSlider value={style.fontSize} onChange={props.setFontSize} range={[12, 24]} label="字体大小" />
          <EditorSlider
            value={style.lineHeightRatio}
            onChange={props.setLineHeight}
            range={[1.1, 2.4]}
            label="行间距"
          />
          <EditorSlider value={style.paragraphSpace} onChange={props.setParaSpace} range={[0, 1.5]} label="段间距" />
          <ThemeOptionContainer value={style.readerTheme} onChange={props.setTheme} label="主题" />
        </View>
      </View>
    </Modal>
  );
}

function mapStateToProps(state: IState): IStateProps {
  return {
    style: state.readerReducer,
  };
}

function mapDispatchToProps(dispatch: Dispatch<ReaderAction>): IDispatchProps {
  return {
    setTheme(theme: ReaderTheme): void {
      dispatch(new ReaderSetTheme(theme));
    },
    setFontSize(size: number): void {
      dispatch(new ReaderSetFontSize(size));
    },
    setLineHeight(height: number): void {
      dispatch(new ReaderSetLineHeight(height));
    },
    setParaSpace(space: number): void {
      dispatch(new ReaderSetParaSpacing(space));
    },
    setTitleAlign(align: TitleAlign): void {
      dispatch(new ReaderSetTitleAlign(align));
    },
    setTitleSize(size: number): void {
      dispatch(new ReaderSetTitleSize(size));
    },
  };
}

export const Editor = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Editor);
