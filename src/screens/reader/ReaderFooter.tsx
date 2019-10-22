import React, { useContext, useEffect, useMemo } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { HStack, Text, VStack } from '../../components';
import { ReaderFooterContainer } from './components';
import { colors } from '../../theme';
import { ReaderThemeContext } from './index';
import { SavedChapter } from '../../model/Chapter';

interface IFooterProps {
  visible: boolean;
  prevChapter?: SavedChapter;
  nextChapter?: SavedChapter;
  onNavigate(chapter: SavedChapter): void;
}

export function ReaderFooter(props: IFooterProps) {
  const { visible, prevChapter, nextChapter, onNavigate } = props;
  const footerOpacity = useMemo(() => new Animated.Value(1), []);
  const readerTheme = useContext(ReaderThemeContext);
  useEffect(() => {
    Animated.timing(footerOpacity, {
      toValue: visible ? 1 : 0,
      duration: visible ? 200 : 100,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const prevChapterComponent = prevChapter ? (
    <TouchableOpacity onPress={() => onNavigate(prevChapter)} style={{ flex: 1 }}>
      <Text style={{ color: readerTheme.fontColor }} bold variant="tip">
        上一章
      </Text>
      <Text style={{ color: readerTheme.titleColor, marginTop: 3 }} variant="tip" numberOfLines={1}>
        {prevChapter.title}
      </Text>
    </TouchableOpacity>
  ) : (
    <View />
  );

  const nextChapterComponent = nextChapter ? (
    <TouchableOpacity onPress={() => onNavigate(nextChapter)} style={{ alignItems: 'flex-end', flex: 1 }}>
      <Text style={{ color: readerTheme.fontColor }} bold variant="tip">
        下一章
      </Text>
      <Text style={{ color: readerTheme.titleColor, marginTop: 3 }} variant="tip"  numberOfLines={1}>
        {nextChapter.title}
      </Text>
    </TouchableOpacity>
  ) : (
    <View />
  );
  return (
    <ReaderFooterContainer
      style={{
        backgroundColor: readerTheme.bgColor,
        borderTopColor: readerTheme.mode === 'dark' ? colors.dividerColorLight : colors.dividerColor,
        opacity: footerOpacity,
      }}>
      <HStack center expand>
        {prevChapterComponent}
        {nextChapterComponent}
      </HStack>
    </ReaderFooterContainer>
  );
}
