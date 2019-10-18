import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Container, Header } from '../../components';
import { connect } from 'react-redux';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { IState } from '../../reducers';
import { SavedBook } from '../../model/Book';
import { SavedChapter } from '../../model/Chapter';
import { getContent } from '../../agents/spider';
import {
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  Text,
  TextStyle,
  View,
} from 'react-native';
import { Skeleton } from './Skeleton';
import { ReaderState } from '../../reducers/reader/reader.state';
import { ReaderScroll } from './components';
import IconFeather from 'react-native-vector-icons/Feather';
import { Editor } from './Editor';
import { colors } from '../../theme';
import { ReaderFooter } from './ReaderFooter';
import { DefaultReaderThemes, ReaderTheme } from '../../model/Theme';
import { Dispatch } from 'redux';
import { BookAction, BookMarkAsRead } from '../../reducers/book/book.action';

interface IStateProps {
  book?: SavedBook;
  chapter?: SavedChapter;
  prevChapter?: SavedChapter;
  nextChapter?: SavedChapter;
  readerStyle: ReaderState;
}

interface IDispatchProps {
  onReadChapter(book: SavedBook, chapter: SavedChapter): void;
}

const TOUCH_TIMEOUT = 150;

function padWithTab(content: string) {
  return '        ' + content;
}

export const ReaderThemeContext = createContext<ReaderTheme>(DefaultReaderThemes[0]);

function _Reader(props: NavigationInjectedProps & IStateProps & IDispatchProps) {
  const [contents, setContents] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(true);
  const [editorVisible, setEditorVisible] = useState(false);
  const { book, chapter, navigation, readerStyle, prevChapter, nextChapter } = props;
  const { lineHeightRatio, titleAlign, readerTheme, fontSize, titleSize, paragraphSpace } = readerStyle;
  if (!book || !chapter) {
    return <Container />;
  }

  const currentHref = useRef<string>(chapter.href);
  const lastPressHandler = useRef<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getContent(chapter.href, book.methods.getContent).then(result => {
      if (chapter.href === currentHref.current) {
        setContents(result);
        props.onReadChapter(book, chapter);
        setIsLoading(false);
      }
    });
  }, [chapter.href]);

  useEffect(() => {
    currentHref.current = chapter.href;
  }, [chapter.href]);

  const handleOnTouchStart = useCallback(
    (e: GestureResponderEvent) => {
      lastPressHandler.current = setTimeout(() => {
        setMenuVisible(!menuVisible);
      }, TOUCH_TIMEOUT);
    },
    [menuVisible],
  );

  const handleOnScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (lastPressHandler.current !== null) clearTimeout(lastPressHandler.current);
    setMenuVisible(false);
  }, []);

  const textStyle = useMemo(
    () => ({
      fontSize: fontSize,
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

  const dark = readerTheme.mode === 'dark';

  const header = (
    <Header
      visible={menuVisible}
      goBack={navigation.goBack}
      absolute
      dark={dark}
      rightComponent={
        <IconFeather
          style={{ padding: 10 }}
          name={dark ? 'moon' : 'sun'}
          size={20}
          color={dark ? colors.tintColorLight : colors.tintColor}
          onPress={() => {
            if (menuVisible) setEditorVisible(true);
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
      onNavigate={chapter => {
        props.navigation.navigate({ routeName: 'reader', params: { bookId: book.id, chapterHref: chapter.href } });
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
            scrollEventThrottle={64}>
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

function mapStateToProps(state: IState, props: NavigationInjectedProps): IStateProps {
  const bookId = props.navigation.getParam<string>('bookId');
  const chapterHref = props.navigation.getParam<string>('chapterHref');
  const book = state.bookReducer.books.find(i => i.id === bookId);
  if (book === undefined) return { readerStyle: state.readerReducer };
  const chapterIndex = book.chapters.findIndex(i => i.href === chapterHref);
  const chapter = chapterIndex !== -1 ? book.chapters[chapterIndex] : undefined;
  const prevChapter = chapterIndex - 1 >= 0 ? book.chapters[chapterIndex - 1] : undefined;
  const nextChapter = chapterIndex + 1 < book.chapters.length ? book.chapters[chapterIndex + 1] : undefined;
  return {
    book,
    chapter,
    prevChapter,
    nextChapter,
    readerStyle: state.readerReducer,
  };
}

function mapDispatchToProps(dispatch: Dispatch<BookAction>): IDispatchProps {
  return {
    onReadChapter(book: SavedBook, chapter: SavedChapter) {
      dispatch(new BookMarkAsRead(book, chapter));
    },
  };
}

export const Reader = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(_Reader));
