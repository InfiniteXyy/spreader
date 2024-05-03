import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { SectionContainer } from './components';
import { Text } from '../../../components';
import { FeedList } from '../../../components/FeedList';
import { HubLoadTrendingAsync } from '../../../reducers/hub/hub.action';
import { useTrackedSelector } from '../../../store';

export function TrendingList() {
  const data = useTrackedSelector().hubReducer.trendingList.data;

  const dispatch = useDispatch<any>();
  const onLoad = useCallback(() => dispatch(HubLoadTrendingAsync()), [dispatch]);

  useEffect(() => {
    onLoad();
  }, [onLoad]);
  return (
    <SectionContainer>
      <Text variant="title" bold style={{ marginLeft: 20 }}>
        热门
      </Text>
      <View style={{ paddingHorizontal: 20 }}>
        <FeedList feeds={data} />
      </View>
    </SectionContainer>
  );
}
