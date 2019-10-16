import React from 'react';
import { Text } from '../../components';
import { SectionContainer, TopicCardContainer } from './components';
import { Topic } from '../../model/Topic';
import { range } from '../../utils';
import { ScrollView, View } from 'react-native';

const topics: Topic[] = range(0, 4).map(i => ({
  title: '玄幻',
  feedCount: 120,
  id: '12',
}));

interface ITopicListProps {}
export function TopicList(props: ITopicListProps) {
  return (
    <SectionContainer>
      <Text variant="title" bold style={{ marginLeft: 20 }}>
        主题
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {topics.map(i => (
          <TopicItem item={i} />
        ))}
      </ScrollView>
    </SectionContainer>
  );
}

function TopicItem(props: { item: Topic }) {
  const { item } = props;
  return (
    <TopicCardContainer>
      <Text style={{ color: 'white' }} variant="subtitle" bold>
        {item.title}
      </Text>
      <Text style={{ color: '#cccccc' }} variant="body">
        {item.feedCount} more
      </Text>
    </TopicCardContainer>
  );
}
