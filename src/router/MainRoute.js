import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Route,
  Redirect
} from 'react-router-dom'
import autoBind from 'react-autobind'

export class MainRoute extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.any.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    withGeolocation: PropTypes.bool,
    isHome: PropTypes.bool
  }

  constructor(props) {
    super(props)

    autoBind(this)
  }

  privateRenderer() {
    const { component: RouteComponent, withGeolocation, isHome } = this.props

    if (withGeolocation && !isHome) {
      return (
        <Redirect to={{ pathname: '/nogeo' }} />
      )
    }

    return !this.props.isAuthenticated ?
      (
        <RouteComponent {...this.props} />
      ) :
      (
        <Redirect
          to={{ pathname: '/feed/:id', state: { from: this.props.location } }} />
      )
  }

  render() {
    return (
      <Route render={this.privateRenderer} />
    )
  }
}
