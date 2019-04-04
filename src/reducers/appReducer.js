const SET_THEME = 'SET_THEME';
const TOGGLE_MODE = 'TOGGLE_MODE';
const ReaderThemes = require('../../assets/data/themes.json');

export const ThemeNames = {
  white: 'theme1',
  gray: 'theme2',
  black: 'theme3',
  yellow: 'theme4'
};

export function setTheme(themeName) {
  return {
    type: SET_THEME,
    themeName
  };
}

export function toggleMode(isDark) {
  return {
    type: TOGGLE_MODE,
    isDark
  };
}

const defaultState = {
  theme: ReaderThemes.theme1,
  darkMode: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: ReaderThemes[action.themeName] };
    case TOGGLE_MODE:
      return { ...state, darkMode: action.isDark };
    default:
      return state;
  }
};
