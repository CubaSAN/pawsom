
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FaClose from 'react-icons/lib/fa/close'

export class CloseIcon extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    item: PropTypes.any.isRequired
  }

  onClickHandler() {
    const { onClick, item } = this.props

    onClick(item)
  }

  render() {
    return (
      <FaClose
        onClick={this.onClickHandler}
      />
    )
  }
}
