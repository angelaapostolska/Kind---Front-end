import { palette, PaletteType } from './palette';
import { spacing, SpacingType } from './spacing';
import { typography, TypographyType } from './typography';

export interface ITheme {
  colors: PaletteType;
  spacing: SpacingType;
  typography: TypographyType;
}

export const theme: ITheme = {
  colors: palette,
  spacing,
  typography,
};
