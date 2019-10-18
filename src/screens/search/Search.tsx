import React, { useContext, useState } from 'react';
import { Container, Text } from '../../components';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext } from 'styled-components';
import { SearchBarInput, SearchBarWrapper } from './components';

export function Search() {
  const theme = useContext(ThemeContext);
  const [input, setInput] = useState('');

  return (
    <Container>
      <SearchBarWrapper>
        <Icon name="search" style={{ fontSize: 16, marginRight: 8, color: theme.tintColor }} />
        <SearchBarInput
          placeholder="搜索书名/作者/类型"
          value={input}
          onChangeText={setInput}
          returnKeyType="search"
          autoFocus
        />
      </SearchBarWrapper>
    </Container>
  );
}
