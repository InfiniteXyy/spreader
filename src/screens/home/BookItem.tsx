import { SavedBook } from '../../model/Book';
import React, { useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import { getLastOf } from '../../utils';
import { SavedChapter } from '../../model/Chapter';
import { CardSubTitle, CardTitle, CardWrapper, CoverImg } from './components';
import { HStack, Text, VStack } from '../../components';
import { TouchableOpacityProps, View } from 'react-native';
import Spinner from 'react-native-spinkit';

interface IBookItemProps extends TouchableOpacityProps {
  book: SavedBook;
}
export function BookItem(props: IBookItemProps) {
  const { book } = props;
  const theme = useContext(ThemeContext);

  const lastChapter = useMemo(() => {
    return getLastOf<SavedChapter, string>(book.chapters, i => i.title, '无');
  }, [book.chapters.length]);

  const unReadCount = useMemo(() => {
    return book.chapters.reduce((value, cur) => {
      return !cur.hasRead ? value + 1 : value;
    }, 0);
  }, [book.chapters.length, book.lastRead]);

  return (
    <CardWrapper {...props}>
      <CoverImg source={{ uri: book.coverImg }} />
      <VStack expand>
        <View>
          <CardTitle>{book.title}</CardTitle>
          <CardSubTitle>{book.author}</CardSubTitle>
        </View>
        <HStack expand center>
          <HStack>
            <Text secondary>最新 </Text>
            {book.isFetching ? (
              <View style={{ marginLeft: 8 }}>
                <Spinner type="ThreeBounce" size={12} color={theme.primaryText} />
              </View>
            ) : (
              <Text bold>{lastChapter}</Text>
            )}
          </HStack>

          {unReadCount !== 0 && (
            <HStack>
              <Text colorType="pin">{unReadCount}章 </Text>
              <Text>未读</Text>
            </HStack>
          )}
        </HStack>
      </VStack>
    </CardWrapper>
  );
}
