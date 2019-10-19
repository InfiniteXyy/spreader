import styled from 'styled-components/native';
import { BookTag } from '../../../model/BookTag';
import { Text } from '../../../components';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
export const SectionContainer = styled.View`
  padding: 20px 0 0 0;
`;

export const TopicCardContainer = styled.ImageBackground`
  height: 140px;
  width: 90px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  margin: 10px 0 10px 20px;
`;

export function TagItem(props: { item: BookTag }) {
  const { item } = props;
  return (
    <TopicCardContainer style={{ elevation: 1 }} source={{ uri: item.coverImg }} borderRadius={6}>
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.78)']}
        style={{ flex: 1, borderRadius: 6, padding: 8, justifyContent: 'flex-end' }}>
        <Text style={{ color: 'white' }} variant="subtitle" bold>
          {item.title}
        </Text>
        <Text style={{ color: '#cccccc' }} variant="body">
          {item.feedsCount} more
        </Text>
      </LinearGradient>
    </TopicCardContainer>
  );
}
