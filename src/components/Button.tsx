import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import { Text } from './Text';

interface IButtonProps extends TouchableOpacityProps {
  title: string;
}

const FlatButtonWrapper = styled.TouchableOpacity`
  border-radius: 4px;
  padding: 7px 6px;
  border: 0.5px solid ${props => props.theme.tintColor};
  background-color: ${props => props.theme.containerColor};
  margin-right: 10px;
  align-items: center;
  justify-content: center;
`;

const FlatButtonText = styled(Text)`
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 1px;
`;

export function Button(props: IButtonProps) {
  return (
    <FlatButtonWrapper onPress={props.onPress}>
      <FlatButtonText>{props.title}</FlatButtonText>
    </FlatButtonWrapper>
  );
}
