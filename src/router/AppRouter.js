import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { HomePage } from '../pages/home'
import { SearchPage } from '../pages/search'
import { NoMatchPage } from '../pages/nomatch'
import { Accommodation } from '../pages/accommodation'
import { Login } from '../pages/login'
import { Feed } from '../pages/feed'

export const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
)

const MainRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    !isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/feed',
          state: { from: props.location }
        }} />
      )
  )} />
)

export class AppRouter extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <Router>
        <Switch>
          <MainRoute
            path="/"
            exact
            component={HomePage}
            isAuthenticated={isAuthenticated}
          />

          <PrivateRoute
            path="/search"
            component={SearchPage}
            isAuthenticated={isAuthenticated}
          />

          <PrivateRoute
            path="/accommodation"
            component={Accommodation}
            isAuthenticated={isAuthenticated}
          />

          <PrivateRoute
            path="/feed"
            component={Feed}
            isAuthenticated={isAuthenticated}
          />

          <MainRoute
            path="/login"
            component={Login}
            isAuthenticated={isAuthenticated}
          />

          <Route component={NoMatchPage} />
        </Switch>
      </Router>
    )
  }
}
