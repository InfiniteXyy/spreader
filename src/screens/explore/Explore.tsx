import React, { useCallback } from 'react';
import { Container, SearchBar, Title } from '../../components';
import { TopicList } from './TopicList';
import { HotList } from './HotList';
import { ScrollView } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';

export function Explore(props: NavigationInjectedProps) {
  const onSearch = useCallback(() => {
    props.navigation.navigate('search');
  }, [props.navigation]);
  return (
    <Container>
      <Title>发现</Title>
      <SearchBar onPress={onSearch} />
      <ScrollView>
        <TopicList />
        <HotList />
      </ScrollView>
    </Container>
  );
}
