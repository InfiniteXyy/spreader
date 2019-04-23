import {
  Button,
  Divider,
  Icon,
  Image,
  Row,
  Screen,
  Switch,
  Text,
  TextInput,
  Title,
  View,
  Touchable,
  Caption,
  Spinner
} from '@shoutem/ui';
import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { statusBarOffset } from '../utils';
import AnimatedHeader from '../components/AnimatedHeader';
import {
  darkBg,
  primaryText,
  primaryTextLight,
  tintColor,
  tintColorLight
} from '../theme';
import { addStore, toggleStore } from '../reducers/storeReducer';
import classNames from 'classnames';
import Modal from 'react-native-modal';
import agent from '../agent';

const StoreRow = ({ store, toggleStore, dark }) => (
  <Row styleName={classNames({ dark })}>
    <Image
      styleName="small rounded-corners"
      source={{
        uri: store.coverImg
      }}
    />
    <View styleName="vertical stretch space-between">
      <Title styleName={classNames({ dark })} style={{ fontSize: 16 }}>
        {store.title}
      </Title>
      <View styleName="horizontal space-between">
        <Text styleName={classNames({ dark })} style={{ fontSize: 12 }}>
          {store.spiders.length === 0
            ? `暂未读取`
            : `${store.spiders.length} 本小说`}
        </Text>
      </View>
    </View>
    <Switch
      value={!!store.visible}
      onValueChange={value => toggleStore(store, value)}
      styleName="right-icon"
    />
  </Row>
);

class AllStores extends React.Component {
  state = {
    dialogOpen: false
  };
  toggleAddDialog = type => () => {
    this.setState({ dialogOpen: type });
  };

  render() {
    let { dark, stores } = this.props;
    return (
      <Screen styleName={classNames({ dark: this.props.dark })}>
        <AnimatedHeader
          goBack={this.props.navigation.goBack}
          visible={true}
          rightComponent={
            <Button styleName="clear" onPress={this.toggleAddDialog(true)}>
              <Icon name="plus-button" styleName={classNames({ dark })} />
            </Button>
          }
          bgColor={dark ? darkBg : '#fff'}
          tintColor={dark ? tintColorLight : tintColor}
        />
        <ScrollView style={{ marginTop: statusBarOffset(56), height: '100%' }}>
          {stores.map((i, index) => (
            <React.Fragment key={index}>
              <StoreRow
                dark={this.props.dark}
                store={i}
                toggleStore={this.props.toggleStore}
              />
              <Divider styleName={classNames('line', { dark })} />
            </React.Fragment>
          ))}
        </ScrollView>
        <AddStoreDialog
          addStore={this.props.addStore}
          dark={dark}
          open={this.state.dialogOpen}
          onClose={this.toggleAddDialog(false)}
        />
      </Screen>
    );
  }
}

function testValidUrl(input) {
  return /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/.test(
    input
  );
}

class AddStoreDialog extends React.Component {
  state = {
    url: '',
    errorMsg: '',
    store: null,
    isFetching: false
  };

  handleValueChange = text => {
    this.setState({
      url: text,
      errorMsg: ''
    });
  };

  onClick = () => {
    if (this.state.store) {
      this.props.addStore(this.state.store, this.state.url);
    } else {
      this.testUrl();
    }
  };
  testUrl = () => {
    const { url } = this.state;
    if (!testValidUrl(url)) {
      this.setState({ errorMsg: '请输入正确的url' });
    } else {
      this.setState({ isFetching: true });
      agent
        .get(url)
        .then(res => {
          let store = JSON.parse(res);
          if (store.spiders instanceof Array) {
            this.setState({ store });
            console.log(store);
          }
        })
        .catch(e => {
          this.setState({ errorMsg: '无法获取仓库信息' });
        })
        .finally(() => {
          this.setState({ isFetching: false });
        });
    }
  };

  render() {
    const { open, dark, onClose } = this.props;
    const { store, errorMsg } = this.state;
    let modalProps = {
      isVisible: open,
      onModalHide: () => this.setState({ url: '', store: null, errorMsg: '' }),
      backdropOpacity: 0.18,
      animationIn: 'fadeIn',
      animationOut: 'fadeOut',
      useNativeDriver: true,
      style: {
        flex: 1,
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
    };

    return (
      <Modal {...modalProps}>
        <View style={styles.modalPage}>
          <View styleName="v-center space-between horizontal">
            <Text style={styles.modalTitle} styleNames={classNames({ dark })}>
              添加仓库
            </Text>
            <Icon onPress={onClose} name="close" />
          </View>

          <View style={{ marginVertical: 20 }}>
            <TextInput
              value={this.state.url}
              onChangeText={this.handleValueChange}
              placeholder="请输入仓库的url"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              style={{
                paddingVertical: 0,
                height: 40,
                backgroundColor: 'rgba(0,0,0,0.03)',
                selectionColor: dark ? primaryTextLight : primaryText,
                color: this.props.darkMode ? primaryTextLight : primaryText
              }}
            />
          </View>
          {!store ? (
            <Text style={styles.errorMsg}>{errorMsg}</Text>
          ) : (
            <View>
              <View styleName="horizontal v-center space-between">
                <Text styleName="bold">{store.title}</Text>
                <Text styleName="secondary">
                  {store.spiders.length + '个爬虫'}
                </Text>
              </View>
              {store.spiders.slice(0, 3).map((i, index) => (
                <View
                  styleName="horizontal stretch v-center md-gutter-top"
                  key={index}
                >
                  <Image style={styles.img} source={{ uri: i.coverImg }} />
                  <View styleName="vertical stretch space-between">
                    <Text>{i.title}</Text>
                    <Caption>{i.author}</Caption>
                  </View>
                </View>
              ))}
            </View>
          )}
          <View
            styleName="h-center horizontal v-center md-gutter-top"
            style={{ height: 50 }}
          >
            {this.state.isFetching ? (
              <Spinner />
            ) : (
              <Touchable onPress={this.onClick}>
                <View
                  style={styles.btn}
                  styleName="horizontal v-center h-center"
                >
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 13
                    }}
                  >
                    {store ? '加入' : '验证'}
                  </Text>
                </View>
              </Touchable>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = {
  btn: {
    backgroundColor: 'gray',
    height: 30,
    width: '100%'
  },
  modalPage: {
    width: 300,
    padding: 20,
    backgroundColor: 'white'
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20
  },
  errorMsg: {
    lineHeight: 16,
    fontSize: 13,
    color: 'red'
  },
  img: {
    height: 45,
    width: 45,
    marginRight: 20,
    borderRadius: 4
  }
};

const mapStateToProps = ({ storeReducer, appReducer: { darkMode } }) => ({
  stores: storeReducer.stores,
  dark: darkMode
});

const mapDispatchToProps = dispatch => ({
  toggleStore: (store, visible) => dispatch(toggleStore(store, visible)),
  addStore: (store, storeHref) => dispatch(addStore(store, storeHref))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllStores);
