import React from 'react';
import { Container, Title } from '../../components';
import { SettingList } from './SettingList';

export function Setting() {
  return (
    <Container>
      <Title>我的</Title>
      <SettingList />
    </Container>
  );
}
