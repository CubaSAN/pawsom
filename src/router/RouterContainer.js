import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AppRouter } from './AppRouter'
import { getLocation } from '../actions'

const mapStateToProps = state => {
  const { routing, auth } = state

  return {
    routing,
    user: auth.user
  }
}

const mapDispatchToProps = dispatch => ({
  getLocation: bindActionCreators(getLocation, dispatch)
})

export const RouterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter)
