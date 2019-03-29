import React, { Component } from 'react';
import {
  Button,
  Divider,
  Icon,
  ImageBackground,
  ListView,
  Row,
  Screen,
  Subtitle,
  Text,
  Tile,
  Title,
  Touchable,
  View
} from '@shoutem/ui';
import { getList } from '../spiders/SpiderPlatform';

class ChapterList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button onPress={() => navigation.goBack()}>
          <Icon name="left-arrow" />
        </Button>
      ),
      title: navigation.getParam('book').title
    };
  };

  constructor(props) {
    super(props);
    this.book = props.navigation.getParam('book');
    console.log(this.book);
  }

  state = {
    chapters: [],
    isLoading: true
  };

  componentDidMount(): void {
    this.load();
  }

  load = () => {
    this.setState({ isLoading: true });
    const listMethod = this.book.methods.getList;
    getList(listMethod.url, listMethod.query).then(chapters => {
      this.setState({ chapters, isLoading: false });
    });
  };

  render() {
    return (
      <Screen styleName="paper">
        <ListView
          style={{
            loadMoreSpinner: {
              backgroundColor: 'white'
            }
          }}
          renderHeader={this.renderHeader}
          onRefresh={this.load}
          loading={this.state.isLoading}
          data={this.state.chapters}
          renderRow={this.renderRow}
        />
      </Screen>
    );
  }

  renderHeader = () => {
    return (
      <View>
        <ImageBackground
          styleName="large-banner"
          source={{ uri: this.book.coverImg }}
        >
          <Tile>
            <Title styleName="md-gutter-bottom">{this.book.title}</Title>
            <Subtitle styleName="sm-gutter-horizontal">
              {this.book.author}
            </Subtitle>
          </Tile>
        </ImageBackground>
        <Divider styleName="line" />
      </View>
    );
  };

  renderRow = chapter => {
    return (
      <Touchable onPress={this.navigateChapter(chapter)}>
        <View styleName="v-center" style={styles.listItem}>
          <Text numberOfLines={1} style={styles.itemText}>
            {chapter.title}
          </Text>
        </View>
        <Divider styleName="line" />
      </Touchable>
    );
  };

  navigateChapter = chapter => () => {
    this.props.navigation.push('Chapter', { chapter, book: this.book });
  };
}

const styles = {
  listItem: {
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 20
  },
  itemText: {
    fontSize: 14
  }
};

export default ChapterList;
