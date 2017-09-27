import { addLocaleData, IntlProvider } from 'react-intl'

import en from 'react-intl/locale-data/en'
import ru from 'react-intl/locale-data/ru'
import uk from 'react-intl/locale-data/uk'

const locale = (navigator.languages && navigator.languages[0])
  || navigator.language
  || navigator.userLanguage
  || 'en-US';

// Supported locales
const supportedLocales = {
  'en-US': 'en',
  'en': 'en',
  'uk-UA': 'uk',
  'uk': 'uk',
  'ru-RU': 'ru',
  'ru': 'ru'
}

const localizedMessages =
  locale in supportedLocales ? messages[supportedLocales[locale]] : messages[supportedLocales['en-US']]

const trueLocale = locale in Object.keys(supportedLocales) ? locale : 'en-US'

const setLocaleData = () => {
  addLocaleData(
    [...en, ...ru, ...uk]
  );
}
