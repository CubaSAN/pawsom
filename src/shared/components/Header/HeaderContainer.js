import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header } from './Header'
import { changeLocale, authenticate, addUser } from '../../../actions'

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
  onLanguageChange: bindActionCreators(changeLocale, dispatch),
  onAuthenticate: bindActionCreators(authenticate, dispatch),
  onAddUser: bindActionCreators(addUser, dispatch)
});

export const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
