import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { Gallery } from '../../../shared/components/Gallery'
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

export class ModalPopup extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    className: PropTypes.string,
    toggle: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
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

  renderHeader() {
    const { data: { finding } } = this.props

    return finding.petName ? 
      (<span>Lost pet - {finding.breedName}, pet name {finding.petName}</span>) :
      (<span>Found pet - {finding.breedName}</span>)
  }

  renderMainContent() {
    const { data: { finding } } = this.props

    return (
      <div>
        <div>{finding.breedName} was found around:</div>
        <div>{finding.localityName}</div>
        <div>Found by: {finding.foundBy},</div>
        <div>more information, phone: {finding.phoneNumber}</div>
        <div>{finding.additionalInformation}</div>
      </div>
    )
  }

  prepareImages(images) {
    return images.map((image) => {
      return {
        src: image,
        width: 4,
        height: 3
      }
    })
  }

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
                  <Col lg={8}
                    xs={12}
                  >
                    {/* <Gallery photos={this.prepareImages(finding.urls)} /> */}
                    <Gallery photos={this.prepareImages(finding.urls)} onClick={this.openLightbox} />
                    <Lightbox images={this.prepareImages(finding.urls)}
                      onClose={this.closeLightbox}
                      onClickPrev={this.gotoPrevious}
                      onClickNext={this.gotoNext}
                      currentImage={this.state.currentImage}
                      isOpen={this.state.lightboxIsOpen}
                    />
                  </Col>
                ) :
                (
                  <div>
                    {this.renderMainContent()}
                  </div>
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
