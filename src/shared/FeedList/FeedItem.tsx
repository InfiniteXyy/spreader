import React from 'react';
import { BookFeed } from '../../model/Feed';
import { HStack, Tag, Text, VStack } from '../../components';
import { FeedListIcon, FeedItemContainer, FeedItemImage } from './components';

interface IFeedItemProps {
  feed: BookFeed;
}

export function FeedItem(props: IFeedItemProps) {
  const { feed } = props;
  const lastUpdate = feed.lastUpdateChapter && <Text>{feed.lastUpdateChapter.title}</Text>;
  const tagList = feed.tags.map(tag => <Tag title={tag.title} />);
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
    <FeedItemContainer>
      <FeedItemImage source={{ uri: 'https://via.placeholder.com/65x90' }} />
      <VStack style={{ marginLeft: 20, height: '100%' }} expand>
        <HStack>
          <VStack>
            {title}
            {author}
          </VStack>
          <FeedListIcon name="download" />
        </HStack>
        <HStack expand center>
          {lastUpdate}
          <HStack>{tagList}</HStack>
        </HStack>
      </VStack>
    </FeedItemContainer>
  );
}
