import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Gallery.scss'

const CN = 'lightbox-gallery'

export class Gallery extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired
  }

  renderOne() {
    const { images } = this.props

    return (
      <div className={`${CN}__image-container`}>
        <div className={`${CN}__image-wrapper ${CN}__image-wrapper--ratio-4-3`}>
          <div className='content'>
            <img
              src={images[0].src}
              alt=''
            />
          </div>
        </div>
      </div>
    )
  }

  renderTwo() {
    const { images } = this.props

    return (
      <div className={`${CN}__image-container`}>
        {
          images.map((image, i) => 
            (
              <div key={i} className={`${CN}__image-container--half`}>
                <div className={`${CN}__image-wrapper ${CN}__image-wrapper--ratio-2-3`}>
                  <div className='content'>
                    <img
                      src={image.src}
                      alt=''
                    />
                  </div>
                </div>
              </div>
            )
          )
        }
      </div>
    )
  }

  renderThree() {
    const { images } = this.props

    return (
      <div className={`${CN}__image-container`}>
        <div className={`${CN}__image-container--half`}>
          <div className={`${CN}__image-wrapper ${CN}__image-wrapper--ratio-2-3`}>
            <div className='content'>
              <img
                src={images[0].src}
                alt=''
              />
            </div>
          </div>
        </div>
        <div className={`${CN}__image-container--half`}>
          <div className={`${CN}__image-wrapper ${CN}__image-wrapper--ratio-4-3`}>
            <div className='content'>
              <img
                src={images[1].src}
                alt=''
              />
            </div>
          </div>
          <div className={`${CN}__image-wrapper ${CN}__image-wrapper--ratio-4-3`}>
            <div className='content'>
              <img
                src={images[2].src}
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderMany() {
    return this.renderThree()
  }


  renderPreview() {
    const { images } = this.props
    const imagesCount = images.length

    if (!imagesCount) return null

    if (imagesCount >= 4) {
      return this.renderMany()
    } else if (imagesCount === 1) {
      return this.renderOne()
    } else if (imagesCount === 2) {
      return this.renderTwo()
    } else if (imagesCount === 3) {
      return this.renderThree()
    } else {
      return null
    }
  }

  render() {
    return (
      <div className={CN}>
        <div className={`${CN}__preview`}>
          {this.renderPreview()}
        </div>
      </div>
    )
  }
}
