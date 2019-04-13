import { Image, Row, Switch, Text, Title, View } from '@shoutem/ui'
import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { statusBarOffset } from '../utils'
import AnimatedHeader from '../components/AnimatedHeader'
import { darkBg, tintColor, tintColorLight } from '../theme'
import { toggleStore } from '../reducers/storeReducer'

const StoreRow = ({ store, toggleStore }) => (
  <Row>
    <Image
      styleName="small rounded-corners"
      source={{
        uri: store.coverImg
      }}
    />
    <View styleName="vertical stretch space-between">
      <Title style={{ fontSize: 16 }}>{store.title}</Title>
      <View styleName="horizontal space-between">
        <Text style={{ fontSize: 12 }}>
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
  render() {
    let { dark } = this.props;
    return (
      <View>
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
              store={i}
              key={index}
              toggleStore={this.props.toggleStore}
            />
          ))}
        </ScrollView>
      </View>
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
