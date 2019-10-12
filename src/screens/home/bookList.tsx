import React from 'react';
import { CardBody, CardSubTitle, CardTitle, CardWrapper, CoverImg } from './components';
import { View } from 'react-native';
import { SavedBook } from '../../model/Book';
import { getLastOf } from '../../utils';
import { Chapter } from '../../model/Chapter';

interface IBookListProps {
  onNavigate(book: SavedBook): () => void;
  books: SavedBook[];
}

export function BookList(props: IBookListProps) {
  const { onNavigate, books } = props;

  return (
    <>
      {books.map(i => (
        <BookItem book={i} key={i.key} onPress={onNavigate(i)} />
      ))}
    </>
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
      <View>
        <CardTitle>{book.title}</CardTitle>
        <CardSubTitle>{book.author}</CardSubTitle>
        <CardBody>最近更新：{getLastOf<Chapter, string>(book.chapters, i => i.title, '无')}</CardBody>
      </View>
    </CardWrapper>
  );
}
