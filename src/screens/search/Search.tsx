import React, { useContext, useRef, useState } from 'react';
import { Container, HStack, Text } from '../../components';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext } from 'styled-components';
import { SearchBarInput, SearchBarWrapper } from './components';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Explore } from './explore/Explore';

function _Search(props: NavigationInjectedProps) {
  const theme = useContext(ThemeContext);
  const [input, setInput] = useState('');
  const inputRef = useRef<TextInput | null>(null);
  return (
    <Container>
      <HStack center style={{ marginHorizontal: 20 }}>
        <SearchBarWrapper>
          <Icon name="search" style={{ fontSize: 16, marginRight: 8, color: theme.tintColor }} />
          <SearchBarInput
            placeholder="搜索书名/作者/类型"
            placeholderTextColor={theme.secondaryText}
            value={input}
            onChangeText={setInput}
            returnKeyType="search"
            ref={inputRef}
            autoFocus
            keyboardAppearance={theme.dark ? 'dark' : 'default'}
          />
        </SearchBarWrapper>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Text variant="subtitle">取消</Text>
        </TouchableOpacity>
      </HStack>
      <ScrollView
        onScrollBeginDrag={() => {
          if (inputRef.current) inputRef.current.blur();
        }}>
        <Explore />
      </ScrollView>
    </Container>
  );
}

export const Search = withNavigation(_Search);
