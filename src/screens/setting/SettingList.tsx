import React from 'react';
import { ScrollView, Switch } from 'react-native';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { SettingItemContainer } from './components';
import { Text } from '../../components';
import { AppAction, AppToggleMode, AppToggleModeFollowSystem } from '../../reducers/app/app.action';
import { useTrackedSelector } from '../../store';

export function SettingList() {
  const state = useReduxState();
  const actions = useActions();
  return (
    <ScrollView>
      <SettingItemContainer>
        <Text variant="subtitle" bold>
          黑夜模式
        </Text>
        <Switch disabled={state.followSystem} value={state.darkMode} onValueChange={actions.onSetDarkMode} />
      </SettingItemContainer>
      <SettingItemContainer>
        <Text variant="subtitle" bold>
          跟随系统夜间模式
        </Text>
        <Switch value={state.followSystem} onValueChange={actions.onSetFollowSystem} />
      </SettingItemContainer>
      <SettingItemContainer>
        <Text variant="subtitle" bold>
          使用服务器书源（开发中）
        </Text>
        <Switch disabled value={false} onValueChange={() => {}} />
      </SettingItemContainer>
    </ScrollView>
  );
}

function useReduxState() {
  const { dark, modeFollowSystem } = useTrackedSelector().appReducer;
  return {
    darkMode: dark,
    followSystem: modeFollowSystem,
  };
}

function useActions() {
  const dispatch = useDispatch<Dispatch<AppAction>>();
  return {
    onSetFollowSystem(follow: boolean): void {
      dispatch(new AppToggleModeFollowSystem(follow));
    },
    onSetDarkMode(mode: boolean): void {
      dispatch(new AppToggleMode(mode));
    },
  };
}
