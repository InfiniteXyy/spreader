import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HStack } from './index';
import { ThemeContext } from 'styled-components';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface IHeaderProps {
  goBack(): void;
  visible: boolean;
  rightComponent?: JSX.Element;
  absolute?: boolean;
}

function Header(props: IHeaderProps) {
  const { goBack, visible, rightComponent, absolute } = props;
  const [opacityAnimate] = useState(new Animated.Value(0.8));
  const theme = useContext(ThemeContext);

  useEffect(() => {
    Animated.timing(opacityAnimate, {
      toValue: visible ? 0.8 : 0,
      duration: visible ? 200 : 100,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const onBack = useCallback(() => {
    if (visible) goBack();
  }, [visible]);

  return (
    <Animated.View style={[absolute && styles.absoluteHeader, { opacity: opacityAnimate }]}>
      <HStack center expand style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={onBack}>
          <Icon name="ios-arrow-back" style={[styles.icon, { color: theme.tintColor }]} />
        </TouchableOpacity>
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
  },
  icon: {
    fontSize: 20,
    paddingVertical: 10,
  },
});

export { Header };
