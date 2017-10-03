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
import { NoGeoPage } from '../pages/nogeo'
import { history } from '../store'
import { ConnectedRouter } from 'react-router-redux'
import { MainRoute } from './MainRoute'
import { PrivateRoute } from './PrivateRoute'
import { NoGeoRoute } from './NoGeoRoute'
import { UserPageContainer } from '../pages/user'

export class AppRouter extends Component {
  static propTypes = {
    user: PropTypes.object,
    getLocation: PropTypes.func.isRequired,
    err: PropTypes.bool.isRequired
  }

  componentWillMount() {
    this.props.getLocation()
  }

  render() {
    const { user, err } = this.props
    const isAuthenticated = isObject(user)
    const isAdditionalInfoNeeded = 
      user !== null && user.isAdditionalInfoNeeded

    return (
      <ConnectedRouter history={history}>
        <Switch>
          <MainRoute
            path='/'
            exact
            component={HomePage}
            isAuthenticated={isAuthenticated}
            withGeolocation={err}
            isHome
          />

          <PrivateRoute
            path='/search'
            component={SearchPageContainer}
            isAuthenticated={isAuthenticated}
            withGeolocation={err}
            isAdditionalInfoNeeded={isAdditionalInfoNeeded}
          />

          <PrivateRoute
            path='/accommodation'
            component={Accommodation}
            isAuthenticated={isAuthenticated}
            withGeolocation={err}
            isAdditionalInfoNeeded={isAdditionalInfoNeeded}
          />

          <PrivateRoute
            path='/feed'
            component={FeedPageContainer}
            isAuthenticated={isAuthenticated}
            withGeolocation={err}
            isAdditionalInfoNeeded={isAdditionalInfoNeeded}
          />

          <PrivateRoute
            path='/user'
            component={UserPageContainer}
            isAuthenticated={isAuthenticated}
            isAdditionalInfoNeeded={false}
          />

          <MainRoute
            path='/login'
            component={LoginPageContainer}
            isAuthenticated={isAuthenticated}
            withGeolocation={err}
          />

          <NoGeoRoute
            path='/nogeo'
            component={NoGeoPage}
            isAuthenticated={isAuthenticated}
            withGeolocation={err}
          />

          <Route component={NoMatchPage} />
        </Switch>
      </ConnectedRouter>
    )
  }
}
