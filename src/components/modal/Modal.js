import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import BaseModal from './BaseModal';

import './styles/modal.scss';

export class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    doneAction: PropTypes.func,
    doneButtonText: PropTypes.string,
    t: PropTypes.func.isRequired,
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
    e.stopPropagation();

    this.props.onClose(e);
  }

  clickDone(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.doneAction(e);
  }

  render() {
    const { children, title, isOpen, onClose, doneButtonText, t } = this.props;

    return (<BaseModal isOpen={isOpen} onRequestClose={onClose}>
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
          <button type='button' className='btn btn-primary' onClick={this.clickDone.bind(this)}>{t(doneButtonText)}</button>
        </div>
      </div>
    </BaseModal>);
  }
}

export default withTranslation()(Modal);
