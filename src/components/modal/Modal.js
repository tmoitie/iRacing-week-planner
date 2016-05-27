import React, { Component, PropTypes } from 'react';

import BaseModal from './BaseModal';

import './styles/modal.scss';

export default class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    doneAction: PropTypes.func,
    doneButtonText: PropTypes.string
  };

  static defaultProps = {
    isOpen: false,
    onClose: () => {},
    doneAction: () => {},
    doneButtonText: 'Close'
  };

  constructor(props) {
    super(props);

    this.escapeModal = this.escapeModal.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.escapeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.escapeModal);
  }

  escapeModal(e) {
    if (e.keyCode === 27) {
      this.close(e);
    }
  }

  close(e) {
    e.preventDefault();

    this.props.onClose(e);
  }

  render() {
    const { children, title, isOpen, onClose, doneAction, doneButtonText } = this.props;

    return (<BaseModal isOpen={isOpen} onRequestClose={onClose}>
      <div className='modal-overlay'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' onClick={this.close.bind(this)}>
                <span className='glyphicon glyphicon-remove' />
              </button>
              <h4 className='modal-title'>{title}</h4>
            </div>
            <div className='modal-body' style={{ maxHeight: '55vh', overflowY: 'auto' }}>
              {children}
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-primary' onClick={doneAction}>{doneButtonText}</button>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>);
  }
}
