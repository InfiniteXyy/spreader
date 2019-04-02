import React from 'react';

import {
  Caption,
  Card,
  GridRow,
  Image,
  Screen,
  Subtitle,
  TouchableOpacity,
  View
} from '@shoutem/ui';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { loadStore } from '../reducers/storeReducer';

class SpiderList extends React.Component {
  componentDidMount() {
    for (let store of this.props.stores) {
      console.log(store);
      this.props.refreshStore(store);
    }
  }

  renderRow = ({ item }) => {
    const cellViews = item.map((book, id) => {
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

    return (
      <GridRow style={{ flex: 1 }} columns={2}>
        {cellViews}
      </GridRow>
    );
  };

  render() {
    const groupedData = GridRow.groupByRows(this.props.spiders, 2, () => 1);
    return (
      <Screen>
        <FlatList data={groupedData} renderItem={this.renderRow} />
      </Screen>
    );
  }
}

const mapStateToProps = ({ storeReducer }) => ({
  spiders: storeReducer.spiders,
  stores: storeReducer.stores
});

const mapDispatchToProps = dispatch => ({
  refreshStore: store => dispatch(loadStore(store))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpiderList);
