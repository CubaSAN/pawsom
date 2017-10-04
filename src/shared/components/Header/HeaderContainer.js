import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header } from './Header'
import { changeLocale, addUser } from '../../../actions'

const mapStateToProps = state => {
  const { languages, locale } = state.locales
  const { auth, navigator: { err } } = state

  return {
    languages,
    locale,
    auth,
    err
  }
}

const mapDispatchToProps = dispatch => ({
  onLanguageChange: bindActionCreators(changeLocale, dispatch),
  onAddUser: bindActionCreators(addUser, dispatch)
})

export const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
