
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import autoBind from 'react-autobind'

export class ActionButton extends Component {
  static propTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    finding: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    autoBind(this)
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
