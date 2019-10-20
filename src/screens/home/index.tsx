import React from 'react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Container, HStack, SearchBar, Title } from '../../components';
import { BookList } from './BookList';
import { SavedBook } from '../../model/Book';
import Icon from 'react-native-vector-icons/Feather';
import { SavedChapter } from '../../model/Chapter';

class _Home extends React.Component<NavigationInjectedProps> {
  onNavigateBook = (book: SavedBook) => () => {
    this.props.navigation.navigate({ routeName: 'chapters', params: { bookId: book.id } });
  };

  onNavigateSearch = () => {
    this.props.navigation.navigate('search');
  };

  onNavigateSetting = () => {
    this.props.navigation.navigate('setting');
  };

  onNavigateChapter = (book: SavedBook, chapter: SavedChapter) => () => {
    this.props.navigation.navigate({ routeName: 'reader', params: { bookId: book.id, chapterHref: chapter.href } });
  };

  render() {
    return (
      <Container>
        <HStack expand center>
          <Title>首页</Title>
          <Icon
            onPress={this.onNavigateSetting}
            name="settings"
            style={{ padding: 20, fontSize: 16, color: '#9b9b9b' }}
          />
        </HStack>
        <SearchBar onPress={this.onNavigateSearch} />
        <BookList
          onNavigate={this.onNavigateBook}
          onNavigateSearch={this.onNavigateSearch}
          onNavigateChapter={this.onNavigateChapter}
        />
      </Container>
    );
  }
}

export const Home = withNavigation(_Home);
