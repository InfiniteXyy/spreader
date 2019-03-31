import React, { Component } from 'react';
import {
  Caption,
  Card,
  Divider,
  DropDownMenu,
  GridRow,
  Image,
  ImageBackground,
  ListView,
  Row,
  Screen,
  Subtitle,
  Tile,
  Title,
  Touchable,
  TouchableOpacity,
  View
} from '@shoutem/ui';
import Setting from './Setting';

function getBooks() {
  return require('../../assets/data/books.json');
}

const ScreenWrapper = props => {
  let { visible, children } = props;
  return (
    <View style={{ display: !visible ? 'none' : '', flex: 1 }}>{children}</View>
  );
};
class HomeList extends React.PureComponent {
  render() {
    let { books } = this.props;
    return (
      <Screen styleName="paper">
        <ListView data={books} renderRow={this.renderRow} />
      </Screen>
    );
  }

  renderRow = book => {
    return (
      <View>
        <Touchable onPress={this.props.navigateBook(book)}>
          <Row>
            <Image
              styleName="small rounded-corners"
              source={{ uri: book.coverImg }}
            />
            <View styleName="vertical stretch space-between">
              <Subtitle>{book.title}</Subtitle>
              <Caption>{book.author}</Caption>
            </View>
          </Row>
        </Touchable>
        <Divider styleName="line" />
      </View>
    );
  };
}

class SpiderList extends React.Component {
  renderRow = (rowData, sectionId, index) => {
    if (index === '0') {
      return (
        <TouchableOpacity key={index}>
          <ImageBackground
            styleName="large"
            source={{ uri: rowData[0].coverImg }}
          >
            <Tile>
              <Title styleName="md-gutter-bottom">{rowData[0].title}</Title>
              <Subtitle styleName="sm-gutter-horizontal">
                {rowData[0].author}
              </Subtitle>
            </Tile>
          </ImageBackground>
          <Divider styleName="line" />
        </TouchableOpacity>
      );
    }

    const cellViews = rowData.map((book, id) => {
      return (
        <TouchableOpacity key={id} styleName="flexible">
          <Card styleName="flexible">
            <Image styleName="medium-wide" source={{ uri: book.coverImg }} />
            <View styleName="content">
              <Subtitle numberOfLines={3}>{book.title}</Subtitle>
              <View styleName="horizontal">
                <Caption styleName="collapsible" numberOfLines={2}>
                  {book.author}
                </Caption>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });

    return <GridRow columns={2}>{cellViews}</GridRow>;
  };

  render() {
    const books = getBooks();
    let isFirstBook = true;
    const groupedData = GridRow.groupByRows(books, 2, () => {
      if (isFirstBook) {
        isFirstBook = false;
        return 2;
      }
      return 1;
    });
    return (
      <Screen styleName="paper">
        <ListView data={groupedData} renderRow={this.renderRow} />
      </Screen>
    );
  }
}

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    let options = [
      { index: 0, title: '列表' },
      { index: 1, title: '书虫' },
      { index: 2, title: '设置' }
    ];
    let curIndex = navigation.getParam('screenIndex', 0);
    return {
      title: '掌上书虫',
      headerRight: (
        <DropDownMenu
          options={options}
          onOptionSelected={navigation.getParam('onSelectScreen')}
          selectedOption={options[curIndex]}
          titleProperty="title"
          valueProperty="index"
        />
      )
    };
  };

  constructor(props) {
    super(props);
    props.navigation.setParams({ onSelectScreen: this.onSelectScreen });
  }

  state = {
    screenIndex: 0
  };

  render() {
    let { screenIndex } = this.state;

    return (
      <Screen styleName="paper">
        <ScreenWrapper visible={screenIndex === 0}>
          <HomeList books={getBooks()} navigateBook={this.navigateBook} />
        </ScreenWrapper>
        <ScreenWrapper visible={screenIndex === 1}>
          <SpiderList />
        </ScreenWrapper>
        <ScreenWrapper visible={screenIndex === 2}>
          <Setting />
        </ScreenWrapper>
      </Screen>
    );
  }

  navigateBook = book => () => {
    this.props.navigation.push('Book', { book });
  };

  onSelectScreen = selection => {
    this.setState({ screenIndex: selection.index });
    this.props.navigation.setParams({ screenIndex: selection.index });
  };
}

export default Home;
