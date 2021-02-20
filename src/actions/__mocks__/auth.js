export const LOADING_AUTH = 'AUTH/LOADING_SIGN_IN';
export const ERROR_AUTH = 'AUTH/ERROR_AUTH';
export const ERROR_RESET = 'AUTH/ERROR_RESET';
export const ERROR_ACKNOWLEDGE = 'AUTH/ERROR_ACKNOWLEDGE';
export const SIGNED_IN = 'AUTH/SIGNED_IN';
export const SIGNED_OUT = 'AUTH/SIGNED_OUT';
export const RESET_SENT = 'AUTH/RESET_SENT';
export const LOADING_RESET = 'AUTH/LOADING_RESET';

export function signOut() {
  return async (dispatch) => {
    dispatch({ type: LOADING_AUTH });
    dispatch({ type: SIGNED_OUT });
  };
}

export function signIn() {
  return async (dispatch) => {
    dispatch({ type: LOADING_AUTH });
  };
}

export function createAccount() {
  return async (dispatch) => {
    dispatch({ type: LOADING_AUTH });
  };
}

export function acknowledgeAuthError() {
  return { type: ERROR_ACKNOWLEDGE };
}

export function signedIn(user) {
  return async (dispatch) => {
    await dispatch({ type: SIGNED_IN, user });
  };
}

export function startListener() {
  return async (dispatch) => {
    dispatch(signedIn(null));
  };
}

export function forgottenPassword() {
  return async (dispatch) => {
    dispatch({ type: LOADING_RESET });
    dispatch({ type: RESET_SENT });
  };
}
