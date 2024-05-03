import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Container, Header } from '../../components';

function Topic() {
  const navigation = useNavigation();
  return (
    <Container>
      <Header goBack={() => navigation.goBack()} title="武侠" />
    </Container>
  );
}

export { Topic };
