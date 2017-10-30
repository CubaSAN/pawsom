import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Route,
  Redirect
} from 'react-router-dom'
import autoBind from 'react-autobind'

export class NoGeoRoute extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.any.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    withGeolocation: PropTypes.bool
  }

  constructor(props) {
    super(props)

    autoBind(this)
  }

  privateRenderer() {
    const { component: RouteComponent, withGeolocation, isAuthenticated } = this.props

    if (!isAuthenticated && !withGeolocation) {
      return <Redirect
        to={{ pathname: '/login', state: { from: this.props.location } }} />
    } else if (isAuthenticated && !withGeolocation) {
      return <Redirect
        to={{ pathname: '/feed/0', state: { from: this.props.location } }} />
    } else {
      return <RouteComponent {...this.props} />
    }
  }

  render() {
    return (
      <Route render={this.privateRenderer} />
    )
  }
}
