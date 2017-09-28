import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header } from './Header'
import { changeLocale } from '../../../actions'

const mapStateToProps = state => {
  const { languages, locale } = state.locales
  const { auth } = state

  return {
    languages,
    locale,
    auth
  }
};

const mapDispatchToProps = dispatch => ({
  onLanguageChange: bindActionCreators(changeLocale, dispatch)
});

export const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
