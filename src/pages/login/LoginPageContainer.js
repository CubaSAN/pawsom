import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { LoginPage } from './LoginPage'

import { authenticate, addUser } from '../../actions'

const mapDispatchToProps = dispatch => ({
  onAuthenticate: bindActionCreators(authenticate, dispatch),
  onAddUser: bindActionCreators(addUser, dispatch)
});

export const LoginPageContainer = connect(
  null,
  mapDispatchToProps
)(LoginPage)
