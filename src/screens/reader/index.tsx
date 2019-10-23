import { createContext } from 'react';
import { DefaultReaderThemes, ReaderTheme } from '../../model/Theme';

export const ReaderThemeContext = createContext<ReaderTheme>(DefaultReaderThemes[0]);
