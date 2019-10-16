import React from 'react';
import { BookFeed } from '../../model/Feed';
import { Text, VStack } from '../../components';
import { FeedItemContainer, FeedItemImage } from './components';

interface IFeedItemProps {
  feed: BookFeed;
}

export function FeedItem(props: IFeedItemProps) {
  const { feed } = props;
  return (
    <FeedItemContainer>
      <FeedItemImage source={{ uri: 'https://via.placeholder.com/65x90' }} />
      <VStack style={{ marginLeft: 20 }}>
        <Text variant="subtitle" bold>
          {feed.title}
        </Text>
        <Text variant="body" secondary bold style={{ marginTop: 3 }}>
          {feed.author}
        </Text>
      </VStack>
    </FeedItemContainer>
  );
}
