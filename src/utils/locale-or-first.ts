import { LocalizedString } from 'mangadex-client';
import { LOCALE_LANGUAGE } from './constants';

/**
 * Returns the localized string in the current language or the first string
 * @param localizedString - Localized strings that may or may not have the current language
 * @returns Localized string
 */
export function localeOrFirst(localizedString: LocalizedString) {
  return localizedString[LOCALE_LANGUAGE] ?? Object.keys(localizedString)[0];
}
