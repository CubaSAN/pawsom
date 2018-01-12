import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { Gallery } from '../../../shared/components/Gallery'
import { ImageGallery } from '../../../shared/components/ImageGallery'
//import Gallery from 'react-photo-gallery';
// import Lightbox from 'react-images';
import { FormattedMessage } from 'react-intl'
import FaPhone from 'react-icons/lib/fa/phone'

import { messages } from '../../../localization'

const CN = 'search-page'


export class ModalPopup extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    className: PropTypes.string,
    toggle: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired    
  }

  // constructor() {
  //   super();
  //   this.state = { currentImage: 0 };
  //   this.closeLightbox = this.closeLightbox.bind(this);
  //   this.openLightbox = this.openLightbox.bind(this);
  //   this.gotoNext = this.gotoNext.bind(this);
  //   this.gotoPrevious = this.gotoPrevious.bind(this);
  // }

  // openLightbox(event, obj) {
  //   this.setState({
  //     currentImage: obj.index,
  //     lightboxIsOpen: true,
  //   });
  // }

  // closeLightbox() {
  //   this.setState({
  //     currentImage: 0,
  //     lightboxIsOpen: false,
  //   });
  // }

  // gotoPrevious() {
  //   this.setState({
  //     currentImage: this.state.currentImage - 1,
  //   });
  // }

  // gotoNext() {
  //   this.setState({
  //     currentImage: this.state.currentImage + 1,
  //   });
  // }

  renderHeader() {
    const { data: { finding } } = this.props

    return finding.petName ?
      (<span><FormattedMessage id='lost.petlost'/> - {finding.breedName}, <FormattedMessage id='lost.petname'/> {finding.petName}</span>) :
      (<span><FormattedMessage id='lost.found'/>  - {finding.breedName}</span>)
  }

  renderMainContent() {
    const { data: { finding } } = this.props
    const {locale} = this.props
    
    return (
      <div>
        <div><b>{finding.breedName}</b> <FormattedMessage id='lost.foundaround'/> :</div>
        <div className={`${CN}__search-item-address`}> {finding.localityName}</div>
        <div className={`${CN}__search-item-name`}><FormattedMessage id='lost.foundby'/>: {finding.foundBy},</div>
        <div className={`${CN}__search-item-phone`}>
          <FaPhone />
          <a className={`${CN}__search-item-phone-link`}
            href={`tel:${finding.phoneNumber}`}
          >
            {` ${finding.phoneNumber}`}
          </a>
          <span></span>
        </div> 
        <div>{finding.additionalInformation}</div>


      </div>
    )
  }

  // prepareImages(images) {
  //   return images.map((image) => {
  //     return {
  //       src: image,
  //       width: 4,
  //       height: 3
  //     }
  //   })
  // }

  render() {
    const { data: { finding } } = this.props

    return (
      <Modal className={this.props.className}
        isOpen={this.props.isOpen}
      >
        <ModalHeader>{this.renderHeader()}</ModalHeader>
        <ModalBody>
          <Row>
            {
              finding.urls.length ?
                (
                  <Col xs={12}>
                    {/* <Gallery photos={this.prepareImages(finding.urls)} /> */}
                    {/* <Gallery photos={this.prepareImages(finding.urls)} onClick={this.openLightbox} /> */}

                    <ImageGallery images={finding.urls} />
                    {/* <Lightbox images={this.prepareImages(finding.urls)}
                      onClose={this.closeLightbox}
                      onClickPrev={this.gotoPrevious}
                      onClickNext={this.gotoNext}
                      currentImage={this.state.currentImage}
                      isOpen={this.state.lightboxIsOpen}
                    /> */}
                  </Col>
                ) :
                (
                  <Col lg={4}
                    xs={12}
                  >
                    {this.renderMainContent()}
                  </Col>
                )
            }

            {
              !!finding.urls.length &&
                (
                  <Col lg={4}
                    xs={12}
                  >
                    {this.renderMainContent()}
                  </Col>
                )
            }
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="success"
            onClick={this.props.toggle}
          >Back</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
