import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Container, Header } from '../../components';
import { connect } from 'react-redux';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { IState } from '../../reducers';
import { SavedBook } from '../../model/Book';
import { Chapter } from '../../model/Chapter';
import { getContent } from '../../agents/spider';
import {
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  Text,
  TextStyle,
  TimerMixin,
  View,
} from 'react-native';
import { Skeleton } from './Skeleton';
import { ReaderState } from '../../reducers/reader/reader.state';
import { ReaderScroll } from './components';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Editor } from './Editor';
import { colors } from '../../theme';

interface IStateProps {
  book?: SavedBook;
  chapter?: Chapter;
  readerStyle: ReaderState;
}
const TOUCH_TIMEOUT = 150;

function padWithTab(content: string) {
  return '        ' + content;
}

function _Reader(props: NavigationInjectedProps & IStateProps) {
  const [contents, setContents] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(true);
  const [editorVisible, setEditorVisible] = useState(false);
  const { book, chapter, navigation, readerStyle } = props;
  const { lineHeightRatio, titleAlign, readerTheme, fontSize, titleSize, paragraphSpace } = readerStyle;
  if (!book || !chapter) {
    return <Container />;
  }

  const lastPressHandler = useRef<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getContent(chapter.href, book.methods.getContent).then(result => {
      setContents(result);
      setIsLoading(false);
    });
  }, [chapter]);

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

  return (
    <Container style={backgroundStyle}>
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
        </ReaderScroll>
      </View>
      <Header
        visible={menuVisible}
        goBack={navigation.goBack}
        absolute
        dark={dark}
        rightComponent={
          <Icon
            style={{ padding: 10 }}
            name="navicon"
            size={20}
            color={dark ? colors.tintColorLight : colors.tintColor}
            onPress={() => {
              if (menuVisible) setEditorVisible(true);
            }}
          />
        }
      />
      <Editor onClose={() => setEditorVisible(false)} visible={editorVisible} />
    </Container>
  );
}

function mapStateToProps(state: IState, props: NavigationInjectedProps): IStateProps {
  const bookId = props.navigation.getParam<string>('bookId');
  const chapterHref = props.navigation.getParam<string>('chapterHref');
  const book = state.bookReducer.books.find(i => i.id === bookId);
  if (book === undefined) return { readerStyle: state.readerReducer };
  const chapter = book.chapters.find(i => i.href === chapterHref);
  return {
    book,
    chapter,
    readerStyle: state.readerReducer,
  };
}

export const Reader = connect(mapStateToProps)(withNavigation(_Reader));
