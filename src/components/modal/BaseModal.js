import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';

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
        isOpen={isOpen} onRequestClose={onRequestClose} closeTimeoutMS={closeTimeoutMS}
        style={{ overlay: {
          backgroundColor: 'rgba(0,0,0,.4)',
          zIndex: 1000000,
          // animation: 'fadeIn 0.15s ease-out'
        }, content: {
          top: '50%',
          left: '50%',
          width: '780px',
          maxHeight: '90%',
          right: 'auto',
          bottom: 'auto',
          border: 0,
          overflow: 'visible',
          overflowY: 'auto',
          transform: 'translate(-50%, -50%)',
          boxShadow: '1px 1px 2px 0 rgba(0, 0, 0, .2)',
          padding: 0,
          borderRadius: 0
        } }}
      >
        <div className={classNames('modal-component', className)}>
          {children}
        </div>
      </Modal>
    );
  }
}
