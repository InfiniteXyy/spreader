import React, { useCallback, useEffect } from 'react';
import { Text } from '../../../components';
import { SectionContainer } from './components';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { IState } from '../../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { HubAction, HubLoadTagsAsync } from '../../../reducers/hub/hub.action';
import { BookTag } from '../../../model/BookTag';
import { TagItem } from './TagItem';
import { useNavigation } from '@react-navigation/native';

interface ITopicListProps {}

interface IStateProps {
  isLoading: boolean;
  data: BookTag[];
}

interface IDispatchProps {
  onLoad(): void;
}

function _TagList(props: ITopicListProps & IStateProps & IDispatchProps) {
  const { data, onLoad } = props;
  const navigation = useNavigation<any>();
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

function mapStateToProps(state: IState): IStateProps {
  return {
    isLoading: state.hubReducer.tagList.isLoading,
    data: state.hubReducer.tagList.data,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, void, HubAction>): IDispatchProps {
  return {
    onLoad: () => dispatch(HubLoadTagsAsync()),
  };
}

export const TagList = connect(mapStateToProps, mapDispatchToProps)(_TagList);
