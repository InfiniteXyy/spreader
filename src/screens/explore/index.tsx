import React from 'react';
import { Container, SearchBar, Title } from '../../components';
import { TopicList } from './TopicList';
import { HotList } from './HotList';
import { ScrollView } from 'react-native';

function Explore() {
  return (
    <Container>
      <Title>发现</Title>
      <SearchBar />
      <ScrollView>
        <TopicList />
        <HotList />
      </ScrollView>
    </Container>
  );
}

export default Explore;
