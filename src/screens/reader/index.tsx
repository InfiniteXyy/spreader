import React, { useEffect, useState } from 'react';
import { Container, Header } from '../../components';
import { connect } from 'react-redux';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { IState } from '../../reducers';
import { SavedBook } from '../../model/Book';
import { Chapter } from '../../model/Chapter';
import { getContent } from '../../agents/spider';
import { ReaderContainer, StyledContent } from './components';

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
    getContent(chapter.href, book.methods.getContent).then(result => {
      setContents(result);
    });
  }, [chapter]);

  return (
    <Container>
      <ReaderContainer>
        {contents.map((i, index) => (
          <StyledContent key={index}>{'        ' + i}</StyledContent>
        ))}
      </ReaderContainer>
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
