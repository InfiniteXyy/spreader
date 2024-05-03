import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { FeedItem } from './FeedItem';
import { BookFeed } from '../../model/Feed';
import { BookAction, BookAdd, BookRemove } from '../../reducers/book/book.action';
import { useTrackedSelector } from '../../store';

interface IFeedListProps {
  feeds: BookFeed[];
}

export function FeedList(props: IFeedListProps) {
  const { books } = useTrackedSelector().bookReducer;
  const dispatch = useDispatch<Dispatch<BookAction>>();

  const onAddFeed = (feed: BookFeed) => {
    dispatch(new BookAdd(feed));
  };
  const onRemoveFeed = (feed: BookFeed) => {
    dispatch(new BookRemove(feed));
  };

  return (
    <View style={{ marginTop: 20 }}>
      {props.feeds.map((i) => {
        const isAdded = books.findIndex((k) => i.id === k.id) !== -1;
        return (
          <FeedItem
            key={i.id.toString()}
            isAdded={isAdded}
            onPressToggle={isAdded ? onRemoveFeed : onAddFeed}
            feed={i}
          />
        );
      })}
    </View>
  );
}
