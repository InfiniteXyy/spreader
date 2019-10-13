import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Header, Text } from '../../components';
import { connect } from 'react-redux';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { IState } from '../../reducers';
import { SavedBook } from '../../model/Book';
import { Chapter } from '../../model/Chapter';
import { getContent } from '../../agents/spider';
import { ChapterTitle, ReaderContainer, ReaderScroll, StyledContent } from './components';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';
import { Skeleton } from './Skeleton';

interface IStateProps {
  book?: SavedBook;
  chapter?: Chapter;
}

function _Reader(props: NavigationInjectedProps & IStateProps) {
  const [contents, setContents] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(true);
  const { book, chapter, navigation } = props;
  if (!book || !chapter) {
    return <Container />;
  }

  const prevOffsetY = useRef(0);

  useEffect(() => {
    setIsLoading(true);
    getContent(chapter.href, book.methods.getContent).then(result => {
      setContents(result);
      setIsLoading(false);
    });
  }, [chapter]);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isLoading) return;
      const currentOffsetY = e.nativeEvent.contentOffset.y;
      if (menuVisible && currentOffsetY > prevOffsetY.current) {
        setMenuVisible(false);
      } else if (!menuVisible && currentOffsetY < prevOffsetY.current) {
        setMenuVisible(true);
      }
    },
    [menuVisible, isLoading],
  );

  return (
    <Container>
      <ReaderContainer>
        <ReaderScroll
          onScroll={handleScroll}
          onScrollBeginDrag={e => {
            prevOffsetY.current = e.nativeEvent.contentOffset.y;
          }}
          scrollEventThrottle={64}>
          <ChapterTitle>{chapter.title}</ChapterTitle>
          {isLoading ? (
            <Skeleton />
          ) : (
            contents.map((i, index) => <StyledContent key={index}>{'        ' + i}</StyledContent>)
          )}
        </ReaderScroll>
      </ReaderContainer>
      <Header visible={menuVisible} goBack={navigation.goBack} absolute />
    </Container>
  );
}

function mapStateToProps(state: IState, props: NavigationInjectedProps): IStateProps {
  const bookId = props.navigation.getParam<string>('bookId');
  const chapterHref = props.navigation.getParam<string>('chapterHref');
  const book = state.bookReducer.books.find(i => i.id === bookId);
  if (book === undefined) return {};
  const chapter = book.chapters.find(i => i.href === chapterHref);
  return {
    book,
    chapter,
  };
}

export const Reader = connect(mapStateToProps)(withNavigation(_Reader));
