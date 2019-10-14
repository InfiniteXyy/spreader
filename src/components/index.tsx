import styled from 'styled-components/native';

// common
export const Title = styled.Text`
  font-size: 36px;
  font-weight: 500;
  color: ${props => props.theme.primaryText};
  margin: 25px 25px 20px 20px;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.bgColor};
`;

export const StatusBar = styled.StatusBar.attrs(props => ({
  barStyle: props.theme.dark ? 'light-content' : 'dark-content',
  backgroundColor: props.theme.bgColor,
}))``;

export const HStack = styled.View<{ expand?: boolean; center?: boolean }>`
  flex-direction: row;
  align-items: ${props => (props.center ? 'center' : 'flex-start')};
  justify-content: ${props => (props.expand ? 'space-between' : 'flex-start')};
`;

export const VStack = styled.View<{ expand?: boolean }>`
  flex: 1;
  justify-content: ${props => (props.expand ? 'space-between' : 'flex-start')};
`;

export const Divider = styled.View`
  height: 0.5px;
  background-color: ${props => props.theme.dividerColor};
`;

export const Ellipse = styled.View<{ size: number }>`
  border-radius: ${props => props.size};
  width: ${props => props.size};
  height: ${props => props.size};
  background-color: black;
`;

export { BottomBar } from './BottomBar';
export { Text } from './Text';
export { Header } from './Header';
export { Button } from './Button';
export { SearchBar } from './SearchBar';
export { Spinner } from './Spinner';
