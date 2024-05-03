// based on slack theme
const colors = {
  bg: '#FFFFFF',
  darkBg: '#2C2D30',

  primaryText: '#2C2D30',
  primaryTextLight: '#F9F9F9',

  secondaryText: '#A0A0A2',
  secondaryTextLight: 'rgba(255,255,255,0.70)',

  // for icons
  tintColor: '#717274',
  tintColorLight: '#cccccc',

  // for dividers
  dividerColor: '#dddddd',
  dividerColorLight: '#383838',

  // for containers
  container: '#EEEEEE',
  containerLight: '#2C2D30',

  primary: {
    default: '#0091FF',
    hover: '#005E99',
    link: '#0576B9',
    fill: '#2D9EE0',
    pale: '#EAF5FC',
  },
  warning: {
    default: '#D72B3F',
    pin: '#F26130',
    colonel: '#FF9900',
    star: '#FFCC00',
    mentions: '#FFF5CC',
  },

  green: '#29A979',
};

function getTheme(darkMode: boolean) {
  const defaultMode = !darkMode;
  return {
    dark: darkMode,

    bgColor: defaultMode ? colors.bg : colors.darkBg,

    primaryText: defaultMode ? colors.primaryText : colors.primaryTextLight,
    secondaryText: defaultMode ? colors.secondaryText : colors.secondaryTextLight,
    tintColor: defaultMode ? colors.tintColor : colors.tintColorLight,
    dividerColor: defaultMode ? colors.dividerColor : colors.dividerColorLight,
    containerColor: defaultMode ? colors.container : colors.containerLight,

    primaryColor: colors.primary.default,
    warningColor: defaultMode ? colors.warning.default : colors.warning.pin,
    successColor: colors.green,

    top: 0,
  };
}
export { colors, getTheme };
