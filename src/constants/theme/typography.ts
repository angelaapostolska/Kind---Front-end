import { Fonts } from './fonts';

export const typography = {
  fontFamily: {
    brand: Fonts.montserratRegular,
    secondary: Fonts.sourceSans3Regular,
  },
  fontVariants: {
    brand: {
      regular: Fonts.montserratRegular,
      medium: Fonts.montserratMedium,
      semibold: Fonts.montserratSemiBold,
      bold: Fonts.montserratBold,
    },
    secondary: {
      regular: Fonts.sourceSans3Regular,
      medium: Fonts.sourceSans3Medium,
      semibold: Fonts.sourceSans3SemiBold,
      bold: Fonts.sourceSans3Bold,
    },
    system: {
      light: Fonts.systemLight, // System font 300
      regular: Fonts.systemRegular, // System font 400
      medium: Fonts.systemMedium, // System font 500
      semibold: Fonts.systemSemiBold, // System font 600
      bold: Fonts.systemBold, // System font 700
    },
  },
  fontSize: {
    paragraph: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
    },
    label: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
    },
    heading: {
      xs: 18,
      sm: 20,
      md: 24,
      lg: 28,
    },
    display: {
      md: 40,
      lg: 64,
    },
  },
  lineHeight: {
    paragraph: {
      xs: 20,
      sm: 20,
      md: 24,
      lg: 28,
    },
    label: {
      xs: 16,
      sm: 16,
      md: 20,
      lg: 24,
    },
    heading: {
      xs: 24,
      sm: 28,
      md: 32,
      lg: 36,
    },
    display: {
      md: 52,
      lg: 76,
    },
  },
};

export type TypographyType = typeof typography;
