import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { addLocaleData, IntlProvider } from 'react-intl'
import { getLocalizedMessages } from '../../../utils'
import en from 'react-intl/locale-data/en'
import ru from 'react-intl/locale-data/ru'
import uk from 'react-intl/locale-data/uk'

export class Locales extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired
  }

  componentDidMount () {
    addLocaleData(
      [...en, ...ru, ...uk]
    );
  }

  getMessages(locale) {
    return getLocalizedMessages(locale)
  }

  render() {
    const { locale } = this.props
    const intlMessages = this.getMessages(locale)

    return (
      <IntlProvider
          locale={locale}
          messages={intlMessages}
          key={locale}
      >
        {this.props.children}
      </IntlProvider>
    )
  }
}
