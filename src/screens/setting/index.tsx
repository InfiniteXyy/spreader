import React from 'react';
import { Button, ScrollView } from 'react-native';
import { Container, Title } from '../../components';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { Dispatch } from 'redux';
import { AppToggleMode } from '../../reducers/app/app.action';

interface IStateProps {
  dark: boolean;
}

interface IDispatchProps {
  toggleMode(): void;
}
function Setting(props: IStateProps & IDispatchProps) {
  return (
    <Title>设置</Title>
  );
}

function mapStateToProps(state: IState) {
  return {
    dark: state.appReducer.dark,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    toggleMode: () => dispatch(new AppToggleMode()),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setting);
