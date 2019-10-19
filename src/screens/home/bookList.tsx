import React, { useMemo } from 'react';
import { CardSubTitle, CardTitle, CardWrapper, CoverImg } from './components';
import { ScrollView, View } from 'react-native';
import { SavedBook } from '../../model/Book';
import { getLastOf } from '../../utils';
import { SavedChapter } from '../../model/Chapter';
import { HStack, Text, VStack } from '../../components';

interface IBookListProps {
  onNavigate(book: SavedBook): () => void;
  books: SavedBook[];
}

export function BookList(props: IBookListProps) {
  const { onNavigate, books } = props;

  return (
    <ScrollView>
      {books.map(i => (
        <BookItem book={i} key={i.key} onPress={onNavigate(i)} />
      ))}
    </ScrollView>
  );
}

interface IBookItemProps {
  book: SavedBook;
  onPress(): void;
}
function BookItem(props: IBookItemProps) {
  const { book, onPress } = props;

  const lastChapter = useMemo(() => {
    return getLastOf<SavedChapter, string>(book.chapters, i => i.title, '无');
  }, [book.chapters.length]);

  const unReadCount = useMemo(() => {
    return book.chapters.reduce((value, cur) => {
      return !cur.hasRead ? value + 1 : value;
    }, 0);
  }, [book.chapters.length, book.lastRead]);

  return (
    <CardWrapper onPress={onPress}>
      <CoverImg source={{ uri: book.coverImg }} />
      <VStack expand>
        <View>
          <CardTitle>{book.title}</CardTitle>
          <CardSubTitle>{book.author}</CardSubTitle>
        </View>
        <HStack expand>
          <HStack>
            <Text secondary>最新 </Text>
            <Text bold>{lastChapter}</Text>
          </HStack>
          {unReadCount !== 0 && (
            <HStack>
              <Text colorType="pin">{unReadCount}章 </Text>
              <Text>未读</Text>
            </HStack>
          )}
        </HStack>
      </VStack>
    </CardWrapper>
  );
}
