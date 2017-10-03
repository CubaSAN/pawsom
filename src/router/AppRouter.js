import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isObject from 'is-object'
import {
  Route,
  Switch
} from 'react-router-dom'
import { HomePage } from '../pages/home'
import { SearchPageContainer } from '../pages/search'
import { NoMatchPage } from '../pages/nomatch'
import { Accommodation } from '../pages/accommodation'
import { LoginPageContainer } from '../pages/login'
import { FeedPageContainer } from '../pages/feed'
import { history } from '../store'
import { ConnectedRouter } from 'react-router-redux'
import { MainRoute } from './MainRoute'
import { PrivateRoute } from './PrivateRoute'

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
