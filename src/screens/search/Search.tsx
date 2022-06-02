import React, { useContext, useRef, useState } from 'react';
import { Container, HStack, Text } from '../../components';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext } from 'styled-components/native';
import { SearchBarInput, SearchBarWrapper } from './components';
import { Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Explore } from './explore/Explore';

export function Search() {
  const navigation = useNavigation<any>();
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
            numberOfLines={1}
            style={styles.searchBarInput}
            placeholderTextColor={theme.secondaryText}
            value={input}
            onChangeText={setInput}
            returnKeyType="search"
            ref={inputRef}
            autoFocus
            keyboardAppearance={theme.dark ? 'dark' : 'default'}
          />
        </SearchBarWrapper>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text variant="subtitle">取消</Text>
        </TouchableOpacity>
      </HStack>
      <ScrollView
        onScrollBeginDrag={() => {
          if (inputRef.current) {
            inputRef.current.blur();
          }
        }}>
        <Explore />
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  searchBarInput: {
    paddingBottom: Platform.select({
      default: 0,
      android: 8,
    }),
  },
});
