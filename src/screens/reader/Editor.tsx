import React, { useContext, useMemo } from 'react';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { ReaderState, TitleAlign } from '../../reducers/reader/reader.state';
import { Dispatch } from 'redux';
import Modal from 'react-native-modal';
import { HStack, Text } from '../../components';
import Icon from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  ReaderAction,
  ReaderSetFontSize,
  ReaderSetLineHeight,
  ReaderSetParaSpacing,
  ReaderSetTheme,
  ReaderSetTitleAlign,
  ReaderSetTitleSize,
} from '../../reducers/reader/reader.action';
import { EditorContainer, EditorItemContainer, EditorItemTitle, EditorSlider } from './components';
import { View } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { DefaultReaderThemes, ReaderTheme } from '../../model/Theme';

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

type AlignOption = { iconName: string; type: TitleAlign };
const AlignOptions: AlignOption[] = [
  {
    type: 'flex-start',
    iconName: 'align-left',
  },
  {
    type: 'center',
    iconName: 'align-center',
  },
  {
    type: 'flex-end',
    iconName: 'align-right',
  },
];

function _Editor(props: IStateProps & IDispatchProps & IEditorProps) {
  const { style } = props;
  const theme = useContext(ThemeContext);
  const iconStyle = useMemo(
    () => (curAlign: TitleAlign) => ({
      fontSize: 18,
      color: curAlign === style.titleAlign ? theme.tintColor : theme.dividerColor,
      marginLeft: 20,
    }),
    [theme, style.titleAlign],
  );

  function AlignOptionContainer() {
    return (
      <EditorItemContainer>
        <EditorItemTitle>标题对齐</EditorItemTitle>
        <HStack center>
          {AlignOptions.map(i => (
            <Icon
              key={i.type}
              onPress={() => props.setTitleAlign(i.type)}
              style={iconStyle(i.type)}
              name={i.iconName}
            />
          ))}
        </HStack>
      </EditorItemContainer>
    );
  }

  function ThemeOptionContainer() {
    return (
      <EditorItemContainer>
        <EditorItemTitle>主题</EditorItemTitle>
        <HStack center>
          {DefaultReaderThemes.map(i => (
            <IconFontAwesome
              key={i.name}
              onPress={() => props.setTheme(i)}
              size={32}
              style={{ color: i.displayColor, marginLeft: 20 }}
              name="circle"
            />
          ))}
        </HStack>
      </EditorItemContainer>
    );
  }

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
      <EditorContainer>
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <Text variant="title" bold style={{ marginBottom: 10 }}>
            阅读器样式
          </Text>
          <AlignOptionContainer />
          <EditorSlider value={style.titleSize} onChange={props.setTitleSize} range={[18, 30]} title="标题大小" />
          <EditorSlider value={style.fontSize} onChange={props.setFontSize} range={[12, 24]} title="字体大小" />
          <EditorSlider
            value={style.lineHeightRatio}
            onChange={props.setLineHeight}
            range={[1.1, 2.4]}
            title="行间距"
          />
          <EditorSlider value={style.paragraphSpace} onChange={props.setParaSpace} range={[0, 1.5]} title="段间距" />
          <ThemeOptionContainer />
        </View>
      </EditorContainer>
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
