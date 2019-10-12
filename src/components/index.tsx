import styled from 'styled-components/native';

// common
export const Title = styled.Text`
  font-size: 36px;
  font-weight: 500;
  color: ${props => props.theme.primaryText};
  margin: 25px 25px 20px 25px;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.bgColor};
`;

export const StatusBar = styled.StatusBar.attrs(props => ({
  barStyle: props.theme.dark ? 'light-content' : 'dark-content',
  backgroundColor: props.theme.bgColor,
}))``;

export const HStack = styled.View<{ expand?: boolean }>`
  flex-direction: row;
  justify-content: ${props => (props.expand ? 'space-between' : 'flex-start')};
`;

export const Dot = styled.View`
  height: 4px;
  width: 4px;
  background-color: ${props => props.theme.primaryColor};
  border-radius: 4px;
`;

export { BottomBar } from './BottomBar';
export { Text } from './Text';
export { Header } from './Header';
export { Button } from './Button';
