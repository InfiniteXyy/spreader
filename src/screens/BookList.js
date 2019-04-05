import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import {
  Button,
  Divider,
  Icon,
  Image,
  Row,
  Screen,
  Spinner,
  Subtitle,
  Text,
  Title,
  Touchable,
  View
} from '@shoutem/ui';
import { ScrollView } from 'react-native';
import { loadChapters } from '../reducers/bookReducer';
import HomeTitle from '../components/HomeTitle';
import { statusBarOffset } from '../utils';

class BookList extends Component {
  componentDidMount() {
    this.props.books.forEach(this.props.onLoad);
  }

  render() {
    return (
      <Screen styleName={classNames({ dark: this.props.darkMode })}>
        <ScrollView style={{ marginTop: statusBarOffset() }}>
          <HomeTitle title="列表" />
          {this.props.books.map(book => this.renderRow(book))}
        </ScrollView>
      </Screen>
    );
  }

  renderRow = item => {
    let latestTitle = '暂无内容';
    if (item.chapters && item.chapters.length !== 0) {
      latestTitle = item.chapters[item.chapters.length - 1].title;
    }
    let dark = this.props.darkMode;
    return (
      <Touchable id={item.id} onPress={this.navigateBook(item)}>
        <Row styleName={classNames({ dark })}>
          <Image
            styleName="rounded-corners"
            style={{ width: 80, height: 110 }}
            source={{ uri: item.coverImg }}
          />
          <View styleName="vertical stretch space-between">
            <View>
              <Title styleName={classNames('bold', { dark })}>
                {item.title}
              </Title>
              <Subtitle>{item.author}</Subtitle>
            </View>
            <View styleName="vertical v-end">
              <Text
                styleName={classNames('bold', { dark })}
                style={{ marginBottom: 6 }}
              >
                最新章节
              </Text>
              <Text style={{ color: 'tomato' }} numberOfLines={1}>
                {latestTitle}
              </Text>
            </View>
          </View>
          {item.isFetching ? (
            <Button styleName="right-icon">
              <Spinner />
            </Button>
          ) : (
            <Icon styleName="disclosure" name="right-arrow" />
          )}
        </Row>
        <Divider styleName={classNames('line', { dark })} />
      </Touchable>
    );
  };

  navigateBook = book => () => {
    this.props.navigation.navigate('Book', { bookId: book.id });
  };
}

const mapStateToProps = ({ bookReducer, appReducer: { darkMode } }) => ({
  darkMode,
  books: bookReducer.books
});

const mapDispatchToProps = dispatch => ({
  onLoad: book => dispatch(loadChapters(book))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookList);
