import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { BannerContainer, BannerImg, BannerSubtitle, BannerTitle } from './components';
import { Button, HStack, VStack, Text } from '../../components';
import { SavedBook } from '../../model/Book';
import { BookAction, BookMarkAllAsRead } from '../../reducers/book/book.action';
import { findNext } from '../../utils';

interface IBannerProps {
  book: SavedBook;
}

export function Banner(props: IBannerProps) {
  const { book } = props;
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Dispatch<BookAction>>();

  const markAllAsRead = (book: SavedBook) => {
    dispatch(new BookMarkAllAsRead(book));
  };

  const { nextChapter } = useMemo(() => {
    const { chapters, lastRead } = book;
    if (lastRead === undefined) {
      return { nextChapter: chapters[0] };
    } else {
      return { nextChapter: findNext(chapters, (i) => i.href === lastRead.href) };
    }
  }, [book]);

  const onReadNext = () => {
    if (nextChapter === undefined) {
      return;
    }
    navigation.navigate('reader', { bookId: book.id, chapterHref: nextChapter.href });
  };

  return (
    <BannerContainer>
      <HStack>
        <BannerImg source={{ uri: book.coverImg }} />
        <VStack expand style={{ height: 140 }}>
          <View>
            <BannerTitle>{book.title}</BannerTitle>
            <BannerSubtitle>{book.author}</BannerSubtitle>
          </View>
          {book.lastRead && (
            <View>
              <Text variant="tip" style={{ marginBottom: 4 }}>
                上次读到
              </Text>
              <Text variant="tip" colorType="pin" bold>
                {book.lastRead.title}
              </Text>
            </View>
          )}
        </VStack>
      </HStack>
      <HStack style={{ marginTop: 20, marginBottom: 10 }}>
        <Button title="继续阅读" onPress={onReadNext} />
        <Button title="全部已读" onPress={() => markAllAsRead(book)} />
      </HStack>
    </BannerContainer>
  );
}
