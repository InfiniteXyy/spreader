import Icon from '@expo/vector-icons/Ionicons';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { ReaderThemeContext } from './index';
import { HStack } from '../../components';
import { colors } from '../../theme';

interface IReaderHeaderProps {
  goBack(): void;
  visible: boolean;
  rightComponent?: JSX.Element;
}

function ReaderHeader(props: IReaderHeaderProps) {
  const { goBack, visible, rightComponent } = props;
  const headerOpacity = useMemo(() => new Animated.Value(1), []);
  const theme = useContext(ReaderThemeContext);

  const darkMode = theme.mode === 'dark';

  useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: visible ? 1 : 0,
      duration: visible ? 200 : 100,
      useNativeDriver: true,
    }).start();
  }, [headerOpacity, visible]);

  const onBack = useCallback(() => {
    if (visible) {
      goBack();
    }
  }, [goBack, visible]);

  const leftComponent = (
    <Icon
      onPress={onBack}
      name="arrow-back"
      style={[styles.icon, { color: darkMode ? colors.tintColorLight : colors.tintColor }]}
    />
  );

  return (
    <Animated.View
      style={[
        styles.absoluteHeader,
        {
          opacity: headerOpacity,
          backgroundColor: theme.bgColor,
          borderBottomColor: darkMode ? colors.dividerColorLight : colors.dividerColor,
        },
      ]}
    >
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
    borderBottomWidth: 0.5,
  },
  icon: {
    fontSize: 20,
    padding: 10,
  },
});

export { ReaderHeader };
