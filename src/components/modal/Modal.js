// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import RemoveIcon from '../icon/RemoveIcon';

import BaseModal from './BaseModal';

import './styles/modal.scss';

import styles from '../../styles/main.module.scss';

type Props = {
  children: React.node,
  title: string,
  isOpen?: boolean,
  onClose?: () => void,
  doneButtonText?: string,
  showFooter?: boolean,
  doneAction?: () => void,
  id: string,
};

const defaultProps = {
  isOpen: false,
  onClose: () => {},
  doneAction: () => {},
  doneButtonText: 'Close',
  showFooter: true,
};

export default function Modal({
  children,
  title,
  isOpen,
  onClose,
  doneButtonText,
  showFooter,
  doneAction,
  id,
}: Props): React.Node {
  const { t } = useTranslation();

  const close = (e) => {
    e.preventDefault();
    e.stopPropagation();

    onClose(e);
  };

  const clickDone = (e) => {
    e.preventDefault();
    e.stopPropagation();

    doneAction();
  };

  React.useEffect(() => {
    const escapeModal = (e) => {
      if (e.code !== undefined && e.code === 'Escape') {
        onClose();
        e.preventDefault();
        return;
      }
      if (e.keyCode !== undefined && e.keyCode === 27) {
        onClose();
        e.preventDefault();
      }
    };

    document.addEventListener('keypress', escapeModal);

    return () => {
      document.removeEventListener('keypress', escapeModal);
    };
  }, []);

  return (
    <BaseModal isOpen={isOpen} onRequestClose={onClose} id={id}>
      <div className={styles['modal-content']}>
        <div className={styles['modal-header']}>
          <button type="button" className={styles.close} onClick={close} aria-label="Close">
            <RemoveIcon />
          </button>
          <h4 className={styles['modal-title']}>{title}</h4>
        </div>
        <div className={styles['modal-body']} style={{ maxHeight: '55vh', overflowY: 'auto' }}>
          {children}
        </div>
        {showFooter && (
          <div className={styles['modal-footer']}>
            <button type="button" className={`${styles.btn} ${styles['btn-primary']}`} onClick={clickDone}>
              {t(doneButtonText)}
            </button>
          </div>
        )}
      </div>
    </BaseModal>
  );
}

Modal.defaultProps = defaultProps;
