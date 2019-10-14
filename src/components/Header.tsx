import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HStack } from './index';
import { ThemeContext } from 'styled-components';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { colors } from '../theme';

interface IHeaderProps {
  goBack(): void;
  visible: boolean;
  rightComponent?: JSX.Element;
  absolute?: boolean;
  dark?: boolean;
}

function Header(props: IHeaderProps) {
  const { goBack, visible, rightComponent, absolute, dark } = props;
  const [opacityAnimate] = useState(new Animated.Value(0.8));
  const theme = useContext(ThemeContext);

  const darkMode = dark || theme.dark;

  useEffect(() => {
    Animated.timing(opacityAnimate, {
      toValue: visible ? 1 : 0,
      duration: visible ? 200 : 100,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const onBack = useCallback(() => {
    if (visible) goBack();
  }, [visible]);

  return (
    <Animated.View
      style={[
        absolute && styles.absoluteHeader,
        {
          opacity: opacityAnimate,
          backgroundColor: darkMode ? colors.darkBg : 'white',
          borderBottomColor: theme.dividerColor,
        },
      ]}>
      <HStack center expand style={{ paddingHorizontal: 10 }}>
        <Icon
          onPress={onBack}
          name="ios-arrow-back"
          style={[styles.icon, { color: darkMode ? colors.tintColorLight : colors.tintColor }]}
        />
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
