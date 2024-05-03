import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Icon from '@expo/vector-icons/Feather';
import { Container, HStack, SearchBar, Title } from '../../components';
import { SavedBook } from '../../model/Book';
import { SavedChapter } from '../../model/Chapter';
import { BookList } from './BookList';

export function Home() {
  const navigation = useNavigation<any>();
  const onNavigateBook = (book: SavedBook) => () => {
    navigation.navigate('chapters', { bookId: book.id });
  };

  const onNavigateSearch = () => {
    navigation.navigate('search');
  };

  const onNavigateSetting = () => {
    navigation.navigate('setting');
  };

  const onNavigateChapter = (book: SavedBook, chapter: SavedChapter) => () => {
    navigation.navigate('reader', { bookId: book.id, chapterHref: chapter.href });
  };

  return (
    <Container>
      <HStack expand center>
        <Title>首页</Title>
        <Icon onPress={onNavigateSetting} name="settings" style={{ padding: 20, fontSize: 16, color: '#9b9b9b' }} />
      </HStack>
      <SearchBar onPress={onNavigateSearch} />
      <BookList onNavigate={onNavigateBook} onNavigateSearch={onNavigateSearch} onNavigateChapter={onNavigateChapter} />
    </Container>
  );
}
