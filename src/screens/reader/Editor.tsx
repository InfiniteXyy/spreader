import React, { useMemo } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { AlignOptionContainer, EditorSlider, ThemeOptionContainer } from './EditorItem';
import { Text } from '../../components';
import { ReaderTheme } from '../../model/Theme';
import {
  ReaderAction,
  ReaderSetFontSize,
  ReaderSetLineHeight,
  ReaderSetParaSpacing,
  ReaderSetTheme,
  ReaderSetTitleAlign,
  ReaderSetTitleSize,
} from '../../reducers/reader/reader.action';
import { TitleAlign } from '../../reducers/reader/reader.state';
import { useTrackedSelector } from '../../store';

interface IEditorProps {
  visible: boolean;
  onClose(): void;
}

export function Editor(props: IEditorProps) {
  const style = useTrackedSelector().readerReducer;
  const { readerTheme } = style;
  const actions = useActions();

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
      }}
    >
      <View style={{ backgroundColor: readerTheme.bgColor, width: 280 }}>
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <Text variant="title" bold style={{ marginBottom: 10, color: readerTheme.fontColor }}>
            阅读器样式
          </Text>
          <AlignOptionContainer value={style.titleAlign} onChange={actions.setTitleAlign} label="标题对齐" />
          <EditorSlider value={style.titleSize} onChange={actions.setTitleSize} range={[18, 30]} label="标题大小" />
          <EditorSlider value={style.fontSize} onChange={actions.setFontSize} range={[12, 24]} label="字体大小" />
          <EditorSlider
            value={style.lineHeightRatio}
            onChange={actions.setLineHeight}
            range={[1.1, 2.4]}
            label="行间距"
          />
          <EditorSlider value={style.paragraphSpace} onChange={actions.setParaSpace} range={[0, 1.5]} label="段间距" />
          <ThemeOptionContainer value={style.readerTheme} onChange={actions.setTheme} label="主题" />
        </View>
      </View>
    </Modal>
  );
}

function useActions() {
  const dispatch = useDispatch<Dispatch<ReaderAction>>();
  return useMemo(() => {
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
  }, [dispatch]);
}
