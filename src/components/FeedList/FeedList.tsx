import React from 'react';
import { FlatList, View } from 'react-native';
import { FeedItem } from './FeedItem';
import { BookFeed } from '../../model/Feed';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { Dispatch } from 'redux';
import { BookAction, BookAdd } from '../../reducers/book/book.action';

interface IFeedListProps {
  feeds: BookFeed[];
}

interface IStateProps {
  bookIds: string[];
}

interface IDispatchProps {
  onAddFeed(feed: BookFeed): void;
}

function _FeedList(props: IFeedListProps & IStateProps & IDispatchProps) {
  return (
    <View style={{ marginTop: 20 }}>
      {props.feeds.map(i => (
        <FeedItem
          isAdded={props.bookIds.findIndex(k => i.id === k) !== -1}
          onAddFeed={props.onAddFeed}
          feed={i}
        />
      ))}
    </View>
  );
}

function mapStateToProps(state: IState): IStateProps {
  return {
    bookIds: state.bookReducer.books.map(i => i.id),
  };
}

function mapDispatchToProps(dispatch: Dispatch<BookAction>): IDispatchProps {
  return {
    onAddFeed(feed: BookFeed): void {
      dispatch(new BookAdd(feed));
    },
  };
}

export const FeedList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_FeedList);
