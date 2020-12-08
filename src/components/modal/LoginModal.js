import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  acknowledgeAuthError as acknowledgeAuthErrorAction,
  createAccount as createAccountAction,
  ERROR_AUTH,
  signIn as signInAction,
} from '../../actions/auth';
import ForgottenPasswordModal from './ForgottenPasswordModal';
import RemoveIcon from '../icon/RemoveIcon';
import Modal from './Modal';
import styles from '../../styles/main.module.scss';

function LoginModal({ isOpen, onClose, error, loading, signIn, createAccount, acknowledgeAuthError }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPasswordModalOpen, setFPModalOpen] = useState(false);

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const signInClick = async () => {
    const output = await signIn(email, password);
    if (output.type !== ERROR_AUTH) {
      resetForm();
    }
  };

  const createAccountClick = async () => {
    const output = await createAccount(email, password);
    if (output.type !== ERROR_AUTH) {
      resetForm();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('Sign in/Create account')} doneAction={onClose} showFooter={false}>
      <div className={styles['container-fluid']}>
        <p>{t('Signing in will sync your settings across multiple browsers or devices.')}</p>
        <p>
          {t('When you first sign in it will use your current settings to set up the account, but once an account is'
          + ' set-up logging in will overwrite any settings you stored as a guest.')}
        </p>
        {loading ? (
          <div>{t('Loading')}</div>
        ) : (
          <form onSubmit={(e) => {
            e.preventDefault();
            signInClick();
          }}
          >
            {error && (
              <div className={`${styles.alert} ${styles['alert-warning']} ${styles['alert-dismissible']}`} role="alert">
                <button type="button" aria-label="Close" onClick={acknowledgeAuthError} className={styles.close}>
                  <RemoveIcon />
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
            <div className={styles['form-group']}>
              <label htmlFor="loginPassword">{t('Password')}</label>
              <input
                type="password"
                className={styles['form-control']}
                id="loginPassword"
                placeholder={t('Password')}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className={styles['form-group']}>
              <a href="" onClick={(e) => { e.preventDefault(); setFPModalOpen(true); }}>
                {t('Forgotten password?')}
              </a>
            </div>

            <button type="submit" className={`${styles.btn} ${styles['btn-default']}`}>{t('Sign in')}</button>
            <button
              type="button"
              className={styles.btn}
              onClick={(e) => {
                e.preventDefault();
                createAccountClick();
              }}
            >
              {t('Create account')}
            </button>
          </form>
        )}

      </div>
      <ForgottenPasswordModal
        isOpen={forgotPasswordModalOpen}
        onClose={() => setFPModalOpen(false)}
      />
    </Modal>
  );
}

LoginModal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  createAccount: PropTypes.func.isRequired,
  acknowledgeAuthError: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  loading: PropTypes.bool.isRequired,
};

LoginModal.defaultProps = {
  onClose: () => {},
  isOpen: false,
  error: null,
};

const mapStateToProps = (state) => ({
  error: state.auth.errorAuth,
  loading: state.auth.loadingAuth,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signIn: signInAction,
  createAccount: createAccountAction,
  acknowledgeAuthError: acknowledgeAuthErrorAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
