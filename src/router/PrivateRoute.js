import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Route,
  Redirect
} from 'react-router-dom'
import autoBind from 'react-autobind'

export class PrivateRoute extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.any.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)

    autoBind(this)
  }

  privateRenderer() {
    const { component: RouteComponent } = this.props

    return this.props.isAuthenticated ?
      (
        <RouteComponent {...this.props} />
      ) :
      (
        <Redirect
          to={{ pathname: '/login', state: { from: this.props.location } }} />
      )
  }

  render() {
    return (
      <Route render={this.privateRenderer} />
    )
  }
}
