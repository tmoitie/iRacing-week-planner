import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { acknowledgeAuthError, createAccount, signIn } from '../../actions/auth';
import Modal from './Modal';

function LoginModal({ isOpen, onClose, error, loading, signIn, acknowledgeAuthError }) {
  const { t } = useTranslation();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const signInClick = async () => {
    const result = await signIn(email, password);
    console.log(result);
  };

  const createAccountClick = () => {
    createAccount(email, password);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('Sign in/Create Account')} doneAction={onClose} showFooter={false}>
      <div className='container-fluid'>
        <p>{t('Signing in will sync your settings across multiple browsers or devices.')}</p>
        <p>{t('When you first sign in it will use your current settings to set up the account, but once an account is' +
          ' set up logging in will overwrite any settings you stored as a guest.')}</p>
        <form onSubmit={(e) => {
          e.preventDefault();
          signInClick();
        }}>
          {error && (
            <div className="alert alert-warning alert-dismissible" role="alert">
              <button type="button" aria-label="Close" onClick={acknowledgeAuthError}><span
                aria-hidden="true">&times;</span></button>
              {t(error)}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="loginEmail">{t('Email address')}</label>
            <input type="email" className="form-control" id="loginEmail" placeholder={t('Email address')}
                   onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>
          <div className="form-group">
            <label htmlFor="loginPassword">{t('Password')}</label>
            <input type="password" className="form-control" id="loginPassword" placeholder={t('Password')}
                   onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>
          <button type="submit" className="btn btn-default">Sign In</button>
          <button type="button" className="btn" onClick={createAccountClick}>Create Account</button>
        </form>
      </div>
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
  loading: PropTypes.bool.isRequired
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
  signIn,
  createAccount,
  acknowledgeAuthError,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
