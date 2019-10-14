import styled from 'styled-components/native';
import { HStack, Text } from '../../components';
import React, { useContext } from 'react';
import { ReaderThemeContext } from './Editor';

export const ReaderScroll = styled.ScrollView`
  padding: 0 20px;
`;

export const EditorItemContainer = styled(HStack).attrs({ center: true, expand: true })`
  height: 65px;
`;

export function EditorItemTitle(props: { children: string }) {
  const color = useContext(ReaderThemeContext).titleColor;
  return (
    <Text bold style={{ color }}>
      {props.children}
    </Text>
  );
}
