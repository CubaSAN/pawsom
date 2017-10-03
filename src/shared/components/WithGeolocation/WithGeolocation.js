
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './WithGeolocation.scss'

const CN = 'with-geolocation'

export class WithGeolocation extends Component {
  static propTypes = {
    isPageAvailable: PropTypes.bool.isRequired
  }

  render() {
    const { isPageAvailable } = this.props

    return (
      <div className={`${CN} ${CN}--${isPageAvailable ? 'hidden' : 'visible'}`}>
        <div>{this.props.children}</div>
        <div className={`${CN}__message ${CN}__message--${isPageAvailable ? 'hidden' : 'visible'}`}>
          Please wait while browser check your current location
        </div>
      </div>
    )
  }
}
