import { SavedBook } from '../../model/Book';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { getLastAndPick, hofActions } from '../../utils';
import { SavedChapter } from '../../model/Chapter';
import { CardSubTitle, CardTitle, CardWrapper, CoverImg, MoreIcon } from './components';
import { Dropdown, HStack, Text, VStack } from '../../components';
import { TouchableOpacityProps, View } from 'react-native';
import Spinner from 'react-native-spinkit';
import { DropdownDivider } from '../../components/Dropdown';

interface IBookItemProps extends TouchableOpacityProps {
  book: SavedBook;
  menuActions: {
    continueRead(): void;
    markAllRead(): void;
    deleteBook(): void;
  };
}
export function BookItem(props: IBookItemProps) {
  const { book } = props;
  const theme = useContext(ThemeContext);
  const menuRef = useRef<any>(null);
  // 最近阅读文章
  const lastChapter = useMemo(() => {
    return getLastAndPick<SavedChapter, string>(book.chapters, i => i.title, '无');
  }, [book.chapters.length]);
  // 还有几章未读
  const unReadCount = useMemo(() => {
    return book.chapters.reduce((value, cur) => {
      return !cur.hasRead ? value + 1 : value;
    }, 0);
  }, [book.chapters.length, book.lastRead]);
  // 下拉菜单和内容
  const menuActions = hofActions(props.menuActions, () => menuRef.current.hide());
  const dropdown = (
    <Dropdown
      buttonElement={<MoreIcon name="more-horizontal" onPress={() => menuRef.current.show()} />}
      menuRef={menuRef}
      menuItems={[
        { label: '继续阅读', onPress: menuActions.continueRead },
        { label: '书虫列表', onPress: () => {} },
        { label: '全部设置已读', onPress: menuActions.markAllRead },
        new DropdownDivider(),
        { label: '删除', onPress: menuActions.deleteBook, variant: 'danger' },
      ]}
    />
  );

  return (
    <CardWrapper {...props}>
      <CoverImg source={{ uri: book.coverImg }} />
      <VStack expand>
        <HStack expand>
          <View>
            <CardTitle>{book.title}</CardTitle>
            <CardSubTitle>{book.author}</CardSubTitle>
          </View>
          {dropdown}
        </HStack>
        <HStack expand center>
          <HStack>
            <Text secondary>{book.isFetching ? '更新' : '最新'} </Text>
            <Text bold secondary={book.isFetching}>
              {lastChapter}
            </Text>
            <HStack style={{ marginLeft: 8, height: 14 }} center>
              <Spinner isVisible={book.isFetching} type="ThreeBounce" size={12} color={theme.secondaryText} />
            </HStack>
          </HStack>
          {unReadCount !== 0 && (
            <HStack>
              <Text colorType="pin">{unReadCount}章 </Text>
              <Text>未读</Text>
            </HStack>
          )}
        </HStack>
      </VStack>
    </CardWrapper>
  );
}
