import React from 'react';
import { SectionContainer } from './components';
import { Text } from '../../components';
import { FeedList } from '../../shared/FeedList';
import { View } from 'react-native';
import { BookFeed } from '../../model/Feed';
import { range } from '../../utils';

const feedList: BookFeed[] = range(1, 10).map(i => ({
  uploader: '123',
  chaptersCount: i + 1000,
  lastUpdateChapter: {
    updateAt: '123',
    title: '第1300章、你的婆婆在哪里',
    href: '123',
  },
  tags: [],
  source: {
    name: '123',
    url: '123',
  },
  coverImg: ' 123',
  methods: {
    getList: {
      url: '123',
      query: '123',
    },
    getContent: {
      query: '123',
    },
  },
  key: '123',
  author: '火星引力',
  title: '逆天邪神',
}));

interface IFeedListProps {}
export function HotList(props: IFeedListProps) {
  return (
    <SectionContainer>
      <Text variant="title" bold style={{ marginLeft: 20 }}>
        热门
      </Text>
      <View style={{ paddingHorizontal: 20 }}>
        <FeedList feeds={feedList} />
      </View>
    </SectionContainer>
  );
}
