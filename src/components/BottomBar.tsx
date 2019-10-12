import React from 'react';
import { BottomTabBar } from 'react-navigation-tabs';
import { connect } from 'react-redux';
import { IState } from '../reducers';
import { colors } from '../theme';

interface IStateProps {
  dark: boolean;
}

function TabBarComponent(props: IStateProps & any) {
  return (
    <BottomTabBar
      {...props}
      showLabel={false}
      activeTintColor={colors.warning.pin}
      style={{
        backgroundColor: props.dark ? colors.darkBg : colors.bg,
        borderTopWidth: 0.5,
        borderTopColor: props.dark
          ? colors.dividerColorLight
          : colors.dividerColor,
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
