import React, { useEffect, useState } from 'react';
import { Container, Header, Text } from '../../components';
import { connect } from 'react-redux';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { IState } from '../../reducers';
import { SavedBook } from '../../model/Book';
import { Chapter } from '../../model/Chapter';
import { getContent } from '../../agents/spider';
import { ScrollView } from 'react-native';

interface IStateProps {
  book?: SavedBook;
  chapter?: Chapter;
}

function _Reader(props: NavigationInjectedProps & IStateProps) {
  const [contents, setContents] = useState<string[]>([]);
  const { book, chapter, navigation } = props;
  if (!book || !chapter) {
    return <Container />;
  }

  useEffect(() => {
    async function fetch() {
      if (book && chapter) {
        const result = await getContent(chapter.href, book.methods.getContent);
        setContents(result);
      }
    }
    fetch().then();
  }, []);

  return (
    <Container>
      <ScrollView>
        {contents.map((i, index) => (
          <Text key={index} style={{}}>
            {'        ' + i}
          </Text>
        ))}
      </ScrollView>
      <Header visible={true} goBack={navigation.goBack} absolute />
    </Container>
  );
}

function mapStateToProps(state: IState, props: NavigationInjectedProps): IStateProps {
  const bookId = props.navigation.getParam<string>('bookId');
  const chapterHref = props.navigation.getParam<string>('chapterHref');
  const book = state.bookReducer.books.find(i => i.id === bookId);
  if (book === undefined) return {};
  const chapter = book.chapters.find(i => i.href === chapterHref);
  return {
    book,
    chapter,
  };
}

export const Reader = connect(mapStateToProps)(withNavigation(_Reader));
