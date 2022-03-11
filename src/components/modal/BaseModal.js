// @flow

import * as React from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';

import styles from '../../styles/main.module.scss';

Modal.setAppElement(document.getElementById('root'));

type Props = {
  isOpen: boolean,
  onRequestClose: () => void,
  closeTimeoutMS?: ?number,
  children: ?React.Node,
  className?: ?string,
  id?: ?string,
};

const defaultProps = {
  className: null,
  closeTimeoutMS: null,
  id: undefined,
};

export default function BaseModal({ isOpen, onRequestClose, closeTimeoutMS, children, className, id }: Props) {
  return (
    <Modal
      onRequestClose={onRequestClose}
      closeTimeoutMS={closeTimeoutMS}
      isOpen={isOpen}
      className={classNames('Modal__Bootstrap', styles['modal-dialog'], styles['modal-lg'], className)}
      ariaHideApp={false}
      id={id}
    >
      {children}
    </Modal>
  );
}

BaseModal.defaultProps = defaultProps;
