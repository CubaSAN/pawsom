import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isObject from 'is-object'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { HomePage } from '../pages/home'
import { SearchPageContainer } from '../pages/search'
import { NoMatchPage } from '../pages/nomatch'
import { Accommodation } from '../pages/accommodation'
import { LoginPageContainer } from '../pages/login'
import { FeedPageContainer } from '../pages/feed'
import { history } from '../store'
import { ConnectedRouter } from 'react-router-redux'
import { withRouter } from 'react-router-dom'

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
    user: PropTypes.object,
    getLocation: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.getLocation()
  }

  render() {
    const { user } = this.props
    const isAuthenticated = isObject(user)

    return (
      <ConnectedRouter history={history}>
        <Switch>
          <MainRoute
            path="/"
            exact
            component={HomePage}
            isAuthenticated={isAuthenticated}
          />

          <PrivateRoute
            path="/search"
            component={SearchPageContainer}
            isAuthenticated={isAuthenticated}
          />

          <PrivateRoute
            path="/accommodation"
            component={Accommodation}
            isAuthenticated={isAuthenticated}
          />

          <PrivateRoute
            path="/feed"
            component={FeedPageContainer}
            isAuthenticated={isAuthenticated}
          />

          <MainRoute
            path="/login"
            component={LoginPageContainer}
            isAuthenticated={isAuthenticated}
          />

          <Route component={NoMatchPage} />
        </Switch>
      </ConnectedRouter>
    )
  }
}
