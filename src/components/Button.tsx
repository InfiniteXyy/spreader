import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import { Text } from './Text';

interface IButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'simple' | 'primary';
}

const SimpleButtonWrapper = styled.TouchableOpacity`
  border-radius: 4px;
  padding: 7px 6px;
  border: 0.5px solid ${props => props.theme.tintColor};
  background-color: ${props => props.theme.containerColor};
  margin-right: 10px;
  align-items: center;
  justify-content: center;
`;

const SimpleButtonText = styled(Text)`
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 1px;
`;

const PrimaryButtonWrapper = styled.TouchableOpacity`
  border-radius: 8px;
  padding: 10px 20px;
  background-color: ${props => props.theme.primaryColor};
  margin-right: 10px;
  align-items: center;
  justify-content: center;
`;

const PrimaryButtonText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: white;
`;

export function Button(props: IButtonProps) {
  if (props.variant === 'primary')
    return (
      <PrimaryButtonWrapper onPress={props.onPress}>
        <PrimaryButtonText>{props.title}</PrimaryButtonText>
      </PrimaryButtonWrapper>
    );
  else {
    return (
      <SimpleButtonWrapper onPress={props.onPress}>
        <SimpleButtonText>{props.title}</SimpleButtonText>
      </SimpleButtonWrapper>
    );
  }
}
