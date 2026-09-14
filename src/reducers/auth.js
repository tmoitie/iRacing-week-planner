// @flow

import {
  LOADING_AUTH, SIGNED_OUT, SIGNED_IN, LOADING_RESET, RESET_SENT, ERROR_AUTH, ERROR_ACKNOWLEDGE, ERROR_RESET,
} from '../actions/auth';

type AuthUser = {

};

type AuthState = {
  user: AuthUser,
  loadingAuth: boolean,
  loadingReset: boolean,
  errorAuth: { message: string } | null,
  errorReset: { message: string } | null,
};

type AuthReducerArgs = {
  type: string,
  user?: AuthUser,
  error?: { message: string },
};

export default function authReducer(
  state: AuthState = {
    user: null,
    loadingAuth: true,
    loadingReset: false,
    errorAuth: null,
    errorReset: null,
  },
  { type, user, error }: AuthReducerArgs,
): AuthState {
  if (type === SIGNED_OUT) {
    return { ...state, user: null };
  }

  if (type === LOADING_AUTH) {
    return { ...state, loadingAuth: true };
  }

  if (type === ERROR_AUTH) {
    return { ...state, loadingAuth: false, errorAuth: error };
  }

  if (type === ERROR_RESET) {
    return { ...state, loadingReset: false, errorReset: error };
  }

  if (type === ERROR_ACKNOWLEDGE) {
    return { ...state, errorAuth: null, errorReset: null };
  }

  if (type === SIGNED_IN) {
    return { ...state, loadingAuth: false, errorAuth: null, user };
  }

  if (type === LOADING_RESET) {
    return { ...state, loadingReset: true };
  }

  if (type === RESET_SENT) {
    return { ...state, loadingReset: false, errorReset: null };
  }

  return state;
}
