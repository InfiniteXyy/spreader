import React, { useCallback, useContext, useMemo, useState } from 'react';
import Modal from 'react-native-modal';
import { Picker, StyleSheet, View } from 'react-native';
import { getPageTitle, PAGE_LENGTH, range } from '../../utils';
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

interface IChapterPickerProps {
  book: SavedBook;
  onChangePage(book: SavedBook, pageIndex: number, reversed: boolean): void;
}

type PickerItem = {
  title: string;
  pageIndex: number;
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
      title: getPageTitle(i, PAGE_LENGTH, maxLength, !!reverse),
      pageIndex: i,
    }));
  }, [maxLength, reverse]);

  const onReverseMenu = useCallback(() => {
    if (reverse) {
      onChangePage(book, 0, false);
    } else {
      onChangePage(book, Math.floor(maxLength / PAGE_LENGTH), true);
    }
  }, [maxLength, reverse]);

  function visualizePicker() {
    return (
      <Picker selectedValue={currentPage} onValueChange={pageIndex => onChangePage(book, pageIndex, !!book.reverse)}>
        {pickerList.map(i => {
          return <Picker.Item color={theme.primaryText} key={i.pageIndex} label={i.title} value={i.pageIndex} />;
        })}
      </Picker>
    );
  }

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
        <View style={[styles.picker, { backgroundColor: theme.bgColor }]}>{visualizePicker()}</View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    justifyContent: 'center',
  },
  icon: {
    color: '#757575',
    marginLeft: 4,
    fontSize: 10,
  },
});
