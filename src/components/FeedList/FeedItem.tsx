import React from 'react';
import { TouchableOpacity } from 'react-native';

import { FeedListIcon, FeedItemContainer, FeedItemImage } from './components';
import { BookFeed } from '../../model/Feed';
import { HStack, Tag, Text, VStack } from '../index';

interface IFeedItemProps {
  feed: BookFeed;
  onPressToggle(feed: BookFeed): void;
  isAdded: boolean;
}
export function FeedItem(props: IFeedItemProps) {
  const { feed, onPressToggle, isAdded } = props;
  const lastUpdate = <Text>{feed.lastUpdateChapter ? feed.lastUpdateChapter.title : '最新章节未知'}</Text>;
  const tagList = feed.tags.map((tag) => <Tag key={tag.title} title={tag.title} />);
  const title = (
    <Text variant="subtitle" bold>
      {feed.title}
    </Text>
  );
  const author = (
    <Text variant="tip" secondary style={{ marginTop: 3 }}>
      {feed.author}
    </Text>
  );
  return (
    <FeedItemContainer key={feed.id}>
      <FeedItemImage source={{ uri: feed.coverImg }} />
      <VStack style={{ marginLeft: 20, height: '100%' }} expand>
        <HStack>
          <VStack>
            {title}
            {author}
          </VStack>
          <TouchableOpacity onPress={() => onPressToggle(feed)}>
            {isAdded ? <Text secondary>已添加</Text> : <FeedListIcon name="download" />}
          </TouchableOpacity>
        </HStack>

        <HStack expand center>
          {lastUpdate}
          <HStack>{tagList}</HStack>
        </HStack>
      </VStack>
    </FeedItemContainer>
  );
}
