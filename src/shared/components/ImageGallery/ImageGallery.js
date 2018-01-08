import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ReactImage } from './components/ReactImage'
import Lightbox from 'react-images';
import './ImageGallery.scss'

const CN = 'gallery'

export class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired
  }


  constructor(props) {
    super(props);
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }


  openLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: true,
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }


  renderLayout() {
    const { images } = this.props

    switch(images.length) {
      case 1:
        return this.renderForOneLayout()
      case 2:
        return this.renderForTwoLayout()
      case 3:
        return this.renderForThreeLayout()
      case 4:
        return this.renderMultipleLayout()
      default:
        return this.renderMultipleLayout()
    }
  }


  renderForOneLayout() {
    const { images } = this.props

    return (
      <div
        className={`${CN}__horizontal-holder`}
        index={1}
      >
        {this.renderImage(images[0])}
      </div>
    )
  }


  renderForTwoLayout() {
    const { images } = this.props

    return (
      <div className={`${CN}__wrapper`}>
        <div className={`${CN}__vertical-holder half-width-wrapper`} index={1}>
          {this.renderImage(images[0])}
        </div>
        <div className={`${CN}__vertical-holder half-width-wrapper`} index={2}>
          {this.renderImage(images[1])}
        </div>
      </div>
    )
  }


  renderForThreeLayout() {
    const { images } = this.props

    return (
      <div className={`${CN}__wrapper`}>
        <div className={`${CN}__vertical-holder half-width-wrapper`} index={1}>
          {this.renderImage(images[0])}
        </div>
        <div className={`${CN}__vertical-holder half-width-wrapper`}>
          <div className={`${CN}__horizontal-holder half-heigth-wrapper`} index={2}>
            {this.renderImage(images[1])}
          </div>
          <div className={`${CN}__horizontal-holder half-heigth-wrapper`} index={3}>
            {this.renderImage(images[2])}
          </div>
        </div>
      </div>
    )
  }


  renderMultipleLayout() {
    const { images } = this.props

    return (
      <div className={`${CN}__wrapper`}>
        <div className={`${CN}__vertical-holder half-width-wrapper`} index={1}>
          {this.renderImage(images[0])}
        </div>
        <div className={`${CN}__vertical-holder half-width-wrapper`}>
          <div className={`${CN}__horizontal-holder third-heigth-wrapper`} index={2}>
            {this.renderImage(images[1])}
          </div>
          <div className={`${CN}__horizontal-holder third-heigth-wrapper`} index={3}>
            {this.renderImage(images[2])}
          </div>
          <div className={`${CN}__horizontal-holder third-heigth-wrapper`} index={4}>
            {this.renderImage(images[3])}
            {
              images.length > 4 &&
              <div className={`${CN}__more  third-heigth-wrapper`}>{`and ${images.length - 4} more`}</div>
            }
          </div>
        </div>
      </div>
    )
  }


  renderImage(imageSrc) {
    return (
      <ReactImage src={imageSrc} />
    )
  }


  prepareImages() {
    const { images } = this.props

    return images.map((image) => {
      return {
        src: image
      }
    })
  }


  render () {
    return (
      <div 
        className={CN}
        onClick={this.openLightbox}
      >
        {this.renderLayout()}
        <Lightbox images={this.prepareImages()}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
        />
      </div>
    )
  }
}
