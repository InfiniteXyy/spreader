import styled from 'styled-components/native';
import { HStack, Text } from '../../components';
import React from 'react';
import { Slider } from 'react-native';

export const ReaderScroll = styled.ScrollView`
  padding: 0 20px;
`;

export const EditorContainer = styled.SafeAreaView`
  width: 280px;
  background-color: #fafafa;
`;

export const EditorItemTitle = styled(Text).attrs({ bold: true })``;
export const EditorItemContainer = styled(HStack).attrs({ center: true, expand: true })`
  margin-top: 20px;
`;

interface IEditorSlider {
  range: [number, number];
  title: string;
  onChange(value: number): void;
  value: number;
}

export function EditorSlider(props: IEditorSlider) {
  const { range, title, onChange, value } = props;
  const [start, end] = range;
  return (
    <EditorItemContainer>
      <EditorItemTitle>{title}</EditorItemTitle>
      <Slider
        value={value}
        onSlidingComplete={onChange}
        style={{ width: 170 }}
        minimumValue={start}
        maximumValue={end}
        minimumTrackTintColor="#aaaaaa"
        maximumTrackTintColor="#dddddd"
      />
    </EditorItemContainer>
  );
}
