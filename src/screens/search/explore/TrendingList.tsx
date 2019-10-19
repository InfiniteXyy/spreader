import React, { useEffect } from 'react';
import { SectionContainer } from './components';
import { Text } from '../../../components';
import { FeedList } from '../../../components/FeedList';
import { View } from 'react-native';
import { BookFeed } from '../../../model/Feed';
import { connect } from 'react-redux';
import { IState } from '../../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { HubAction, HubLoadTrendingAsync } from '../../../reducers/hub/hub.action';

interface IFeedListProps {}

interface IStateProps {
  isLoading: boolean;
  data: BookFeed[];
}

interface IDispatchProps {
  onLoad(): void;
}

function _TrendingList(props: IFeedListProps & IStateProps & IDispatchProps) {
  const { data, onLoad } = props;
  useEffect(() => {
    onLoad();
  }, []);
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

function mapStateToProps(state: IState): IStateProps {
  return {
    isLoading: state.hubReducer.trendingList.isLoading,
    data: state.hubReducer.trendingList.data,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, void, HubAction>): IDispatchProps {
  return {
    onLoad: () => dispatch(HubLoadTrendingAsync()),
  };
}

export const TrendingList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_TrendingList);
