import { connect } from 'react-redux'
import { AppRouter } from './AppRouter'

const mapStateToProps = state => {
  const { routing, auth } = state

  return {
    routing,
    isAuthenticated: auth.isAuthenticated
  }
};

export const RouterContainer = connect(
  mapStateToProps
)(AppRouter)
