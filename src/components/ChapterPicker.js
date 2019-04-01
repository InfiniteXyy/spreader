import React from 'react';
import Modal from 'react-native-modal';
import { Picker } from 'react-native';
import { getPageTitle, ios, range } from '../utils';
import { PAGE_LENGTH } from '../reducers/bookReducer';
import { Icon, Text, Touchable, View } from '@shoutem/ui';

export default class ChapterPicker extends React.Component {
  state = {
    sectionOpen: false
  };

  toggleSection = sectionOpen => () => {
    this.setState({ sectionOpen });
  };

  render() {
    const { page, onPageChange, reversed, maxLength } = this.props;
    let modalProps = {
      isVisible: this.state.sectionOpen,
      backdropOpacity: 0.24,
      animationIn: 'fadeIn',
      animationOut: 'fadeOut',
      onBackdropPress: this.toggleSection(false),
      style: {
        flex: 1,
        margin: 0,
        justifyContent: 'flex-end'
      }
    };
    let pageCount = Math.ceil(maxLength / PAGE_LENGTH);

    let data = reversed ? range(pageCount - 1, -1, -1) : range(0, pageCount);

    if (ios) {
      return (
        <View>
          <Touchable onPress={this.toggleSection(true)}>
            <View styleName="horizontal v-center">
              <Text styleName="bold">
                {getPageTitle(page, PAGE_LENGTH, maxLength, reversed)}
              </Text>
              <Icon name="drop-down" />
            </View>
          </Touchable>
          <Modal {...modalProps}>
            <Picker
              style={styles.picker}
              selectedValue={page.toString()}
              onValueChange={(itemValue, itemIndex) => onPageChange(itemValue)}
            >
              {data.map(i => {
                return (
                  <Picker.Item
                    key={i.toString()}
                    label={getPageTitle(i, PAGE_LENGTH, maxLength, reversed)}
                    value={i.toString()}
                  />
                );
              })}
            </Picker>
          </Modal>
        </View>
      );
    } else {
      return (
        <Picker
          style={styles.pickerAndroid}
          mode="dropdown"
          selectedValue={page.toString()}
          onValueChange={(itemValue, itemIndex) => onPageChange(itemValue)}
        >
          {data.map(i => {
            return (
              <Picker.Item
                key={i.toString()}
                label={getPageTitle(i, PAGE_LENGTH, maxLength, reversed)}
                value={i.toString()}
              />
            );
          })}
        </Picker>
      );
    }
  }
}

const styles = {
  picker: {
    backgroundColor: 'white',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  pickerAndroid: {
    height: 50,
    width: 150
  }
};
