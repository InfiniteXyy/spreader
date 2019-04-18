import {
  Image,
  Row,
  Screen,
  Switch,
  Text,
  Title,
  View,
  Divider
} from '@shoutem/ui';
import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { statusBarOffset } from '../utils';
import AnimatedHeader from '../components/AnimatedHeader';
import { darkBg, tintColor, tintColorLight } from '../theme';
import { toggleStore } from '../reducers/storeReducer';
import classNames from 'classnames';

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
    <Divider styleName="line"> </Divider>
  </Row>
);

class AllStores extends React.Component {
  render() {
    let { dark } = this.props;
    return (
      <Screen styleName={classNames({ dark: this.props.dark })}>
        <AnimatedHeader
          goBack={this.props.navigation.goBack}
          visible={true}
          rightComponent={null}
          bgColor={dark ? darkBg : '#fff'}
          tintColor={dark ? tintColorLight : tintColor}
        />
        <ScrollView style={{ marginTop: statusBarOffset(56), height: '100%' }}>
          {this.props.stores.map((i, index) => (
            <StoreRow
              dark={this.props.dark}
              store={i}
              key={index}
              toggleStore={this.props.toggleStore}
            />
          ))}
        </ScrollView>
      </Screen>
    );
  }
}

const mapStateToProps = ({ storeReducer, appReducer: { darkMode } }) => ({
  stores: storeReducer.stores,
  dark: darkMode
});

const mapDispatchToProps = dispatch => ({
  toggleStore: (store, visible) => dispatch(toggleStore(store, visible))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllStores);
