import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { connect } from 'react-redux';
import { IState } from '../reducers';
import { colors } from '../theme';

interface IStateProps {
  dark: boolean;
}

const BottomTabBar = createMaterialBottomTabNavigator();

function TabBarComponent(props: IStateProps & any) {
  return (
    <BottomTabBar.Navigator
      {...props}
      activeTintColor={colors.warning.pin}
      style={{
        backgroundColor: props.dark ? colors.darkBg : colors.bg,
        borderTopWidth: 0.5,
        borderTopColor: props.dark ? colors.dividerColorLight : colors.dividerColor,
        height: 60,
      }}
    />
  );
}

function mapStateToProps(state: IState): IStateProps {
  return {
    dark: state.appReducer.dark,
  };
}

const BottomBar = connect(mapStateToProps)(TabBarComponent);

export { BottomBar };
