import { getTheme, defaultThemeVariables } from '@shoutem/ui';
import merge from 'lodash.merge';

export const darkBg = '#202124';
export const primaryText = '#4a4a4a';
export const secondaryText = '#9b9b9b';
export const primaryTextLight = '#FFFFFF';
export const secondaryTextLight = 'rgba(255,255,255,0.70)';
export const tintColor = '#757575';
export const tintColorLight = '#CACACA';

export const dividerColor = '#dddddd';
export const dividerColorLight = '#383838';

const myThemeVariables = {
  backgroundColor: '#fff',
  title: {
    color: primaryText,
    fontWeight: '500'
  },
  subtitle: {
    color: secondaryText,
    fontSize: 16
  },
  tagOverlayColor: 'rgba(0, 0, 0, 0.5)'
};

const themeVariables = merge(defaultThemeVariables, myThemeVariables);

const myTheme = {
  'shoutem.ui.Screen': {
    '.dark': {
      backgroundColor: darkBg
    }
  },
  'shoutem.ui.Text': {
    color: primaryText,
    '.secondary': {
      color: secondaryText
    },
    '.dark': {
      color: secondaryTextLight
    },
    '.bold': {
      fontWeight: '500'
    }
  },
  'shoutem.ui.Title': {
    '.dark': {
      color: primaryTextLight
    }
  },
  'shoutem.ui.Subtitle': {
    '.dark': {
      color: secondaryTextLight
    },
    '.small': {
      size: 15
    }
  },
  'shoutem.ui.Divider': {
    borderBottomWidth: 0.5,
    '.dark': {
      borderBottomColor: dividerColorLight
    }
  },
  'shoutem.ui.Icon': {
    color: tintColor,
    '.dark': {
      color: tintColorLight
    }
  },
  'shoutem.ui.Row': {
    '.dark': {
      backgroundColor: darkBg,
      'shoutem.ui.Text': {
        color: secondaryTextLight
      }
    }
  },
  'shoutem.ui.Button': {
    '.small': {
      paddingHorizontal: 8,
      borderRadius: 4,
      borderWidth: 1,
      paddingVertical: 8,
      marginLeft: 16,
      borderColor: dividerColor,
      backgroundColor: '#fafafa',
      'shoutem.ui.Text': {
        margin: 0,
        fontWeight: '500',
        fontSize: 13,
        color: primaryText
      },
      '.dark': {
        backgroundColor: '#1d1e21',
        'shoutem.ui.Text': {
          color: secondaryTextLight
        },
        borderWidth: 1,
        borderColor: '#0f0f0f'
      }
    }
  }
};

const theme = merge(getTheme(themeVariables), myTheme);
export default theme;
