import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  acknowledgeAuthError as acknowledgeAuthErrorAction,
  ERROR_RESET,
  forgottenPassword as forgottenPasswordAction,
} from '../../actions/auth';
import Modal from './Modal';
import styles from '../../styles/main.module.scss';

function ForgottenPasswordModal({ isOpen, onClose, error, loading, forgottenPassword, acknowledgeAuthError }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [thanksModal, setThanksModal] = useState(false);

  const submitClick = async () => {
    const output = await forgottenPassword(email);
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
                <button className={styles.close} type="button" aria-label="Close" onClick={acknowledgeAuthError}>
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

ForgottenPasswordModal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  forgottenPassword: PropTypes.func.isRequired,
  acknowledgeAuthError: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  loading: PropTypes.bool.isRequired,
};

ForgottenPasswordModal.defaultProps = {
  onClose: () => {},
  isOpen: false,
  error: null,
};

const mapStateToProps = (state) => ({
  error: state.auth.errorReset,
  loading: state.auth.loadingReset,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  forgottenPassword: forgottenPasswordAction,
  acknowledgeAuthError: acknowledgeAuthErrorAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgottenPasswordModal);
