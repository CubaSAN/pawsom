import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AppRouter } from './AppRouter'
import { getLocation } from '../actions'

const mapStateToProps = state => {
  const { routing, auth, navigator: { err } } = state

  return {
    routing,
    user: auth.user,
    err
  }
}

const mapDispatchToProps = dispatch => ({
  getLocation: bindActionCreators(getLocation, dispatch)
})

export const RouterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter)
