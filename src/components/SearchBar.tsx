import React, { useContext } from 'react';
import { Text } from './Text';
import styled, { ThemeContext } from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableWithoutFeedback } from 'react-native';

interface ISearchBarProps {
  onPress?(): void;
}

const SearchBarWrapper = styled.View`
  background-color: rgba(227, 227, 227, 0.28);
  flex-direction: row;
  align-items: center;
  padding: 0 8px;
  height: 36px;
  margin: 0 20px 16px 20px;
  border-radius: 10px;
`;

export function SearchBar(props: ISearchBarProps) {
  const theme = useContext(ThemeContext);
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <SearchBarWrapper>
        <Icon name="search" style={{ fontSize: 16, marginRight: 8, color: theme.tintColor }} />
        <Text secondary variant="subtitle">
          搜索书名/作者/类型
        </Text>
      </SearchBarWrapper>
    </TouchableWithoutFeedback>
  );
}
