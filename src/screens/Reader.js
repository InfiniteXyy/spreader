import React, { Component } from 'react';
import {
  Heading,
  Screen,
  ScrollView,
  Text,
  Spinner,
  Icon,
  Button,
  View
} from '@shoutem/ui';
import { getContent } from '../spiders/SpiderPlatform';
import Modal from 'react-native-modal';

class ReaderEditModal extends Component {
  render() {
    let modalProps = {
      isVisible: this.props.open,
      swipeDirection: 'down',
      onSwipe: this.props.onClose,
      backdropOpacity: 0.38,
      animationInTiming: 500,
      animationOutTiming: 450,
      onBackdropPress: this.props.onClose,
      style: {
        flex: 1,
        justifyContent: 'flex-end',
        margin: 0
      }
    };
    return (
      <Modal {...modalProps}>
        <View style={styles.editModal}>
        
        </View>
      </Modal>
    );
  }
}

export default class Chapter extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button onPress={() => navigation.goBack()}>
          <Icon name="left-arrow" />
        </Button>
      ),
      headerRight: (
        <Button onPress={navigation.getParam('toggleModal')}>
          <Icon name="sidebar" />
        </Button>
      )
    };
  };

  constructor(props) {
    super(props);
    this.book = props.navigation.getParam('book');
    this.chapter = props.navigation.getParam('chapter');
  }

  componentDidMount(): void {
    this.props.navigation.setParams({ toggleModal: this.toggleModal(true) });
    getContent(this.chapter.href, this.book.methods.getContent.query).then(
      contents => {
        this.setState({ contents, isLoading: false });
      }
    );
  }

  state = {
    style: {
      marginTop: 20,
      fontSize: 18,
      lineHeight: 34,
      color: 'black'
    },
    contents: [],
    isLoading: true,
    modalOpen: false
  };

  toggleModal = modalOpen => () => {
    this.setState({ modalOpen });
  };

  render() {
    return (
      <Screen styleName="paper" style={styles.root}>
        <ScrollView>
          <Heading style={styles.header}>{this.chapter.title}</Heading>
          {this.state.isLoading ? (
            <Spinner size="large" style={{ marginTop: 30 }} />
          ) : (
            this.renderContent()
          )}
        </ScrollView>
        <ReaderEditModal
          open={this.state.modalOpen}
          onClose={this.toggleModal(false)}
        />
      </Screen>
    );
  }

  renderContent = () => {
    return this.state.contents.map((i, index) => (
      <Text key={index} style={{ ...styles.content, ...this.state.style }}>
        {'\t' + i}
      </Text>
    ));
  };
}

const styles = {
  content: {
    paddingHorizontal: 20
  },
  header: {
    marginHorizontal: 20,
    marginTop: 30
  },
  editModal: {
    margin: 8,
    backgroundColor: 'white',
    height: 200,
    borderRadius: 8
  }
};
