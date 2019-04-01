import React from 'react';
import Modal from 'react-native-modal';
import { Picker } from 'react-native';
import { getPageTitle, range } from '../utils';
import { PAGE_LENGTH } from '../reducers/bookReducer';

export default class ChapterPicker extends React.PureComponent {
  render() {
    const {
      page,
      onPageChange,
      open,
      onClose,
      reversed,
      maxLength
    } = this.props;
    let modalProps = {
      isVisible: open,
      backdropOpacity: 0.24,
      animationIn: 'fadeIn',
      animationOut: 'fadeOut',
      onBackdropPress: onClose,
      style: {
        flex: 1,
        margin: 0,
        justifyContent: 'flex-end'
      }
    };
    let pageCount = Math.ceil(maxLength / PAGE_LENGTH);

    let data = reversed ? range(pageCount - 1, -1, -1) : range(0, pageCount);

    return (
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
    );
  }
}

const styles = {
  picker: {
    backgroundColor: 'white',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  }
};
