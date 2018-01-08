import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './ReactImage.scss'

const CN = 'react-image'

export class ReactImage extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired
  }


  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      direction: ''
    }

    this._image = null
  }


  componentDidMount() {
    this.loadImage()
  }


  loadImage() {
    const { src } = this.props

    this._image = new Image()
    this._image.src = src

    this._image.onload = this.onImageLoad.bind(this)
    this._image.onerror = this.onError.bind(this)
  }


  onImageLoad(event) {
    const imageElement = event.currentTarget
    const direction = 
      imageElement.height <= imageElement.width ? 'horizontal' : 'vertical'

    this.setState({
      isLoading: false,
      isError: false,
      direction
    }, 
    this.createMarkup.bind(this, imageElement)
    )
  }


  onError() {
    this.setState({
      isLoading: false,
      isError: true
    })
  }


  createMarkup() {
    const { isLoading, isError } = this.state

    if (!isError && !isLoading) {
      return { __html: this._image.outerHTML }
    }

    return { __html: '' }
  }


  render () {
    const { isLoading, direction, isError } = this.state

    const className = 
      cx(
        CN,
        {[`${CN}--${direction}`]: direction},
        {[`${CN}--loading`]: isLoading},
        {[`${CN}--error`]: isError }
      )

    return (
      <div 
        className={className} 
        dangerouslySetInnerHTML={this.createMarkup()}
      />
    )
  }
}
