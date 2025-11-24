import * as Localization from 'expo-localization';
import * as i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';

const lng = Localization.getLocales()[0]?.languageCode || 'en';

i18n.use(initReactI18next).init({
  lng,
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
