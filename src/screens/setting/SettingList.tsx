import React from 'react';
import { IState } from '../../reducers';
import { Dispatch } from 'redux';
import { AppAction, AppToggleMode } from '../../reducers/app/app.action';
import { connect } from 'react-redux';
import { ScrollView, Switch, View } from 'react-native';
import { SettingItemContainer } from './components';
import { Text } from '../../components';

interface IStateProps {
  darkMode: boolean;
}

interface IDispatchProps {
  onSetDarkMode(mode: boolean): void;
}

function _SettingList(props: IStateProps & IDispatchProps) {
  return (
    <ScrollView>
      <SettingItemContainer>
        <Text variant="subtitle" bold>
          黑夜模式
        </Text>
        <Switch value={props.darkMode} onValueChange={props.onSetDarkMode} />
      </SettingItemContainer>
      <SettingItemContainer>
        <Text variant="subtitle" bold>
          使用服务器书源（开发中）
        </Text>
        <Switch disabled value={false} onValueChange={() => {}} />
      </SettingItemContainer>
      <SettingItemContainer>
        <Text variant="subtitle" bold>
          跟随系统夜间模式（开发中）
        </Text>
        <Switch disabled value={false} onValueChange={() => {}} />
      </SettingItemContainer>
    </ScrollView>
  );
}

function mapStateToProps(state: IState): IStateProps {
  return {
    darkMode: state.appReducer.dark,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppAction>): IDispatchProps {
  return {
    onSetDarkMode(mode: boolean): void {
      dispatch(new AppToggleMode(mode));
    },
  };
}

export const SettingList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_SettingList);
