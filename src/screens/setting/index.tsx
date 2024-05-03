import Icon from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';

import { SettingList } from './SettingList';
import { Container, HStack, Title } from '../../components';

export function Setting() {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  return (
    <Container>
      <HStack center expand>
        <Title>设置</Title>
        <Icon
          name="arrow-back"
          size={20}
          style={{ padding: 20 }}
          color={theme?.tintColor}
          onPress={() => navigation.goBack()}
        />
      </HStack>
      <SettingList />
    </Container>
  );
}
