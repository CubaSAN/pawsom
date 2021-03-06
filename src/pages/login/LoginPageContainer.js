import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { LoginPage } from './LoginPage'
import { addUser } from '../../actions'

const mapStateToProps = state => {
  const { navigator: { lat, lng } } = state || {}

  return {
    lat,
    lng
  }
}

const mapDispatchToProps = dispatch => ({
  onAddUser: bindActionCreators(addUser, dispatch)
})

export const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
