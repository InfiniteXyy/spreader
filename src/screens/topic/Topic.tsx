import React from 'react';
import { Container, Header } from '../../components';
import { NavigationInjectedProps } from 'react-navigation';

function Topic(props: NavigationInjectedProps) {
  return (
    <Container>
      <Header goBack={() => props.navigation.goBack()} title="武侠" />
    </Container>
  );
}

export { Topic };
