import { messages } from '../localization'
import Cookies from 'js-cookie'

export const LOCALE = 'lc'
export const USER = 'uid'

export function flattenMessages(nestedMessages, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    let value = nestedMessages[key]
    let prefixedKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'string') {
      messages[prefixedKey] = value
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey))
    }

    return messages
  }, {})
}

export function getBrowserLocale() {
  const browserLocale = (navigator.languages && navigator.languages[0])
    || navigator.language
    || navigator.userLanguage
    || 'en-US'

  const storedLocale = Cookies.get(LOCALE)

  return storedLocale ? storedLocale : browserLocale
}

const SUPPORTED_LOCALES = {
  'en-US': 'en',
  'en': 'en',
  'uk-UA': 'uk',
  'uk': 'uk',
  'ru-RU': 'ru',
  'ru': 'ru'
}

export function getLocalizedMessages(requestedLocale) {
  const locale = requestedLocale || getBrowserLocale()
  
  const intlMessages = locale in SUPPORTED_LOCALES ?
    messages[SUPPORTED_LOCALES[locale]] :
    messages[SUPPORTED_LOCALES['en-US']]

  return flattenMessages(intlMessages)
}

export function getLocale() {
  const locale = getBrowserLocale()

  return Object.keys(SUPPORTED_LOCALES).includes(locale) ? locale : 'en-US'
}

export function getLanguages() {
  return Object.keys(messages)
}

export function getUser() {
  const user = Cookies.get(USER)

  return user ? JSON.parse(user) : null
}
