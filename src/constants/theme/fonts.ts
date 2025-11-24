import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import {
  SourceSans3_400Regular,
  SourceSans3_500Medium,
  SourceSans3_600SemiBold,
  SourceSans3_700Bold,
} from '@expo-google-fonts/source-sans-3';

export const Fonts = {
  // Montserrat
  montserratRegular: 'Montserrat_400Regular',
  montserratMedium: 'Montserrat_500Medium',
  montserratSemiBold: 'Montserrat_600SemiBold',
  montserratBold: 'Montserrat_700Bold',
  // SourceSans3
  sourceSans3Regular: 'SourceSans3_400Regular',
  sourceSans3Medium: 'SourceSans3_500Medium',
  sourceSans3SemiBold: 'SourceSans3_600SemiBold',
  sourceSans3Bold: 'SourceSans3_700Bold',

  systemLight: '300',

  systemRegular: '400',

  systemMedium: '500',

  systemSemiBold: '600',

  systemBold: '700',
} as const;

export type FontFamilyType = keyof typeof Fonts;

export const loadFonts = () => ({
  [Fonts.montserratRegular]: Montserrat_400Regular,
  [Fonts.montserratMedium]: Montserrat_500Medium,
  [Fonts.montserratSemiBold]: Montserrat_600SemiBold,
  [Fonts.montserratBold]: Montserrat_700Bold,
  [Fonts.sourceSans3Regular]: SourceSans3_400Regular,
  [Fonts.sourceSans3Medium]: SourceSans3_500Medium,
  [Fonts.sourceSans3SemiBold]: SourceSans3_600SemiBold,
  [Fonts.sourceSans3Bold]: SourceSans3_700Bold,
});
