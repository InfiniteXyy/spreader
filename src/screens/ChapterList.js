import React, { Component } from 'react';
import {
  Button,
  Divider,
  Icon,
  Image,
  Screen,
  Text,
  Touchable,
  View
} from '@shoutem/ui';

import { FlatList } from 'react-native';
import { getList } from '../spiders/SpiderPlatform';

const GAP = 100;

const Stack = { key: '-1' };

class ItemRow extends React.PureComponent {
  render() {
    return (
      <Touchable onPress={this.props.onPress}>
        <View styleName="v-center" style={styles.listItem}>
          <Text numberOfLines={1} style={styles.itemText}>
            {this.props.item.title}
          </Text>
        </View>
        <Divider styleName="line" />
      </Touchable>
    );
  }
}

class ChapterList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
      headerLeft: (
        <Button styleName="clear" onPress={() => navigation.goBack()}>
          <Icon name="left-arrow" />
        </Button>
      )
    };
  };

  constructor(props) {
    super(props);
    this.book = props.navigation.getParam('book');
    console.log(this.book);
  }

  state = {
    chapters: [],
    isLoading: true,
    isReversed: false,
    page: 0
  };

  componentDidMount(): void {
    this.load();
  }

  load = () => {
    this.setState({ isLoading: true });
    const listMethod = this.book.methods.getList;
    getList(listMethod).then(chapters => {
      this.setState({ chapters, isLoading: false });
    });
  };

  getRange = () => {
    let { page } = this.state;
    let start, end;
    start = page * GAP;
    end = page * GAP + GAP;
    return [start, end];
  };

  render() {
    let [start, end] = this.getRange();

    return (
      <Screen styleName="">
        <FlatList
          stickyHeaderIndices={[1]}
          ListHeaderComponent={this.renderHeader}
          onRefresh={this.load}
          refreshing={this.state.isLoading}
          data={[Stack, ...this.state.chapters.slice(start, end)]}
          renderItem={this.renderRow}
          maxToRenderPerBatch={20}
          getItemLayout={this.getItemLayout}
        />
      </Screen>
    );
  }

  renderHeader = () => {
    return (
      <View style={styles.headerContainer} styleName="horizontal v-start">
        <Image style={styles.coverImg} source={{ uri: this.book.coverImg }} />
        <View styleName="space-between stretch">
          <View>
            <Text style={styles.title}>{this.book.title}</Text>
            <Text style={styles.subtitle}>{this.book.author}</Text>
          </View>
          <Button styleName="secondary">
            <Text>继续阅读</Text>
          </Button>
        </View>
      </View>
    );
  };

  renderSection = () => {
    let [start, end] = this.getRange();
    let length = this.state.chapters.length;
    let indexStart = this.state.isReversed ? length - start : start + 1;
    let indexEnd = this.state.isReversed
      ? Math.max(1, length - end + 1)
      : Math.min(length, end);
    return (
      length > 0 && (
        <View
          style={styles.section}
          styleName="horizontal v-center space-between"
        >
          <Touchable
            onPress={() => {
              this.setState({ page: this.state.page + 1 });
            }}
          >
            <View styleName="horizontal v-center">
              <Text styleName="bold">{`第 ${indexStart} - ${indexEnd} 章`}</Text>
              <Icon name="drop-down" />
            </View>
          </Touchable>
          <View styleName="horizontal v-center">
            <Text style={{ color: '#9b9b9b' }}>{`共 ${length} 章`}</Text>
            <View styleName="sm-gutter-left">
              <Touchable onPress={this.toggleReverse}>
                <Text>{this.state.isReversed ? '逆序' : '顺序'}</Text>
              </Touchable>
            </View>
          </View>
        </View>
      )
    );
  };

  renderRow = ({ item }) => {
    if (!item.title) {
      return this.renderSection();
    } else {
      return <ItemRow item={item} onPress={this.navigateChapter(item)} />;
    }
  };

  navigateChapter = chapter => () => {
    this.props.navigation.push('Chapter', { chapter, book: this.book });
  };

  toggleReverse = () => {
    this.setState(prevState => ({
      ...prevState,
      isReversed: !prevState.isReversed,
      chapters: [...prevState.chapters.reverse()]
    }));
  };

  getItemLayout = (data, index) => ({
    length: styles.listItem.height,
    offset: styles.listItem.height * index,
    index
  });
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
  },
  coverImg: {
    height: 140,
    width: 100,
    borderRadius: 4,
    marginRight: 20
  },
  headerContainer: {
    backgroundColor: 'white',
    padding: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4a4a4a'
  },
  subtitle: {
    fontSize: 18
  },
  section: {
    backgroundColor: 'white',
    height: 36,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eeeeee'
  }
};

export default ChapterList;
