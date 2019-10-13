import React from 'react';
import { CardSubTitle, CardTitle, CardWrapper, CoverImg } from './components';
import { View } from 'react-native';
import { SavedBook } from '../../model/Book';
import { getLastOf } from '../../utils';
import { Chapter } from '../../model/Chapter';
import { HStack, SearchBar, Text, VStack } from '../../components';

interface IBookListProps {
  onNavigate(book: SavedBook): () => void;
  books: SavedBook[];
}

export function BookList(props: IBookListProps) {
  const { onNavigate, books } = props;

  return (
    <View>
      <SearchBar />
      {books.map(i => (
        <BookItem book={i} key={i.key} onPress={onNavigate(i)} />
      ))}
    </View>
  );
}

interface IBookItemProps {
  book: SavedBook;
  onPress(): void;
}
function BookItem(props: IBookItemProps) {
  const { book, onPress } = props;
  return (
    <CardWrapper onPress={onPress}>
      <CoverImg source={{ uri: book.coverImg }} />
      <VStack expand>
        <View>
          <CardTitle>{book.title}</CardTitle>
          <CardSubTitle style={{ marginTop: 4 }}>{book.author}</CardSubTitle>
        </View>
        <HStack expand>
          <HStack>
            <Text secondary>最新 </Text>
            <Text bold>{getLastOf<Chapter, string>(book.chapters, i => i.title, '无')}</Text>
          </HStack>
          <HStack>
            <Text color="pin">{1}章 </Text>
            <Text>未读</Text>
          </HStack>
        </HStack>
      </VStack>
    </CardWrapper>
  );
}
