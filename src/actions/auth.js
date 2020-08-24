import { getSettingsFromFirebase } from './settings';

export const LOADING_AUTH = 'AUTH/LOADING_SIGN_IN';
export const ERROR_AUTH = 'AUTH/ERROR_AUTH';
export const ERROR_ACKNOWLEDGE = 'AUTH/ERROR_ACKNOWLEDGE';
export const SIGNED_IN = 'AUTH/SIGNED_IN';
export const SIGNED_OUT = 'AUTH/SIGNED_OUT';
export const RESET_SENT = 'AUTH/RESET_SENT';
export const LOADING_RESET = 'AUTH/LOADING_RESET';

export function signOut() {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING_AUTH });
    await getState().auth.firebaseApp.auth().signOut();
  };
}

export function signIn(email, password) {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING_AUTH });
    try {
      await getState().auth.firebaseApp.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      dispatch({ type: ERROR_AUTH, error });
    }
  };
}

export function createAccount(email, password) {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING_AUTH });
    try {
      await getState().auth.firebaseApp.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      dispatch({ type: ERROR_AUTH, error });
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
    const { currentUser } = getState().auth.firebaseApp.auth();
    dispatch(signedIn(currentUser));

    getState().auth.firebaseApp.auth().onAuthStateChanged((user) => {
      dispatch(signedIn(user));
    });
  };
}

export function forgottenPassword(email) {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING_RESET });
    await getState().auth.firebaseApp.auth().sendPasswordResetEmail(email);
    dispatch({ type: RESET_SENT });
  };
}
