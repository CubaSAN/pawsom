import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
// import { flattenMessages } from './utils';
// import { messages } from './localization';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { LocalesContainer } from './shared/components/Locales'
// import { addLocaleData, IntlProvider } from 'react-intl'
import store, { history } from './store'
// import en from 'react-intl/locale-data/en'
// import ru from 'react-intl/locale-data/ru'
// import uk from 'react-intl/locale-data/uk'
import 'bootstrap/dist/css/bootstrap.css'

// addLocaleData(
//   [...en, ...ru, ...uk]
// );

// const locale = (navigator.languages && navigator.languages[0])
//   || navigator.language
//   || navigator.userLanguage
//   || 'en-US';

// // Supported locales
// const supportedLocales = {
//   'en-US': 'en',
//   'en': 'en',
//   'uk-UA': 'uk',
//   'uk': 'uk',
//   'ru-RU': 'ru',
//   'ru': 'ru'
// }

// const localizedMessages = 
//   locale in supportedLocales ? messages[supportedLocales[locale]] : messages[supportedLocales['en-US']]

// const trueLocale = locale in Object.keys(supportedLocales) ? locale : 'en-US'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <LocalesContainer>
        <App />
      </LocalesContainer>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
