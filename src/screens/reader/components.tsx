import styled from 'styled-components/native';
import { HStack, Text } from '../../components';
import React, { useContext } from 'react';
import { ReaderThemeContext } from './index';
import { Animated } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

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

export const ReaderFooterContainer = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  border-top-width: 0.5px;
  padding: 20px 20px ${getBottomSpace() + 20}px 20px;
`;
