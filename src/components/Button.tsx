import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import { Text } from './Text';

interface IButtonProps extends TouchableOpacityProps {
  title: string;
}

const FlatButtonWrapper = styled.TouchableOpacity`
  border-radius: 4px;
  padding: 6px 10px;
  border: 0.5px solid ${props => props.theme.tintColor};
  background-color: ${props => props.theme.dividerColor};
  margin-right: 10px;
`;

export function Button(props: IButtonProps) {
  return (
    <FlatButtonWrapper onPress={props.onPress}>
      <Text variant="body" bold>
        {props.title}
      </Text>
    </FlatButtonWrapper>
  );
}
