import React from 'react';
import { FlatList } from 'react-native';
import { FeedItem } from './FeedItem';
import { BookFeed } from '../../model/Feed';

interface IFeedList {
  feeds: BookFeed[];
}

export function FeedList(props: IFeedList) {
  return <FlatList data={props.feeds} renderItem={i => <FeedItem feed={i.item} />} />;
}
