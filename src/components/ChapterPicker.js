import React from 'react';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { Picker, StatusBar } from 'react-native';
import { getPageTitle, ios, range } from '../utils';
import { PAGE_LENGTH } from '../reducers/bookReducer';
import { Icon, Spinner, Text, Touchable, View } from '@shoutem/ui';
import classNames from 'classnames';
import {
  darkBg,
  primaryText,
  primaryTextLight,
  secondaryText,
  secondaryTextLight
} from '../theme';
import { WheelPicker } from 'react-native-wheel-picker-android';

class ChapterPicker extends React.Component {
  state = {
    sectionOpen: false
  };

  toggleSection = sectionOpen => () => {
    this.setState({ sectionOpen });
  };

  visualizePicker = () => {
    const { page, onPageChange, reversed, maxLength, dark } = this.props;

    let pageCount = Math.ceil(maxLength / PAGE_LENGTH);

    let data = reversed ? range(pageCount - 1, -1, -1) : range(0, pageCount);

    if (ios) {
      return (
        <Picker
          selectedValue={page.toString()}
          onValueChange={(itemValue, itemIndex) => onPageChange(itemValue)}
        >
          {data.map(i => {
            return (
              <Picker.Item
                color={dark ? primaryTextLight : primaryText}
                key={i.toString()}
                label={getPageTitle(i, PAGE_LENGTH, maxLength, reversed)}
                value={i.toString()}
              />
            );
          })}
        </Picker>
      );
    } else {
      return (
        <WheelPicker
          selectedItem={reversed ? pageCount - page - 1 : page}
          data={data.map(i =>
            getPageTitle(i, PAGE_LENGTH, maxLength, reversed)
          )}
          itemTextColor={dark ? secondaryTextLight : secondaryText}
          selectedItemTextColor={dark ? primaryTextLight : primaryText}
          indicatorWidth={0.5}
          selectedItemTextSize={20}
          onItemSelected={itemValue =>
            onPageChange(reversed ? pageCount - itemValue - 1 : itemValue)
          }
        />
      );
    }
  };

  render() {
    const { page, reversed, maxLength, dark } = this.props;
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
      },
      useNativeDriver: true
    };

    let pickerStyle = {
      justifyContent: 'center',
      ...styles.picker,
      backgroundColor: dark ? darkBg : '#fff'
    };

    if (!ios) pickerStyle.alignItems = 'center';

    return (
      <View>
        <Touchable onPress={this.toggleSection(true)}>
          <View styleName="horizontal v-center">
            <Text styleName={classNames('bold', { dark })}>
              {getPageTitle(page, PAGE_LENGTH, maxLength, reversed)}
            </Text>
            <Icon
              styleName={classNames({ dark })}
              name="drop-down"
              style={styles.icon}
            />
          </View>
        </Touchable>
        <Modal {...modalProps}>
          <StatusBar
            backgroundColor="rgba(0,0,0,0.24)"
            barStyle={dark ? 'light-content' : 'dark-content'}
          />
          <View style={pickerStyle}>{this.visualizePicker()}</View>
        </Modal>
      </View>
    );
  }
}

export default connect(({ appReducer: { darkMode } }) => ({ dark: darkMode }))(
  ChapterPicker
);

const styles = {
  picker: {
    height: 200,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16
  },
  icon: {
    color: '#757575',
    marginRight: 0
  }
};
