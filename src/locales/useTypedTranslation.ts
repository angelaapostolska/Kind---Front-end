/**
 * 🚀 useTypedTranslation Hook
 *
 * This custom hook wraps the default react-i18next `useTranslation` hook to:
 * - Provide **type-safe translation keys** based on the actual en.ts file (TranslationKeys).
 * - Enable **autocomplete** for all translation keys in the IDE.
 * - Ensure **runtime safety** by preventing usage of invalid translation keys.
 *
 * Why is this better?
 * - It ensures **consistency** between the code and the actual translation keys, catching typos and mistakes at compile time.
 * - It eliminates magic strings and makes localization changes more predictable.
 * - It reduces runtime errors from missing translation keys.
 *
 * Usage:
 *   const { t } = useTypedTranslation();
 *   const label = t('common.back'); // autocomplete + type-safe!
 */

import { useTranslation as useTranslationBase } from 'react-i18next';
import { TranslationKeys } from './TranslationKeys';

export const useTypedTranslation = () => {
  const { t, ...rest } = useTranslationBase();

  const typedT = ((key: TranslationKeys, options?: never) => t(key, options)) as (key: TranslationKeys, options?: never) => string;

  return { t: typedT, ...rest };
};
