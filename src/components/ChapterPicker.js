import React from 'react';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { Picker } from 'react-native';
import { getPageTitle, ios, range } from '../utils';
import { PAGE_LENGTH } from '../reducers/bookReducer';
import { Icon, Title, Touchable, View } from '@shoutem/ui';
import classNames from 'classnames';
import { darkBg, primaryText, primaryTextLight } from '../theme';

class ChapterPicker extends React.Component {
  state = {
    sectionOpen: false
  };

  toggleSection = sectionOpen => () => {
    this.setState({ sectionOpen });
  };

  render() {
    const { page, onPageChange, reversed, maxLength, dark } = this.props;
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
              <Title
                style={{ fontSize: 15, lineHeight: 18 }}
                styleName={classNames('bold', { dark })}
              >
                {getPageTitle(page, PAGE_LENGTH, maxLength, reversed)}
              </Title>
              <Icon
                styleName={classNames({ dark })}
                name="drop-down"
                style={styles.icon}
              />
            </View>
          </Touchable>
          <Modal {...modalProps}>
            <View
              style={{
                ...styles.picker,
                backgroundColor: dark ? darkBg : '#fff'
              }}
            >
              <Picker
                selectedValue={page.toString()}
                onValueChange={(itemValue, itemIndex) =>
                  onPageChange(itemValue)
                }
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
            </View>
          </Modal>
        </View>
      );
    } else {
      return (
        <View styleName="horizontal v-center">
          <Icon name="drop-down" style={styles.icon} />
          <Picker
            ref={i => (this.picker = i)}
            prompt="目录"
            style={{
              ...styles.pickerAndroid,
              backgroundColor: dark ? darkBg : '#fff'
            }}
            mode="dropdown"
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
        </View>
      );
    }
  }
}

export default connect(({ appReducer: { darkMode } }) => ({ dark: darkMode }))(
  ChapterPicker
);

const styles = {
  picker: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  pickerAndroid: {
    width: 200,
    backgroundColor: 'transparent'
  },
  icon: {
    color: '#757575',
    marginRight: 0
  }
};
