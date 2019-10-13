import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Container, Header } from '../../components';
import { connect } from 'react-redux';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { IState } from '../../reducers';
import { SavedBook } from '../../model/Book';
import { Chapter } from '../../model/Chapter';
import { getContent } from '../../agents/spider';
import { NativeScrollEvent, NativeSyntheticEvent, Text, TextStyle, View } from 'react-native';
import { Skeleton } from './Skeleton';
import { ReaderState } from '../../reducers/reader/reader.state';
import { ReaderScroll } from './components';
import Icon from 'react-native-vector-icons/EvilIcons';
import { ThemeContext } from 'styled-components/native';
import { Editor } from './Editor';

interface IStateProps {
  book?: SavedBook;
  chapter?: Chapter;
  readerStyle: ReaderState;
}

function padWithTab(content: string) {
  return '        ' + content;
}

function _Reader(props: NavigationInjectedProps & IStateProps) {
  const [contents, setContents] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(true);
  const [editorVisible, setEditorVisible] = useState(false);
  const theme = useContext(ThemeContext);
  const { book, chapter, navigation, readerStyle } = props;
  const { lineHeight, titleAlign, bgColor, fontColor, fontSize, titleSize, paragraphSpace } = readerStyle;
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

  const textStyle = useMemo(
    () => ({
      fontSize: readerStyle.fontSize,
      lineHeight: readerStyle.lineHeight,
      color: readerStyle.fontColor,
      marginTop: readerStyle.paragraphSpace,
    }),
    [fontSize, lineHeight, fontColor, paragraphSpace],
  );

  const titleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: titleSize,
      color: fontColor,
      marginTop: 50,
      marginBottom: 10,
      alignSelf: titleAlign,
      fontWeight: '500',
    }),
    [titleSize, fontColor, titleAlign],
  );

  const backgroundStyle = useMemo(
    () => ({
      backgroundColor: bgColor,
    }),
    [bgColor],
  );

  return (
    <Container>
      <View style={backgroundStyle}>
        <ReaderScroll
          scrollEnabled={!isLoading}
          onScroll={handleScroll}
          onScrollBeginDrag={e => {
            prevOffsetY.current = e.nativeEvent.contentOffset.y;
          }}
          scrollEventThrottle={64}>
          <Text style={titleStyle}>{chapter.title}</Text>
          {isLoading ? (
            <Skeleton />
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
        rightComponent={
          <Icon name="navicon" size={20} color={theme.tintColor} onPress={() => setEditorVisible(true)} />
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
