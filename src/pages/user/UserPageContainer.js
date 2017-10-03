import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { UserPage } from './UserPage'
import { addUser } from '../../actions'

const mapStateToProps = state => {
  const { auth } = state;

  return {
    user: auth.user
  }
}

const mapDispatchToProps = dispatch => ({
  onAddUser: bindActionCreators(addUser, dispatch)
})

export const UserPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage)
