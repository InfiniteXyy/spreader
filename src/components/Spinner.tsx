import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ThemeContext } from 'styled-components/native';

interface ISpinnerProps {
  loading: boolean;
}

export function Spinner(props: ISpinnerProps) {
  const theme = useContext(ThemeContext);
  return <View>{props.loading && <ActivityIndicator size="small" color={theme?.tintColor} />}</View>;
}
