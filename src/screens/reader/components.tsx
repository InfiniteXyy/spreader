import React, { useContext } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

import { ReaderThemeContext } from './index';
import { HStack, Text } from '../../components';

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

export const ReaderFooterContainer = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  border-top-width: 0.5px;
  padding: 20px 20px 0px 20px;
`;
