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
import Modal from 'react-native-modal';
import { FlatList, Picker } from 'react-native';
import { getList } from '../spiders/SpiderPlatform';
import { createPages } from '../utils';

const GAP = 50;

const Stack = { key: '-1', title: '-1' };

const getPageTitle = (start, end, reversed) => {
  let startIndex, endIndex;
  if (!reversed) {
    startIndex = start + 1;
    endIndex = end;
  } else {
    startIndex = end;
    endIndex = start + 1;
  }
  return `第 ${startIndex} - ${endIndex} 章`;
};

class ChapterPicker extends React.PureComponent {
  render() {
    const {
      page,
      onPageChange,
      open,
      onClose,
      pageList,
      reversed
    } = this.props;
    let modalProps = {
      isVisible: open,
      backdropOpacity: 0.18,
      onBackdropPress: onClose,
      style: {
        flex: 1,
        margin: 0,
        justifyContent: 'flex-end'
      }
    };

    let data = reversed ? [...pageList].reverse() : pageList;

    if (!pageList[page]) return <View />;

    return (
      <Modal {...modalProps}>
        <Picker
          style={styles.picker}
          selectedValue={pageList[page].toString()}
          onValueChange={(itemValue, itemIndex) =>
            onPageChange(reversed ? pageList.length - itemIndex - 1 : itemIndex)
          }
        >
          {data.map(i => {
            let [start, end] = i;
            return (
              <Picker.Item
                key={i.toString()}
                label={getPageTitle(start, end, reversed)}
                value={i.toString()}
              />
            );
          })}
        </Picker>
      </Modal>
    );
  }
}

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
  }

  state = {
    chapters: [],
    isLoading: true,
    isReversed: false,
    page: 0,
    pages: [],
    selectorOpen: false
  };

  componentDidMount(): void {
    this.load();
  }

  load = () => {
    this.setState({ isLoading: true });
    const listMethod = this.book.methods.getList;
    getList(listMethod).then(chapters => {
      this.setState({
        chapters,
        isLoading: false,
        pages: createPages(chapters.length, GAP)
      });
    });
  };

  render() {
    const { pages, page, chapters, isReversed } = this.state;
    let [start, end] = pages[page] || [0, 0];
    let data = chapters.slice(start, end);
    if (isReversed) data.reverse();
    data.unshift(Stack);

    return (
      <Screen styleName="">
        <FlatList
          keyExtractor={(item, index) => item.title}
          stickyHeaderIndices={[1]}
          ListHeaderComponent={this.renderHeader}
          onRefresh={this.load}
          refreshing={this.state.isLoading}
          data={data}
          renderItem={this.renderRow}
          maxToRenderPerBatch={20}
          getItemLayout={this.getItemLayout}
        />
        <ChapterPicker
          page={this.state.page}
          onPageChange={this.togglePage}
          open={this.state.selectorOpen}
          onClose={this.toggleSelector(false)}
          pageList={this.state.pages}
          reversed={this.state.isReversed}
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
          <View>
            <View styleName="horizontal">
              <Text styleName="bold">上次读到：</Text>
              <Text>第二章 情不自禁</Text>
            </View>
            <View styleName="horizontal">
              <Text styleName="bold">最近更新：</Text>
              <Text>第1023章 情不自禁</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderSection = () => {
    let {
      chapters: { length },
      pages,
      page,
      isReversed
    } = this.state;
    if (length < 1) return;
    let [start, end] = pages[page];

    return (
      <View
        style={styles.section}
        styleName="horizontal v-center space-between"
      >
        <Touchable onPress={this.toggleSelector(true)}>
          <View styleName="horizontal v-center">
            <Text styleName="bold">{getPageTitle(start, end, isReversed)}</Text>
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
    );
  };

  renderRow = ({ item }) => {
    if (!item.href) {
      return this.renderSection();
    } else {
      return <ItemRow item={item} onPress={this.navigateChapter(item)} />;
    }
  };

  navigateChapter = chapter => () => {
    this.props.navigation.push('Chapter', { chapter, book: this.book });
  };

  toggleReverse = () => {
    this.setState(prevState => {
      const {
        isReversed,
        pages: { length }
      } = prevState;
      return {
        ...prevState,
        isReversed: !isReversed,
        page: !isReversed ? length - 1 : 0
      };
    });
  };

  toggleSelector = selectorOpen => () => {
    this.setState({ selectorOpen });
  };

  togglePage = page => {
    this.setState({ page });
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
  },
  picker: {
    backgroundColor: 'white',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  }
};

export default ChapterList;
