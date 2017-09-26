import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import uk from 'react-intl/locale-data/uk';

import 'bootstrap/dist/css/bootstrap.css';

import { flattenMessages } from './utils';
import { messages } from './localization';

addLocaleData(
  [...en, ...ru, ...uk]
);

const locale = (navigator.languages && navigator.languages[0])
  || navigator.language
  || navigator.userLanguage
  || 'en-US';

// Supported locales
const supportedLocales = {
  'en': 'en',
  'en-US': 'en',
  'uk': 'uk',
  'uk-UA': 'uk',
  'ru': 'ru',
  'ru-RU': 'ru'
}

const localizedMessages = 
  locale in supportedLocales ? messages[supportedLocales[locale]] : messages[supportedLocales['en']]

ReactDOM.render(
  <IntlProvider locale={locale} messages={flattenMessages(localizedMessages)}>
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
