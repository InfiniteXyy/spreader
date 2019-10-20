import React, { useState } from 'react';
import { SavedChapter } from '../../model/Chapter';
import {
  FlatList,
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollViewProps,
} from 'react-native';
import { HStack, Text } from '../../components';
import { SavedBook } from '../../model/Book';
import { Banner } from './Banner';
import { createPageItems } from '../../utils';
import { ChapterPicker } from './ChapterPicker';
import { Dispatch } from 'redux';
import { BookAction, BookChangeIndex } from '../../reducers/book/book.action';
import { connect } from 'react-redux';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { ChapterListItemContainer, ChapterListItemDot } from './components';
import { Loader } from 'rn-placeholder';

interface IChapterListProps {
  book: SavedBook;
  onLoad(): void;
  onScroll(event: NativeSyntheticEvent<NativeScrollEvent>): void;
}

interface IDispatchProps {
  onChangePage(book: SavedBook, index: number, reversed: boolean): void;
}

interface IChapterItemProps {
  chapter: SavedChapter;
  onPress(): void;
}

const dummyChapter: SavedChapter = {
  hasRead: false,
  href: 'dummy',
  title: '',
};

function _ChapterList(props: IChapterListProps & IDispatchProps & NavigationInjectedProps) {
  const { book, onChangePage } = props;
  const visibleChapters = createPageItems<SavedChapter>(book.chapters, book.currentPage, !!book.reverse, dummyChapter);
  const onNavigateChapter = (chapter: SavedChapter) => {
    props.navigation.navigate({ routeName: 'reader', params: { bookId: book.id, chapterHref: chapter.href } });
  };

  return (
    <FlatList
      onScroll={props.onScroll}
      scrollEventThrottle={64}
      stickyHeaderIndices={[1]}
      removeClippedSubviews={!(Platform.OS === 'android')} // fix android crash issue
      ListEmptyComponent={<Loader style={{ paddingTop: 100 }} />}
      ListHeaderComponent={<Banner book={book} />}
      onRefresh={props.onLoad}
      refreshing={false}
      data={visibleChapters}
      keyExtractor={item => item.href}
      renderItem={i => {
        if (i.item.href === 'dummy') {
          return <ChapterPicker book={book} onChangePage={onChangePage} />;
        } else {
          return <ChapterItem chapter={i.item} onPress={() => onNavigateChapter(i.item)} />;
        }
      }}
    />
  );
}

function ChapterItem(props: IChapterItemProps) {
  const { chapter, onPress } = props;
  return (
    <ChapterListItemContainer onPress={onPress}>
      {chapter.hasRead || <ChapterListItemDot />}
      <HStack>
        <Text numberOfLines={1}>{chapter.title}</Text>
      </HStack>
    </ChapterListItemContainer>
  );
}

function mapDispatchToProps(dispatch: Dispatch<BookAction>): IDispatchProps {
  return {
    onChangePage(book: SavedBook, index: number, reversed: boolean): void {
      dispatch(new BookChangeIndex(book, index, reversed));
    },
  };
}

export const ChapterList = connect(
  null,
  mapDispatchToProps,
)(withNavigation(_ChapterList));
