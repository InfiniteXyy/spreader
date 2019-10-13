import React from 'react';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { ReaderState, TitleAlign } from '../../reducers/reader/reader.state';
import { Dispatch } from 'redux';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';

import {
  ReaderAction,
  ReaderSetBgColor,
  ReaderSetFontColor,
  ReaderSetFontSize,
  ReaderSetLineHeight,
  ReaderSetParaSpacing,
  ReaderSetTitleAlign,
  ReaderSetTitleSize,
} from '../../reducers/reader/reader.action';
import { EditorContainer } from './components';

interface IStateProps {
  style: ReaderState;
}

interface IDispatchProps {
  setFontSize(size: number): void;
  setTitleSize(size: number): void;
  setLineHeight(height: number): void;
  setParaSpace(space: number): void;
  setTitleAlign(align: TitleAlign): void;
  setFontColor(color: string): void;
  setBgColor(color: string): void;
}

interface IEditorProps {
  visible: boolean;
  onClose(): void;
}

function _Editor(props: IStateProps & IDispatchProps & IEditorProps) {
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
        <Text>I am the modal content!</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
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
    setBgColor(color: string): void {
      dispatch(new ReaderSetBgColor(color));
    },
    setFontColor(color: string): void {
      dispatch(new ReaderSetFontColor(color));
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
