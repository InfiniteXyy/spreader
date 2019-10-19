import React, { useContext } from 'react';
import { Container, HStack, Title } from '../../components';
import { SettingList } from './SettingList';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from 'styled-components/native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

function _Setting(props: NavigationInjectedProps) {
  const theme = useContext(ThemeContext);
  return (
    <Container>
      <HStack center expand>
        <Title>设置</Title>
        <Icon
          name="ios-arrow-down"
          size={20}
          style={{ padding: 20 }}
          color={theme.tintColor}
          onPress={() => props.navigation.goBack()}
        />
      </HStack>
      <SettingList />
    </Container>
  );
}

export const Setting = withNavigation(_Setting);
