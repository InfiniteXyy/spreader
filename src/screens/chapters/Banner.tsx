import React from 'react';
import { SavedBook } from '../../model/Book';
import { BannerContainer, BannerImg, BannerSubtitle, BannerTitle } from './components';
import { View } from 'react-native';
import { Button, HStack, VStack, Text } from '../../components';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BookAction, BookMarkAllAsRead } from '../../reducers/book/book.action';
import { IState } from '../../reducers';
import { SavedChapter } from '../../model/Chapter';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

interface IBannerProps {
  book: SavedBook;
}

interface IStateProps {
  nextChapter?: SavedChapter;
}

interface IDispatchProps {
  markAllAsRead(book: SavedBook): void;
}

function _Banner(props: IBannerProps & IDispatchProps & IStateProps & NavigationInjectedProps) {
  const { book, markAllAsRead, nextChapter } = props;

  const onReadNext = () => {
    if (nextChapter === undefined) return;
    props.navigation.navigate({ routeName: 'reader', params: { bookId: book.id, chapterHref: nextChapter.href } });
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
    const chapterIndex = chapters.findIndex(i => i.href === lastRead.href);
    return {
      nextChapter: chapterIndex + 1 < chapters.length ? chapters[chapterIndex + 1] : undefined,
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
export const Banner = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(_Banner));
