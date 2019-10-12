import React, { useContext, useState } from 'react';
import Modal from 'react-native-modal';
import { Picker, StyleSheet, View } from 'react-native';
import { getPageTitle, PAGE_LENGTH, range } from '../../utils';
import { ThemeContext } from 'styled-components';
import { SavedBook } from '../../model/Book';
import { Button, Text } from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import { ChapterPickerContainer, ChapterPickerDropDown } from './components';

interface IChapterPickerProps {
  book: SavedBook;
  onChangePage(book: SavedBook, pageIndex: number, reversed: boolean): void;
}

export function ChapterPicker(props: IChapterPickerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useContext(ThemeContext);

  const { onChangePage, book } = props;
  const { currentPage, reverse, chapters } = book;
  const maxLength = chapters.length;

  function visualizePicker() {
    let pageCount = Math.ceil(maxLength / PAGE_LENGTH);
    let data = reverse ? range(pageCount - 1, -1, -1) : range(0, pageCount);
    return (
      <Picker
        selectedValue={currentPage.toString()}
        onValueChange={(itemValue, itemIndex) => onChangePage(book, itemValue, !!book.reverse)}>
        {data.map(i => {
          return (
            <Picker.Item
              color={theme.primaryText}
              key={i.toString()}
              label={getPageTitle(i, PAGE_LENGTH, maxLength, !!reverse)}
              value={i.toString()}
            />
          );
        })}
      </Picker>
    );
  }

  function onReverseMenu() {
    if (reverse) {
      onChangePage(book, 0, false);
    } else {
      onChangePage(book, Math.floor(book.chapters.length / PAGE_LENGTH), true);
    }
  }

  return (
    <View>
      <ChapterPickerContainer>
        <ChapterPickerDropDown onPress={() => setModalOpen(true)}>
          <Text bold>{getPageTitle(currentPage, PAGE_LENGTH, maxLength, !!reverse)}</Text>
          <Icon name="caretdown" style={styles.icon} />
        </ChapterPickerDropDown>
        <Button title="倒序" onPress={onReverseMenu} />
      </ChapterPickerContainer>
      <Modal
        isVisible={modalOpen}
        backdropOpacity={0.24}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={() => setModalOpen(false)}
        style={{
          flex: 1,
          margin: 0,
          justifyContent: 'flex-end',
        }}>
        <View style={[styles.picker, { backgroundColor: theme.bgColor }]}>{visualizePicker()}</View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    height: 200,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    justifyContent: 'center',
  },
  icon: {
    color: '#757575',
    marginRight: 0,
  },
});
