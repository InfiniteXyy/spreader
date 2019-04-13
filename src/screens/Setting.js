import React from 'react';
import {
  Screen,
  Button,
  Text,
  View,
  Icon,
  Title,
  TouchableOpacity,
  Overlay
} from '@shoutem/ui';
import { connect } from 'react-redux';
import { setTheme, ThemeNames, toggleMode } from '../reducers/appReducer';
import classNames from 'classnames';
import { primaryText } from '../theme';
import { ReaderThemes } from '../App';

class Setting extends React.Component {
  render() {
    let handleColorTheme = this.props.handleColorTheme;
    let themes = [];
    let selectedBorder = this.props.darkMode ? 'white' : 'tomato';
    for (let i in ThemeNames) {
      let name = ThemeNames[i];
      let selected = name === this.props.themeName;
      themes.push(
        <TouchableOpacity key={i} onPress={handleColorTheme(name)}>
          <View
            style={{
              ...styles.oval,
              backgroundColor: ReaderThemes[name].display,
              borderWidth: selected ? 4 : 0,
              borderColor: selectedBorder
            }}
          />
        </TouchableOpacity>
      );
    }
    return (
      <Screen styleName={classNames({ dark: this.props.darkMode })}>
        <View styleName="vertical v-center h-center fill-parent">
          <Title
            style={{ fontSize: 32, lineHeight: 50, marginBottom: 20 }}
            styleName={this.props.darkMode ? 'dark' : ''}
          >
            夜间模式
          </Title>
          <Button
            styleName="clear"
            onPress={this.props.toggle(!this.props.darkMode)}
          >
            <Icon
              name={this.props.darkMode ? 'checkbox-on' : 'checkbox-off'}
              style={{
                color: this.props.darkMode ? 'white' : primaryText,
                fontSize: 72,
                marginBottom: 50
              }}
            />
          </Button>

          <Title
            style={{ fontSize: 32, lineHeight: 50, marginBottom: 20 }}
            styleName={this.props.darkMode ? 'dark' : ''}
          >
            书本颜色
          </Title>
          <View styleName="horizontal space-around">{themes}</View>
        </View>
      </Screen>
    );
  }
}

const styles = {
  oval: {
    borderRadius: 52,
    width: 52,
    height: 52,
    marginHorizontal: 8
  }
};

const mapStateToProps = ({ appReducer }) => ({
  darkMode: appReducer.darkMode,
  themeName: appReducer.themeName
});

const mapDispatchToProps = dispatch => ({
  toggle: darkMode => () => dispatch(toggleMode(darkMode)),
  handleColorTheme: themeName => () => dispatch(setTheme(themeName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
