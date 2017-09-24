import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { HomePage } from '../pages/home'
import { SearchPage } from '../pages/search'
import { NoMatchPage } from '../pages/nomatch'
import { Accommodation } from '../pages/accommodation'
import { Login } from '../pages/login'
import { Feed } from '../pages/feed'

const isAuthenticated = false;

export const PrivateRoute = ({ component: Component, ...rest }) => (
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

const MainRoute = ({ component: Component, ...rest }) => (
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
    return (
      <Router>
        <Switch>
          <MainRoute path="/" exact component={HomePage} />

          <PrivateRoute path="/search" component={SearchPage} />
          <PrivateRoute path="/accommodation" component={Accommodation} />
          <PrivateRoute path="/feed" component={Feed} />

          <MainRoute path="/login" component={Login} />
          <Route component={NoMatchPage} />
        </Switch>
      </Router>
    )
  }
}
