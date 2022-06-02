import React, { useContext, useEffect, useMemo } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HStack, Text } from './index';
import { ThemeContext } from 'styled-components';
import { colors } from '../theme';

interface IHeaderProps {
  goBack(): void;
  rightComponent?: JSX.Element;
  title?: string;
  titleVisible?: boolean;
}

function Header(props: IHeaderProps) {
  const { goBack, rightComponent, title, titleVisible } = props;
  const theme = useContext(ThemeContext);
  const titleAnimated = useMemo(() => {
    if (titleVisible === undefined) {
      return new Animated.Value(1);
    } else {
      return new Animated.Value(0);
    }
  }, [titleVisible]);

  useEffect(() => {
    if (titleVisible === undefined) {
      return;
    }
    Animated.timing(titleAnimated, {
      toValue: titleVisible ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [titleAnimated, titleVisible]);

  const leftComponent = (
    <Icon
      onPress={goBack}
      name="ios-arrow-back"
      style={[styles.icon, { color: theme.dark ? colors.tintColorLight : colors.tintColor }]}
    />
  );

  const titleComponent = (
    <Animated.View style={{ opacity: titleAnimated, position: 'absolute', left: 0, right: 0, alignItems: 'center' }}>
      <Text variant="subtitle" bold>
        {title}
      </Text>
    </Animated.View>
  );

  return (
    <View
      style={{
        backgroundColor: theme.dark ? colors.darkBg : 'white',
        borderBottomColor: theme.dark ? colors.dividerColorLight : colors.dividerColor,
      }}
    >
      <HStack center expand style={{ paddingHorizontal: 10 }}>
        {titleComponent}
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
