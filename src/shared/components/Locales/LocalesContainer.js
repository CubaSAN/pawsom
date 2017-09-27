import { connect } from 'react-redux'
import { Locales } from './Locales'

const mapStateToProps = state => {
  const { locale } = state.locales

  return {
    locale
  }
}

export const LocalesContainer = connect(
  mapStateToProps
)(Locales)
