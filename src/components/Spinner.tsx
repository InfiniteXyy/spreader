import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { ActivityIndicator, View } from 'react-native';

interface ISpinnerProps {
  loading: boolean;
}

export function Spinner(props: ISpinnerProps) {
  const theme = useContext(ThemeContext);
  return <View>{props.loading && <ActivityIndicator size="small" color={theme?.tintColor} />}</View>;
}
