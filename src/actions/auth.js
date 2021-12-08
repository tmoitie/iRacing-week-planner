import {
  getAuth, signOut as fbSignOut, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  onAuthStateChanged, sendPasswordResetEmail,
} from 'firebase/auth';
import { debouncedDispatcherSaveSettings, getSettingsFromFirebase, saveSettingsToFirebase } from './settings';

export const LOADING_AUTH = 'AUTH/LOADING_SIGN_IN';
export const ERROR_AUTH = 'AUTH/ERROR_AUTH';
export const ERROR_RESET = 'AUTH/ERROR_RESET';
export const ERROR_ACKNOWLEDGE = 'AUTH/ERROR_ACKNOWLEDGE';
export const SIGNED_IN = 'AUTH/SIGNED_IN';
export const SIGNED_OUT = 'AUTH/SIGNED_OUT';
export const RESET_SENT = 'AUTH/RESET_SENT';
export const LOADING_RESET = 'AUTH/LOADING_RESET';

export function signOut() {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING_AUTH });
    if (getState().settings.firebaseSynced === false) {
      debouncedDispatcherSaveSettings.cancel();
      await dispatch(saveSettingsToFirebase());
    }
    const auth = getAuth(getState().auth.firebaseApp);
    await fbSignOut(auth);

    dispatch({ type: SIGNED_OUT });
  };
}

export function signIn(email, password) {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING_AUTH });
    try {
      const auth = getAuth(getState().auth.firebaseApp);
      await signInWithEmailAndPassword(auth, email, password);
      return {};
    } catch (error) {
      dispatch({ type: ERROR_AUTH, error });
      return { type: ERROR_AUTH };
    }
  };
}

export function createAccount(email, password) {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING_AUTH });
    try {
      const auth = getAuth(getState().auth.firebaseApp);
      await createUserWithEmailAndPassword(auth, email, password);
      return {};
    } catch (error) {
      dispatch({ type: ERROR_AUTH, error });
      return { type: ERROR_AUTH };
    }
  };
}

export function acknowledgeAuthError() {
  return { type: ERROR_ACKNOWLEDGE };
}

export function signedIn(user) {
  return async (dispatch) => {
    await dispatch({ type: SIGNED_IN, user });

    if (user) {
      dispatch(getSettingsFromFirebase());
    }
  };
}

export function startListener() {
  return async (dispatch, getState) => {
    const auth = getAuth(getState().auth.firebaseApp);
    const { currentUser } = auth;
    dispatch(signedIn(currentUser));

    onAuthStateChanged(auth, (user) => {
      dispatch(signedIn(user));
    });
  };
}

export function forgottenPassword(email) {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING_RESET });
    try {
      const auth = getAuth(getState().auth.firebaseApp);
      await sendPasswordResetEmail(auth, email);
      dispatch({ type: RESET_SENT });
      return { type: RESET_SENT };
    } catch (error) {
      dispatch({ type: ERROR_RESET, error });
      return { type: ERROR_RESET };
    }
  };
}
