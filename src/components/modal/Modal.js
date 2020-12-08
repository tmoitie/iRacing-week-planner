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
      if (e.keyCode === 27) {
        onClose();
      }
    };

    document.addEventListener('keydown', escapeModal);

    return () => {
      document.removeEventListener('keydown', escapeModal);
    };
  }, []);

  return (
    <BaseModal isOpen={isOpen} onRequestClose={onClose}>
      <div className={styles['modal-content']}>
        <div className={styles['modal-header']}>
          <button type="button" className={styles.close} onClick={close}>
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
