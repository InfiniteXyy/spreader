import React from 'react';
import { SavedBook } from '../../model/Book';
import { BannerContainer, BannerImg, BannerSubtitle, BannerTitle } from './components';
import { View } from 'react-native';
import { Button, HStack } from '../../components';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BookAction, BookMarkAllAsRead } from '../../reducers/book/book.action';

interface IBannerProps {
  book: SavedBook;
}

interface IDispatchProps {
  markAllAsRead(book: SavedBook): void;
}

function _Banner(props: IBannerProps & IDispatchProps) {
  const { book, markAllAsRead } = props;
  return (
    <BannerContainer>
      <HStack>
        <BannerImg source={{ uri: book.coverImg }} />
        <View>
          <BannerTitle bold>{book.title}</BannerTitle>
          <BannerSubtitle>{book.author}</BannerSubtitle>
        </View>
      </HStack>
      <HStack style={{ marginTop: 10 }}>
        <Button title="继续阅读" />
        <Button title="全部已读" onPress={() => markAllAsRead(book)} />
      </HStack>
    </BannerContainer>
  );
}

function mapDispatchToProps(dispatch: Dispatch<BookAction>): IDispatchProps {
  return {
    markAllAsRead(book: SavedBook) {
      dispatch(new BookMarkAllAsRead(book));
    },
  };
}
export const Banner = connect(
  null,
  mapDispatchToProps,
)(_Banner);
