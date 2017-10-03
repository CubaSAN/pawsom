import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Marker } from 'react-google-maps'

export class MapMarker extends Component {
  static propTypes = {
    position: PropTypes.object.isRequired,
    icon: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    finding: PropTypes.object
  }

  onClickHandler() {
    const { finding, onClick } = this.props

    finding && onClick && onClick(finding)
  }

  render () {
    const { position, icon } = this.props

    return (
      <Marker
        position={position}
        icon={icon}
        onClick={this.onClickHandler}
      />
    )
  }
}
