import { BookTag } from '../../../model/BookTag';
import { TouchableOpacity } from 'react-native';
import { Text } from '../../../components';
import React from 'react';
import { TopicCardContainer } from './components';
import { LinearGradient } from 'expo-linear-gradient';

interface ITagItem {
  item: BookTag;
  isLastItem: boolean;
  onPress(): void;
}

export function TagItem(props: ITagItem) {
  const { item, isLastItem, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ marginVertical: 10, marginRight: isLastItem ? 20 : 0, marginLeft: 20 }}
    >
      <TopicCardContainer style={{ elevation: 1 }} source={{ uri: item.coverImg }} borderRadius={6}>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.78)']}
          style={{ flex: 1, borderRadius: 6, padding: 8, justifyContent: 'flex-end' }}
        >
          <Text style={{ color: 'white' }} variant="subtitle" bold>
            {item.title}
          </Text>
          <Text style={{ color: '#cccccc' }} variant="body">
            {item.feedsCount} more
          </Text>
        </LinearGradient>
      </TopicCardContainer>
    </TouchableOpacity>
  );
}
