// @flow
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { acknowledgeAuthError, createAccount, ERROR_AUTH, signIn } from '../../actions/auth';
import ForgottenPasswordModal from './ForgottenPasswordModal';
import RemoveIcon from '../icon/RemoveIcon';
import Modal from './Modal';
import styles from '../../styles/main.module.scss';

const errorSelector = (state) => state.auth.errorAuth;
const loadingSelector = (state) => state.auth.loadingAuth;

type Props = {
  isOpen?: boolean,
  onClose: () => void,
};

const defaultProps = {
  isOpen: false,
};

export default function LoginModal({ isOpen, onClose }: Props) {
  const { t } = useTranslation();
  const error = useSelector(errorSelector, shallowEqual);
  const loading = useSelector(loadingSelector);
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [forgotPasswordModalOpen, setFPModalOpen] = React.useState(false);

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const signInClick = async () => {
    const output = await dispatch(signIn(email, password));
    if (output.type !== ERROR_AUTH) {
      resetForm();
    }
  };

  const createAccountClick = async () => {
    const output = await dispatch(createAccount(email, password));
    if (output.type !== ERROR_AUTH) {
      resetForm();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('Sign in/Create account')}
      doneAction={onClose}
      showFooter={false}
    >
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
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => dispatch(acknowledgeAuthError())}
                  className={styles.close}
                >
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
                autoComplete="username"
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
                autoComplete="current-password"
                value={password}
              />
            </div>
            <div className={styles['form-group']}>
              <a
                id="buttonOpenForgottenPassword"
                href=""
                onClick={(e) => { e.preventDefault(); setFPModalOpen(true); }}
              >
                {t('Forgotten password?')}
              </a>
            </div>

            <button type="submit" className={`${styles.btn} ${styles['btn-default']}`}>{t('Sign in')}</button>
            <button
              type="button"
              className={styles.btn}
              id="createAccountButton"
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

LoginModal.defaultProps = defaultProps;
