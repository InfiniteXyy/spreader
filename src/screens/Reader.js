import React, { Component } from 'react';
import {
  Button,
  Heading,
  Icon,
  Screen,
  ScrollView,
  Spinner,
  Text,
  Touchable,
  View
} from '@shoutem/ui';
import { getContent } from '../spiders/SpiderPlatform';
import Modal from 'react-native-modal';
import { ReaderThemes } from '../App';

class ReaderEditModal extends Component {
  render() {
    const { addFontSize, handleColorTheme } = this.props;
    let modalProps = {
      isVisible: this.props.open,
      backdropOpacity: 0.18,
      animationIn: 'fadeIn',
      animationInTiming: 100,
      animationOut: 'fadeOut',
      onBackdropPress: this.props.onClose,
      style: {
        flex: 1,
        margin: 0,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingTop: 60
      }
    };
    return (
      <Modal {...modalProps}>
        <View style={styles.editModal}>
          <View styleName="horizontal">
            <Button styleName="full-width clear" onPress={addFontSize(false)}>
              <Text style={{ fontSize: 18, fontWeight: '300' }}>A</Text>
            </Button>
            <View style={styles.vDivider} />
            <Button styleName="full-width clear" onPress={addFontSize(true)}>
              <Text style={{ fontSize: 24 }}>A</Text>
            </Button>
          </View>
          <View style={styles.divider} />
          <View styleName="horizontal sm-gutter md-gutter-top md-gutter-bottom space-around">
            <Touchable onPress={handleColorTheme(ReaderThemes.theme1)}>
              <View style={{ ...styles.oval, backgroundColor: 'white' }} />
            </Touchable>
            <Touchable onPress={handleColorTheme(ReaderThemes.theme2)}>
              <View style={{ ...styles.oval, backgroundColor: '#8E8E8E' }} />
            </Touchable>
            <View style={{ ...styles.oval, backgroundColor: 'black' }} />
            <View style={{ ...styles.oval, backgroundColor: '#FFF6F6' }} />
          </View>
        </View>
      </Modal>
    );
  }
}

export default class Chapter extends Component {
  static navigationOptions = ({ navigation }) => {
    let bgColor = navigation.getParam('backgroundColor', 'white');
    let tintColor = navigation.getParam('tintColor', 'black');
    return {
      headerLeft: (
        <Button styleName="clear" onPress={() => navigation.goBack()}>
          <Icon style={{ color: tintColor }} name="left-arrow" />
        </Button>
      ),
      headerRight: (
        <Button styleName="clear" onPress={navigation.getParam('toggleModal')}>
          <Icon style={{ color: tintColor }} name="settings" />
        </Button>
      ),
      headerStyle: {
        backgroundColor: bgColor,
        borderBottomWidth: 0
      }
    };
  };

  constructor(props) {
    super(props);
    this.book = props.navigation.getParam('book');
    this.chapter = props.navigation.getParam('chapter');
  }

  componentDidMount(): void {
    this.props.navigation.setParams({ toggleModal: this.toggleModal(true) });
    getContent(this.chapter.href, this.book.methods.getContent).then(
      contents => {
        this.setState({ contents, isLoading: false });
      }
    );
  }

  state = {
    style: {
      marginTop: 20,
      fontSize: 18,
      lineHeight: 34
    },
    colorTheme: ReaderThemes.theme1,
    contents: [],
    isLoading: true,
    modalOpen: false
  };

  toggleModal = modalOpen => () => {
    this.setState({ modalOpen });
  };

  render() {
    const { colorTheme } = this.state;
    return (
      <Screen styleName="paper" style={{ ...styles.root, ...colorTheme.root }}>
        <ScrollView>
          <Heading
            styleName="bold"
            style={{ ...styles.header, ...colorTheme.title }}
          >
            {this.chapter.title}
          </Heading>
          {this.state.isLoading ? (
            <Spinner size="large" style={{ marginTop: 30 }} />
          ) : (
            this.renderContent()
          )}
        </ScrollView>
        <ReaderEditModal
          open={this.state.modalOpen}
          onClose={this.toggleModal(false)}
          addFontSize={this.addFontSize}
          handleColorTheme={this.handleColorTheme}
        />
      </Screen>
    );
  }

  addFontSize = add => () => {
    this.setState(prevState => {
      return {
        ...prevState,
        style: {
          ...prevState.style,
          fontSize: prevState.style.fontSize + (add ? 1 : -1),
          lineHeight: prevState.style.lineHeight + (add ? 2 : -2)
        }
      };
    });
  };

  handleColorTheme = colorTheme => () => {
    this.setState({ colorTheme });
    this.props.navigation.setParams({
      tintColor: colorTheme.content.color,
      backgroundColor: colorTheme.root.backgroundColor
    });
  };

  renderContent = () => {
    return this.state.contents.map((i, index) => (
      <Text
        key={index}
        style={{
          ...styles.content,
          ...this.state.style,
          ...this.state.colorTheme.content
        }}
      >
        {'\t' + i}
      </Text>
    ));
  };
}

const styles = {
  content: {
    paddingHorizontal: 20
  },
  root: {},
  header: {
    marginHorizontal: 20,
    marginTop: 16,
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
