import React from 'react';
import { View } from 'react-native';
import { FeedItem } from './FeedItem';
import { BookFeed } from '../../model/Feed';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { Dispatch } from 'redux';
import { BookAction, BookAdd, BookRemove } from '../../reducers/book/book.action';
import { SavedBook } from '../../model/Book';

interface IFeedListProps {
  feeds: BookFeed[];
}

interface IStateProps {
  books: SavedBook[];
}

interface IDispatchProps {
  onAddFeed(feed: BookFeed): void;
  onRemoveFeed(feed: BookFeed): void;
}

function _FeedList(props: IFeedListProps & IStateProps & IDispatchProps) {
  return (
    <View style={{ marginTop: 20 }}>
      {props.feeds.map((i) => {
        const isAdded = props.books.findIndex((k) => i.id === k.id) !== -1;
        return (
          <FeedItem
            key={i.id.toString()}
            isAdded={isAdded}
            onPressToggle={isAdded ? props.onRemoveFeed : props.onAddFeed}
            feed={i}
          />
        );
      })}
    </View>
  );
}

function mapStateToProps(state: IState): IStateProps {
  return {
    books: state.bookReducer.books,
  };
}

function mapDispatchToProps(dispatch: Dispatch<BookAction>): IDispatchProps {
  return {
    onAddFeed(feed: BookFeed): void {
      dispatch(new BookAdd(feed));
    },
    onRemoveFeed(feed: BookFeed): void {
      dispatch(new BookRemove(feed));
    },
  };
}

export const FeedList = connect(mapStateToProps, mapDispatchToProps)(_FeedList);
