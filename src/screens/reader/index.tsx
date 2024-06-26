import IconFeather from '@expo/vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StatusBar, Text, TextStyle, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { Editor } from './Editor';
import { ReaderFooter } from './ReaderFooter';
import { ReaderHeader } from './ReaderHeader';
import { Skeleton } from './Skeleton';
import { ReaderScroll } from './components';
import { getContent } from '../../agents/spider';
import { Container } from '../../components';
import { SavedBook } from '../../model/Book';
import { SavedChapter } from '../../model/Chapter';
import { DefaultReaderThemes, ReaderTheme } from '../../model/Theme';
import { BookAction, BookMarkAsRead } from '../../reducers/book/book.action';
import { ReaderState } from '../../reducers/reader/reader.state';
import { useTrackedSelector } from '../../store';
import { colors } from '../../theme';

interface IStateProps {
  book?: SavedBook;
  chapter?: SavedChapter;
  prevChapter?: SavedChapter;
  nextChapter?: SavedChapter;
  readerStyle: ReaderState;
}

const TOUCH_TIMEOUT = 150;

function padWithTab(content: string) {
  return '        ' + content;
}

export const ReaderThemeContext = createContext<ReaderTheme>(DefaultReaderThemes[0]);

export function Reader() {
  const [contents, setContents] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(true);
  const [editorVisible, setEditorVisible] = useState(false);
  const { book, chapter, readerStyle, prevChapter, nextChapter } = useReaderState();
  const navigation = useNavigation<any>();
  const { lineHeightRatio, titleAlign, readerTheme, fontSize, titleSize, paragraphSpace } = readerStyle;

  const dispatch = useDispatch<Dispatch<BookAction>>();
  const onReadChapter = useCallback(
    (book: SavedBook, chapter: SavedChapter) => {
      dispatch(new BookMarkAsRead(book, chapter));
    },
    [dispatch],
  );

  const currentHref = useRef<string>(chapter?.href || '');
  const lastPressHandler = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!chapter || !book) {
      return;
    }
    setIsLoading(true);
    getContent(chapter.href, book.methods.getContent).then((result) => {
      if (chapter.href === currentHref.current) {
        setContents(result);
        onReadChapter(book, chapter);
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only trigger on mount
  }, [chapter?.href]);

  if (chapter) {
    currentHref.current = chapter.href;
  }

  const handleOnTouchStart = useCallback(() => {
    lastPressHandler.current = setTimeout(() => {
      setMenuVisible(!menuVisible);
    }, TOUCH_TIMEOUT);
  }, [menuVisible]);

  const handleOnScroll = useCallback(() => {
    if (lastPressHandler.current !== null) {
      clearTimeout(lastPressHandler.current);
    }
    setMenuVisible(false);
  }, []);

  const textStyle = useMemo(
    () => ({
      fontSize,
      lineHeight: Math.round(lineHeightRatio * fontSize),
      color: readerTheme.fontColor,
      marginTop: Math.round(paragraphSpace * fontSize),
    }),
    [fontSize, lineHeightRatio, readerTheme.fontColor, paragraphSpace],
  );

  const titleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: titleSize,
      color: readerTheme.titleColor,
      marginTop: 50,
      marginBottom: 10,
      alignSelf: titleAlign,
      fontWeight: '500',
    }),
    [titleSize, readerTheme.titleColor, titleAlign],
  );

  const backgroundStyle = useMemo(
    () => ({
      backgroundColor: readerTheme.bgColor,
    }),
    [readerTheme.bgColor],
  );

  if (!book || !chapter) {
    return <Container />;
  }

  const dark = readerTheme.mode === 'dark';

  const header = (
    <ReaderHeader
      visible={menuVisible}
      goBack={navigation.goBack}
      rightComponent={
        <IconFeather
          style={{ padding: 10 }}
          name={dark ? 'moon' : 'sun'}
          size={20}
          color={dark ? colors.tintColorLight : colors.tintColor}
          onPress={() => {
            if (menuVisible) {
              setEditorVisible(true);
            }
          }}
        />
      }
    />
  );

  const footer = (
    <ReaderFooter
      visible={menuVisible}
      prevChapter={prevChapter}
      nextChapter={nextChapter}
      onNavigate={(_chapter) => {
        navigation.navigate('reader', { bookId: book.id, chapterHref: _chapter.href });
      }}
    />
  );

  return (
    <Container style={backgroundStyle}>
      <ReaderThemeContext.Provider value={readerTheme}>
        <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={readerTheme.bgColor} />
        <View>
          <ReaderScroll
            scrollEnabled={!isLoading}
            onTouchStart={handleOnTouchStart}
            onScrollBeginDrag={handleOnScroll}
            scrollEventThrottle={64}
          >
            <Text style={titleStyle}>{chapter.title}</Text>
            {isLoading ? (
              <Skeleton dark={dark} />
            ) : (
              contents.map((para, index) => (
                <Text style={textStyle} key={index}>
                  {padWithTab(para)}
                </Text>
              ))
            )}
            <View style={{ height: 30 }} />
          </ReaderScroll>
        </View>
        {header}
        {footer}
        <Editor onClose={() => setEditorVisible(false)} visible={editorVisible} />
      </ReaderThemeContext.Provider>
    </Container>
  );
}

function useReaderState(): IStateProps {
  const route = useRoute<any>();
  const { bookReducer, readerReducer } = useTrackedSelector();
  return useMemo(() => {
    const bookId = route.params.bookId;
    const chapterHref = route.params.chapterHref;
    const book = bookReducer.books.find((i) => i.id === bookId);
    if (book === undefined) {
      return { readerStyle: readerReducer };
    }
    const chapterIndex = book.chapters.findIndex((i) => i.href === chapterHref);
    const chapter = chapterIndex !== -1 ? book.chapters[chapterIndex] : undefined;
    const prevChapter = chapterIndex - 1 >= 0 ? book.chapters[chapterIndex - 1] : undefined;
    const nextChapter = chapterIndex + 1 < book.chapters.length ? book.chapters[chapterIndex + 1] : undefined;
    return {
      book,
      chapter,
      prevChapter,
      nextChapter,
      readerStyle: readerReducer,
    };
  }, [bookReducer.books, readerReducer, route.params.bookId, route.params.chapterHref]);
}
