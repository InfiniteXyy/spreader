import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';

import { TagItem } from './TagItem';
import { SectionContainer } from './components';
import { Text } from '../../../components';
import { HubLoadTagsAsync } from '../../../reducers/hub/hub.action';
import { useTrackedSelector } from '../../../store';

interface ITopicListProps {}

export function TagList(props: ITopicListProps) {
  const data = useTrackedSelector().hubReducer.tagList.data;
  const navigation = useNavigation<any>();
  const onLoad = useActions().onLoad;

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  const onNavigateTopic = useCallback(() => {
    navigation.navigate('topic');
  }, [navigation]);
  return (
    <SectionContainer>
      <Text variant="title" bold style={{ marginLeft: 20 }}>
        主题
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => (
          <TagItem
            key={item.id.toString()}
            item={item}
            isLastItem={index === data.length - 1}
            onPress={onNavigateTopic}
          />
        ))}
      </ScrollView>
    </SectionContainer>
  );
}

function useActions() {
  const dispatch = useDispatch<any>();
  return useMemo(() => {
    return {
      onLoad: () => dispatch(HubLoadTagsAsync()),
    };
  }, [dispatch]);
}
