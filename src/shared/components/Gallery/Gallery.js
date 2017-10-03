import React, {Component} from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import ImageGallery from 'react-image-gallery'
import './Gallery.scss'

const CN = 'gallery'

export class Gallery extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      isLoaded: false
    }

    autoBind(this)
  }

  handleImageLoad() {
    if (this.state.isLoaded) return

    this.setState({
      isLoaded: true
    })
  }

  render() {
    const { images } = this.props

    const imagesData = images.map(imageUrl => {
      return {
        original: imageUrl
      }
    })

    return (
      <div className={CN}>
        <ImageGallery
          items={imagesData}
          slideInterval={2000}
          onImageLoad={this.handleImageLoad}
          showThumbnails={false}
          showPlayButton={false}
        />
      </div>
    )
  }

}
