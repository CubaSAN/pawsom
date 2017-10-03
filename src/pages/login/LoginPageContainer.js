import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { LoginPage } from './LoginPage'

import { addUser } from '../../actions'

const mapDispatchToProps = dispatch => ({
  onAddUser: bindActionCreators(addUser, dispatch)
})

export const LoginPageContainer = connect(
  null,
  mapDispatchToProps
)(LoginPage)
