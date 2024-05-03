// create styled-components.d.ts in your project source
// if it isn't being picked up, check tsconfig compilerOptions.types
import { getTheme } from '../src/theme';

type ThemeType = ReturnType<typeof getTheme>;

declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeType {}
}
