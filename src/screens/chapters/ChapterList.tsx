import React, { useCallback } from 'react';
import { SavedChapter } from '../../model/Chapter';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, Platform } from 'react-native';
import { HStack, Text } from '../../components';
import { SavedBook } from '../../model/Book';
import { Banner } from './Banner';
import { createPageItems } from '../../utils';
import { ChapterPicker } from './ChapterPicker';
import { BookChangeIndex } from '../../reducers/book/book.action';
import { useNavigation } from '@react-navigation/native';
import { ChapterListItemContainer, ChapterListItemDot } from './components';
import { Loader } from 'rn-placeholder';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';

interface IChapterListProps {
  book: SavedBook;
  onLoad(): void;
  onScroll(event: NativeSyntheticEvent<NativeScrollEvent>): void;
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

export function ChapterList(props: IChapterListProps) {
  const { book } = props;
  const visibleChapters = createPageItems<SavedChapter>(book.chapters, book.currentPage, !!book.reverse, dummyChapter);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const onChangePage = useCallback(
    (_book: SavedBook, index: number, reversed: boolean) => {
      dispatch(new BookChangeIndex(_book, index, reversed) as Action);
    },
    [dispatch],
  );

  const onNavigateChapter = (chapter: SavedChapter) => {
    navigation.navigate('reader', { bookId: book.id, chapterHref: chapter.href });
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
      keyExtractor={(item) => item.href}
      renderItem={(i) => {
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
