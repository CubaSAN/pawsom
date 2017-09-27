import { connect } from 'react-redux'
import { AppRouter } from './AppRouter'

const mapStateToProps = state => {
  return {
    routing: state.routing,
    isAuthenticated: state.isAuthenticated
  }
};

export const RouterContainer = connect(
  mapStateToProps
)(AppRouter)
