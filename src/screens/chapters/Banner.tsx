import React from 'react';
import { SavedBook } from '../../model/Book';
import { BannerContainer, BannerImg, BannerSubtitle, BannerTitle } from './components';
import { View } from 'react-native';
import { Button, HStack } from '../../components';

interface IBannerProps {
  book: SavedBook;
}
export function Banner(props: IBannerProps) {
  const { book } = props;
  return (
    <BannerContainer>
      <HStack>
        <BannerImg source={{ uri: book.coverImg }} />
        <View>
          <BannerTitle>{book.title}</BannerTitle>
          <BannerSubtitle>{book.author}</BannerSubtitle>
        </View>
      </HStack>
      <HStack>
        <Button title="继续阅读" />
        <Button title="全部已读" />
      </HStack>
    </BannerContainer>
  );
}
