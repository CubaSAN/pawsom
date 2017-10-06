import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import { Marker } from 'react-google-maps'

export class MapMarker extends Component {
  static propTypes = {
    position: PropTypes.object.isRequired,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    finding: PropTypes.object
  }

  constructor(props) {
    super(props)

    autoBind(this)
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
