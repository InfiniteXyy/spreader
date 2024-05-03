import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';

import { useTrackedSelector } from '../store';
import { colors } from '../theme';

const BottomTabBar = createMaterialBottomTabNavigator();

export function BottomBar(props: any) {
  const { dark } = useTrackedSelector().appReducer;
  return (
    <BottomTabBar.Navigator
      {...props}
      activeTintColor={colors.warning.pin}
      style={{
        backgroundColor: dark ? colors.darkBg : colors.bg,
        borderTopWidth: 0.5,
        borderTopColor: dark ? colors.dividerColorLight : colors.dividerColor,
        height: 60,
      }}
    />
  );
}
