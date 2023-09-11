import { describe, test } from '@jest/globals';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
  GoogleAuthProvider,
} from 'firebase/auth';

import '../settings';

import {
  acknowledgeAuthError,
  createAccount,
  ERROR_ACKNOWLEDGE,
  ERROR_AUTH, ERROR_RESET,
  forgottenPassword,
  LOADING_AUTH, LOADING_RESET, RESET_SENT, SIGNED_IN, SIGNED_OUT,
  signIn, signOut, startListener,
  signInWithGoogle,
} from '../auth';

// eslint-disable-next-line jest/no-mocks-import
import { testDispatchOnAuthStateChanged } from '../../../__mocks__/firebase/auth';

jest.mock('firebase/auth');
jest.mock('../settings');

describe('authActions', () => {
  const firebaseAuth = { currentUser: null };
  getAuth.mockReturnValue(firebaseAuth);

  describe('signOut', () => {
    const signOutThunk = signOut();
    test('with sync', async () => {
      const getState = () => ({ auth: { firebaseApp: {} }, settings: { firebaseSynced: false } });
      const dispatch = jest.fn(async () => {});

      await signOutThunk(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({ type: LOADING_AUTH });
      expect(dispatch).toHaveBeenCalledWith({ type: 'SETTINGS/FIREBASE_SYNCED' });
      expect(fbSignOut).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith({ type: SIGNED_OUT });
    });

    test('without sync', async () => {
      const getState = () => ({ auth: { firebaseApp: {} }, settings: { firebaseSynced: true } });
      const dispatch = jest.fn(async () => {});

      await signOutThunk(dispatch, getState);

      expect(dispatch).not.toHaveBeenCalledWith({ type: 'SETTINGS/FIREBASE_SYNCED' });
      expect(fbSignOut).toHaveBeenCalled();
    });
  });

  const getState = () => ({ auth: { firebaseApp: {} } });

  describe('signIn', () => {
    const signInThunk = signIn('test@example.com', '12345678');

    test('success', async () => {
      const dispatch = jest.fn(async () => {});

      const action = await signInThunk(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({ type: LOADING_AUTH });
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(firebaseAuth, 'test@example.com', '12345678');
      expect(action).toEqual({});
    });

    test('error', async () => {
      const dispatch = jest.fn(async () => {});
      signInWithEmailAndPassword.mockRejectedValueOnce({ message: 'Sign in Error' });

      const action = await signInThunk(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({ type: LOADING_AUTH });
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_AUTH, error: { message: 'Sign in Error' } });
      expect(action.type).toEqual(ERROR_AUTH);
    });
  });

  describe('signInWithGoogle', () => {
    const signInWithGoogleThunk = signInWithGoogle();

    test('success', async () => {
      const dispatch = jest.fn(async () => {});

      const action = await signInWithGoogleThunk(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({ type: LOADING_AUTH });
      expect(signInWithPopup).toHaveBeenCalledWith(firebaseAuth, expect.any(GoogleAuthProvider));
      expect(action).toEqual({});
    });

    test('error', async () => {
      const dispatch = jest.fn(async () => {});
      signInWithPopup.mockRejectedValueOnce({ message: 'Sign in Error' });

      const action = await signInWithGoogleThunk(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({ type: LOADING_AUTH });
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_AUTH, error: { message: 'Sign in Error' } });
      expect(action.type).toEqual(ERROR_AUTH);
    });
  });

  describe('createAccount', () => {
    const createAccountThunk = createAccount('test@example.com', '12345678');
    test('success', async () => {
      const dispatch = jest.fn(async () => {});

      const action = await createAccountThunk(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({ type: LOADING_AUTH });
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(firebaseAuth, 'test@example.com', '12345678');
      expect(action).toEqual({});
    });

    test('error', async () => {
      const dispatch = jest.fn(async () => {});
      createUserWithEmailAndPassword.mockRejectedValueOnce({ message: 'Create Account Error' });

      const action = await createAccountThunk(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({ type: LOADING_AUTH });
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_AUTH, error: { message: 'Create Account Error' } });
      expect(action.type).toEqual(ERROR_AUTH);
    });
  });

  test('acknowledgeAuthError', () => {
    const action = acknowledgeAuthError();
    expect(action.type).toBe(ERROR_ACKNOWLEDGE);
  });

  describe('forgottenPassword', () => {
    const forgottenPasswordThunk = forgottenPassword('test@example.com');
    test('success', async () => {
      const dispatch = jest.fn(async () => {});

      const action = await forgottenPasswordThunk(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({ type: LOADING_RESET });
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(firebaseAuth, 'test@example.com');
      expect(dispatch).toHaveBeenCalledWith({ type: RESET_SENT });
      expect(action.type).toBe(RESET_SENT);
    });

    test('error', async () => {
      const dispatch = jest.fn(async () => {});
      sendPasswordResetEmail.mockRejectedValueOnce({ message: 'Reset Error' });

      const action = await forgottenPasswordThunk(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({ type: LOADING_RESET });
      expect(dispatch).not.toHaveBeenCalledWith({ type: RESET_SENT });
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_RESET, error: { message: 'Reset Error' } });
      expect(action.type).toEqual(ERROR_RESET);
    });
  });

  test('startListener', async () => {
    const startListenerThunk = startListener();
    const dispatch = jest.fn(async (action) => {
      if (typeof action === 'function') {
        await action(dispatch);
      }
    });

    await startListenerThunk(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({ type: SIGNED_IN, user: null });

    const user = { email: 'thingy@example.com' };
    await testDispatchOnAuthStateChanged(user);
    expect(dispatch).toHaveBeenCalledWith({ type: SIGNED_IN, user });
    expect(dispatch).toHaveBeenCalledWith({ type: 'SETTINGS/LOAD_SETTINGS_FROM_FIREBASE' });
  });
});
