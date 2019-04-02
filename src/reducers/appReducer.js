const SET_THEME = 'SET_THEME';
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

export function addNum() {
  return {
    type: 'NUM'
  };
}

const defaultState = {
  theme: ReaderThemes.theme1,
  num: 0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: ReaderThemes[action.themeName] };
    case 'NUM':
      return { ...state, num: state.num + 1 };
    default:
      return state;
  }
};
