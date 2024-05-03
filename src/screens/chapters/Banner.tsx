import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { BannerContainer, BannerImg, BannerSubtitle, BannerTitle } from './components';
import { Button, HStack, VStack, Text } from '../../components';
import { SavedBook } from '../../model/Book';
import { SavedChapter } from '../../model/Chapter';
import { IState } from '../../reducers';
import { BookAction, BookMarkAllAsRead } from '../../reducers/book/book.action';
import { findNext } from '../../utils';

interface IBannerProps {
  book: SavedBook;
}

interface IStateProps {
  nextChapter?: SavedChapter;
}

interface IDispatchProps {
  markAllAsRead(book: SavedBook): void;
}

function _Banner(props: IBannerProps & IDispatchProps & IStateProps) {
  const { book, markAllAsRead, nextChapter } = props;
  const navigation = useNavigation<any>();

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

function mapStateToProps(state: IState, props: IBannerProps): IStateProps {
  const { book } = props;
  const { chapters, lastRead } = book;
  if (lastRead === undefined) {
    return {
      nextChapter: chapters[0],
    };
  } else {
    return {
      nextChapter: findNext(chapters, (i) => i.href === lastRead.href),
    };
  }
}

function mapDispatchToProps(dispatch: Dispatch<BookAction>): IDispatchProps {
  return {
    markAllAsRead(book: SavedBook) {
      dispatch(new BookMarkAllAsRead(book));
    },
  };
}
export const Banner = connect(mapStateToProps, mapDispatchToProps)(_Banner);
