import React, { useCallback, useContext, useMemo, useState } from 'react';
import Modal from 'react-native-modal';
import { Platform, StyleSheet, View } from 'react-native';
import { getPageTitle, getReversedListIndex, PAGE_LENGTH, range } from '../../utils';
import { ThemeContext } from 'styled-components';
import { SavedBook } from '../../model/Book';
import { HStack, Text } from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  ChapterPickerContainer,
  ChapterPickerDropDown,
  ChapterPickerSmallBtn,
  ChapterPickerSmallBtnText,
} from './components';
import { ScrollPicker } from '../../components/WheelPicker';

interface IChapterPickerProps {
  book: SavedBook;
  onChangePage(book: SavedBook, pageIndex: number, reversed: boolean): void;
}

type PickerItem = {
  label: string;
  value: number;
};

export function ChapterPicker(props: IChapterPickerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useContext(ThemeContext);

  const { onChangePage, book } = props;
  const { currentPage, reverse, chapters } = book;
  const maxLength = chapters.length;

  const pickerList = useMemo<PickerItem[]>(() => {
    const pageCount = Math.ceil(maxLength / PAGE_LENGTH);
    const rowData = reverse ? range(pageCount - 1, -1, -1) : range(0, pageCount);
    return rowData.map(i => ({
      label: getPageTitle(i, PAGE_LENGTH, maxLength, !!reverse),
      value: i,
    }));
  }, [maxLength, reverse]);

  const onReverseMenu = useCallback(() => {
    if (reverse) {
      onChangePage(book, 0, false);
    } else {
      onChangePage(book, Math.floor(maxLength / PAGE_LENGTH), true);
    }
  }, [maxLength, reverse]);

  return (
    <View>
      <ChapterPickerContainer>
        <ChapterPickerDropDown onPress={() => setModalOpen(true)}>
          <Text bold>{getPageTitle(currentPage, PAGE_LENGTH, maxLength, !!reverse)}</Text>
          <Icon name="caretdown" style={styles.icon} />
        </ChapterPickerDropDown>
        <HStack center>
          <Text secondary>共 {chapters.length} 章</Text>
          <ChapterPickerSmallBtn onPress={onReverseMenu}>
            <ChapterPickerSmallBtnText>{reverse ? '逆序' : '顺序'}</ChapterPickerSmallBtnText>
          </ChapterPickerSmallBtn>
        </HStack>
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
        <View style={[styles.picker, { backgroundColor: theme.bgColor }]}>
          <ScrollPicker
            data={pickerList}
            onValueChange={pageIndex => onChangePage(book, pageIndex, !!book.reverse)}
            mapValueToIndex={value => (reverse ? getReversedListIndex(value, book.chapters.length) : value)}
            selectedValue={currentPage}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    ...Platform.select({
      android: { alignItems: 'center' },
    }),
  },
  icon: {
    color: '#757575',
    marginLeft: Platform.select({
      ios: 4,
      android: 8,
    }),
    fontSize: 10,
    marginBottom: Platform.select({
      ios: 0,
      android: 4,
    }),
  },
});
