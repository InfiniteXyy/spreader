import React, { Component } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  Button,
  Heading,
  Screen,
  ScrollView,
  Spinner,
  Text,
  Touchable,
  View
} from '@shoutem/ui';
import { getContent } from '../spiders/SpiderPlatform';
import Modal from 'react-native-modal';
import { setTheme, ThemeNames } from '../reducers/appReducer';
import AnimatedHeader from '../components/AnimatedHeader';
import { ios } from '../utils';

class ReaderEditModal extends Component {
  render() {
    const { handleColorTheme } = this.props;
    let modalProps = {
      isVisible: this.props.open,
      backdropOpacity: 0.18,
      animationIn: 'fadeIn',
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
            <Touchable onPress={handleColorTheme(ThemeNames.white)}>
              <View style={{ ...styles.oval, backgroundColor: 'white' }} />
            </Touchable>
            <Touchable onPress={handleColorTheme(ThemeNames.gray)}>
              <View style={{ ...styles.oval, backgroundColor: '#8E8E8E' }} />
            </Touchable>
            <Touchable onPress={handleColorTheme(ThemeNames.black)}>
              <View style={{ ...styles.oval, backgroundColor: 'black' }} />
            </Touchable>
            <Touchable onPress={handleColorTheme(ThemeNames.yellow)}>
              <View
                style={{ ...styles.oval, backgroundColor: 'rgb(241,229,201)' }}
              />
            </Touchable>
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
    modalOpen: false
  };

  toggleModal = modalOpen => () => {
    this.setState({ modalOpen });
  };

  render() {
    const { theme } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Screen styleName="paper" style={{ ...styles.root, ...theme.root }}>
          <ScrollView style={{ marginTop: ios ? 20 : 0 }}>
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
          goBack={() => this.props.navigation.goBack()}
          openModal={this.toggleModal(true)}
        />

        <ReaderEditModal
          open={this.state.modalOpen}
          onClose={this.toggleModal(false)}
          handleColorTheme={this.props.onSelectTheme}
        />
      </View>
    );
  }

  renderContent = () => {
    return this.state.contents.map((i, index) => (
      <Text
        key={index}
        style={{
          ...styles.content,
          ...this.props.theme.content
        }}
      >
        {'\t' + i}
      </Text>
    ));
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
  onSelectTheme: themeName => () => dispatch(setTheme(themeName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reader);
