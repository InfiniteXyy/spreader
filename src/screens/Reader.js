import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StatusBar } from 'react-native';
import {
  Button,
  Heading,
  Icon,
  Screen,
  Spinner,
  Text,
  TouchableOpacity,
  View
} from '@shoutem/ui';
import { getContent } from '../spiders/SpiderPlatform';
import Modal from 'react-native-modal';
import { setTheme, ThemeNames } from '../reducers/appReducer';
import AnimatedHeader from '../components/AnimatedHeader';
import { statusBarOffset } from '../utils';
import { markAsRead } from '../reducers/bookReducer';

class ReaderEditModal extends Component {
  render() {
    const { handleColorTheme, dark } = this.props;
    let modalProps = {
      isVisible: this.props.open,
      backdropOpacity: 0.18,
      animationIn: 'fadeIn',
      animationOut: 'fadeOut',
      onBackdropPress: this.props.onClose,
      useNativeDriver: true,
      style: {
        flex: 1,
        margin: 0,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingTop: 80
      }
    };
    return (
      <Modal {...modalProps}>
        <StatusBar
          backgroundColor="rgba(0,0,0,0.18)"
          barStyle={dark ? 'light-content' : 'dark-content'}
        />
        <View style={styles.editModal}>
          <View styleName="horizontal">
            <Button styleName="full-width clear" onPress={() => {}}>
              <Text style={{ fontSize: 18, fontWeight: '300' }}>A</Text>
            </Button>
            <View style={styles.vDivider} />
            <Button styleName="full-width clear" onPress={() => {}}>
              <Text style={{ fontSize: 24 }}>A</Text>
            </Button>
          </View>
          <View style={styles.divider} />
          <View styleName="horizontal sm-gutter md-gutter-top md-gutter-bottom space-around">
            <TouchableOpacity onPress={handleColorTheme(ThemeNames.white)}>
              <View style={{ ...styles.oval, backgroundColor: 'white' }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleColorTheme(ThemeNames.gray)}>
              <View style={{ ...styles.oval, backgroundColor: '#8E8E8E' }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleColorTheme(ThemeNames.black)}>
              <View style={{ ...styles.oval, backgroundColor: 'black' }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleColorTheme(ThemeNames.yellow)}>
              <View
                style={{ ...styles.oval, backgroundColor: 'rgb(241,229,201)' }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

class Reader extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.book = props.navigation.getParam('book');
    this.chapter = props.navigation.getParam('chapter');
  }

  componentDidMount() {
    getContent(this.chapter.href, this.book.methods.getContent).then(
      contents => {
        this.setState({ contents, isLoading: false });
      }
    );
  }

  state = {
    contents: [],
    isLoading: true,
    modalOpen: false,
    isNavBarHidden: false
  };

  toggleModal = modalOpen => () => {
    this.setState({ modalOpen });
  };

  render() {
    const { theme } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={theme.root.backgroundColor}
          barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        />
        <Screen styleName="paper" style={{ ...styles.root, ...theme.root }}>
          <ScrollView
            style={{ marginTop: statusBarOffset() }}
            scrollEventThrottle={16}
            onScrollBeginDrag={this.onScrollBeginDrag}
            onScroll={this.handleScroll}
          >
            <Heading
              styleName="bold"
              style={{ ...styles.header, ...theme.title }}
            >
              {this.chapter.title}
            </Heading>
            {this.state.isLoading ? (
              <Spinner size="large" style={{ marginTop: 30 }} />
            ) : (
              this.renderContent()
            )}
          </ScrollView>
        </Screen>

        <AnimatedHeader
          goBack={this.handleBack}
          rightComponent={
            <Button styleName="clear" onPress={this.toggleModal(true)}>
              <Icon style={{ color: theme.content.color }} name="settings" />
            </Button>
          }
          visible={!this.state.isNavBarHidden}
          bgColor={this.props.theme.root.backgroundColor}
          tintColor={theme.content.color}
        />

        <ReaderEditModal
          dark={theme.mode === 'dark'}
          open={this.state.modalOpen}
          onClose={this.toggleModal(false)}
          handleColorTheme={this.props.onSelectTheme}
        />
      </View>
    );
  }

  onScrollBeginDrag = event => {
    this.scrollViewStartOffsetY = event.nativeEvent.contentOffset.y;
  };

  handleScroll = event => {
    if (
      !this.state.isNavBarHidden &&
      event.nativeEvent.contentOffset.y > this.scrollViewStartOffsetY
    ) {
      this.setState({ isNavBarHidden: true });
    } else if (
      this.state.isNavBarHidden &&
      event.nativeEvent.contentOffset.y < this.scrollViewStartOffsetY
    ) {
      this.setState({ isNavBarHidden: false });
    }
  };

  renderContent = () => {
    return this.state.contents.map((i, index) => (
      <Text
        key={index}
        style={{
          ...styles.content,
          ...this.props.theme.content
        }}
      >
        {'        ' + i}
      </Text>
    ));
  };

  handleBack = () => {
    this.props.navigation.goBack();
    this.props.markAsRead(this.book, this.chapter);
  };
}

const styles = {
  content: {
    fontSize: 18,
    lineHeight: 34,
    paddingHorizontal: 20,
    marginTop: 12
  },
  root: {},
  header: {
    marginHorizontal: 20,
    marginTop: 60,
    lineHeight: 30
  },
  editModal: {
    marginHorizontal: 16,
    backgroundColor: 'white',
    width: 200,
    borderRadius: 8
  },
  divider: {
    backgroundColor: '#eaeaea',
    height: 1
  },
  oval: {
    borderRadius: 35,
    width: 35,
    height: 35,
    backgroundColor: 'black',
    borderColor: '#CACACA',
    borderWidth: 0.5
  },
  vDivider: {
    width: 1,
    height: 56,
    backgroundColor: '#eaeaea'
  }
};

const mapStateToProps = ({ appReducer }) => ({
  theme: appReducer.theme
});

const mapDispatchToProps = dispatch => ({
  onSelectTheme: themeName => () => dispatch(setTheme(themeName)),
  markAsRead: (book, chapter) => dispatch(markAsRead(book, chapter))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reader);
