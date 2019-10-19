import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HStack } from './index';
import { ThemeContext } from 'styled-components';
import { colors } from '../theme';

interface IHeaderProps {
  goBack(): void;
  rightComponent?: JSX.Element;
}

function Header(props: IHeaderProps) {
  const { goBack, rightComponent } = props;
  const theme = useContext(ThemeContext);

  const darkMode = theme.dark;

  const leftComponent = (
    <Icon
      onPress={goBack}
      name="ios-arrow-back"
      style={[styles.icon, { color: darkMode ? colors.tintColorLight : colors.tintColor }]}
    />
  );

  return (
    <View
      style={{
        backgroundColor: darkMode ? colors.darkBg : 'white',
        borderBottomColor: darkMode ? colors.dividerColorLight : colors.dividerColor,
      }}>
      <HStack center expand style={{ paddingHorizontal: 10 }}>
        {leftComponent}
        {rightComponent}
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    padding: 10,
  },
});

export { Header };
