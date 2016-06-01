import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';

Modal.setAppElement(document.getElementById('root'));

export default class BaseModal extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object.isRequired,
    className: PropTypes.string,
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func,
    closeTimeoutMS: PropTypes.number
  };

  static defaultProps = {
    style: {}
  };

  render() {
    const { isOpen, onRequestClose, closeTimeoutMS, children, className } = this.props;

    return (
      <Modal
        onRequestClose={onRequestClose} closeTimeoutMS={closeTimeoutMS} isOpen={isOpen}
        className={classNames('Modal__Bootstrap', 'modal-dialog', 'modal-lg', className)}
        ariaHideApp={false}
      >
        {children}
      </Modal>
    );
  }
}
