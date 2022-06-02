import React, { useContext } from 'react';
import { Container, HStack, Title } from '../../components';
import { SettingList } from './SettingList';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

export function Setting() {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  return (
    <Container>
      <HStack center expand>
        <Title>设置</Title>
        <Icon
          name="ios-arrow-back"
          size={20}
          style={{ padding: 20 }}
          color={theme.tintColor}
          onPress={() => navigation.goBack()}
        />
      </HStack>
      <SettingList />
    </Container>
  );
}
