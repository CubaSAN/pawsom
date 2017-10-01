import React from 'react';
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class ModalPopup extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    className: PropTypes.string,
    toggle: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  render() {
    const { data: { finding } } = this.props

    return (
      <div>
        <Modal isOpen={this.props.isOpen} className={this.props.className}>
          <ModalHeader>{finding.breedName}</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.props.toggle}>Back</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
