
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

export class ActionButton extends Component {
  static propTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    finding: PropTypes.object.isRequired
  }

  onClickHandler() {
    const { onClick, finding } = this.props

    onClick(finding)
  }

  render() {
    const { color } = this.props

    return (
      <Button 
        color={color}
        onClick={this.onClickHandler}
      >
        Details
      </Button>
    )
  }
}
