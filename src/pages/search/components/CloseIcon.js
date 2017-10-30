
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FaClose from 'react-icons/lib/fa/close'
import autoBind from 'react-autobind'

export class CloseIcon extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    item: PropTypes.any.isRequired
  }

  constructor(props) {
    super(props)

    autoBind(this)
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
