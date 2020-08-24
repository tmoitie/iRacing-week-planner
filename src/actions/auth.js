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

    await getState().auth.firebaseApp.auth().signOut();
    dispatch({ type: SIGNED_OUT });
  };
}

export function signIn(email, password) {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING_AUTH });
    try {
      await getState().auth.firebaseApp.auth().signInWithEmailAndPassword(email, password);
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
      await getState().auth.firebaseApp.auth().createUserWithEmailAndPassword(email, password);
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
    try {
      await getState().auth.firebaseApp.auth().sendPasswordResetEmail(email);
      dispatch({ type: RESET_SENT });
      return { type: RESET_SENT };
    } catch (error) {
      dispatch({ type: ERROR_RESET, error });
      return { type: ERROR_RESET };
    }
  };
}
