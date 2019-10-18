import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { Animated, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HStack, Text } from './index';
import { ThemeContext } from 'styled-components';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { colors } from '../theme';

interface IHeaderProps {
  goBack(): void;
  visible: boolean;
  rightComponent?: JSX.Element;
  title?: string;
  titleVisible?: boolean;
  absolute?: boolean;
  dark?: boolean;
}

function Header(props: IHeaderProps) {
  const { goBack, visible, rightComponent, absolute, dark, title, titleVisible } = props;
  const headerOpacity = useMemo(() => new Animated.Value(1), []);
  const theme = useContext(ThemeContext);

  const darkMode = dark === undefined ? theme.dark : dark;

  useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: visible ? 1 : 0,
      duration: visible ? 200 : 100,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: visible ? 1 : 0,
      duration: visible ? 200 : 100,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const onBack = useCallback(() => {
    if (visible) goBack();
  }, [visible]);

  const leftComponent = (
    <Icon
      onPress={onBack}
      name="ios-arrow-back"
      style={[styles.icon, { color: darkMode ? colors.tintColorLight : colors.tintColor }]}
    />
  );

  return (
    <Animated.View
      style={[
        absolute && styles.absoluteHeader,
        {
          opacity: headerOpacity,
          backgroundColor: darkMode ? colors.darkBg : 'white',
          borderBottomColor: darkMode ? colors.dividerColorLight : colors.dividerColor,
        },
      ]}>
      <HStack center expand style={{ paddingHorizontal: 10 }}>
        {leftComponent}
        {rightComponent}
      </HStack>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  absoluteHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: getStatusBarHeight(true),
    borderBottomWidth: 0.5,
  },
  icon: {
    fontSize: 20,
    padding: 10,
  },
});

export { Header };
