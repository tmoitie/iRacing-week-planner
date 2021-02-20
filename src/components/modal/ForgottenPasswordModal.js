// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  acknowledgeAuthError,
  ERROR_RESET,
  forgottenPassword,
} from '../../actions/auth';
import Modal from './Modal';
import styles from '../../styles/main.module.scss';

type Props = {
  isOpen?: boolean,
  onClose?: () => void,
};

const defaultProps = {
  onClose: () => {},
  isOpen: false,
};

const errorSelector = (state) => state.auth.errorReset;
const loadingSelector = (state) => state.auth.loadingReset;

export default function ForgottenPasswordModal({ isOpen, onClose }: Props) {
  const error = useSelector(errorSelector, shallowEqual);
  const loading = useSelector(loadingSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [email, setEmail] = React.useState('');
  const [thanksModal, setThanksModal] = React.useState(false);

  const submitClick = async () => {
    const output = await dispatch(forgottenPassword(email));
    if (output.type !== ERROR_RESET) {
      setEmail('');
      setThanksModal(true);
    }
  };

  const closeThanks = () => {
    setThanksModal(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('Reset Password')} doneAction={onClose} showFooter={false}>
      <div className={styles['container-fluid']}>
        <p>{t('Enter your email address to reset your password.')}</p>
        {loading ? (
          <div>{t('Loading')}</div>
        ) : (
          <form onSubmit={(e) => {
            e.preventDefault();
            submitClick();
          }}
          >
            {error && (
              <div className={`${styles.alert} ${styles['alert-warning']} ${styles['alert-dismissible']}`} role="alert">
                <button
                  className={styles.close}
                  type="button"
                  aria-label="Close"
                  onClick={() => dispatch(acknowledgeAuthError())}
                >
                  <span
                    aria-hidden="true"
                  >
                    &times;
                  </span>
                </button>
                {t(error.message)}
              </div>
            )}
            <div className={styles['form-group']}>
              <label htmlFor="loginEmail">{t('Email address')}</label>
              <input
                type="email"
                className={styles['form-control']}
                id="loginEmail"
                placeholder={t('Email address')}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button type="submit" className={`${styles.btn} ${styles['btn-default']}`}>{t('Submit')}</button>
          </form>
        )}
      </div>
      <Modal
        isOpen={thanksModal}
        onClose={closeThanks}
        title={t('Reset Password')}
        doneAction={closeThanks}
      >
        <div className={styles['container-fluid']}>
          <p>{t('Thanks, please check your email for further details.')}</p>
        </div>
      </Modal>
    </Modal>
  );
}

ForgottenPasswordModal.defaultProps = defaultProps;
