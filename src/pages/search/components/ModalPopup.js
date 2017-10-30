import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Gallery } from '../../../shared/components/Gallery'

export class ModalPopup extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    className: PropTypes.string,
    toggle: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
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

  render() {
    const { data: { finding } } = this.props
    debugger;

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
                    <Gallery images={finding.urls} />
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
