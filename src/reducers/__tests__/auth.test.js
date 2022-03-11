import { describe, test } from '@jest/globals';
import 'firebase/app';

import authReducer from '../auth';
import {
  ERROR_ACKNOWLEDGE,
  ERROR_AUTH,
  ERROR_RESET,
  LOADING_AUTH,
  LOADING_RESET, RESET_SENT,
  SIGNED_IN,
  SIGNED_OUT,
} from '../../actions/auth';

jest.mock('firebase/app');

describe('reducers/auth', () => {
  test('set up default state', () => {
    const state = authReducer(undefined, {});
    expect(state.user).toBe(null);
  });

  test('AUTH/SIGNED_OUT', async () => {
    const state = authReducer(
      { user: { email: 'test@example.com' } },
      { type: SIGNED_OUT },
    );
    expect(state.user).toBe(null);
  });

  test('AUTH/LOADING_AUTH', async () => {
    const state = authReducer(
      undefined,
      { type: LOADING_AUTH },
    );
    expect(state.loadingAuth).toBe(true);
  });

  test('AUTH/ERROR_AUTH', async () => {
    const state = authReducer(
      { loadingAuth: true },
      { type: ERROR_AUTH, error: { message: 'Error' } },
    );
    expect(state.loadingAuth).toBe(false);
    expect(state.errorAuth.message).toBe('Error');
  });

  test('AUTH/ERROR_RESET', async () => {
    const state = authReducer(
      { loadingReset: true },
      { type: ERROR_RESET, error: { message: 'Error' } },
    );
    expect(state.loadingReset).toBe(false);
    expect(state.errorReset.message).toBe('Error');
  });

  test('AUTH/ERROR_ACKNOWLEDGE', async () => {
    const state = authReducer(
      { errorAuth: { message: 'Error' }, errorReset: { message: 'Error' } },
      { type: ERROR_ACKNOWLEDGE },
    );
    expect(state.errorAuth).toBe(null);
    expect(state.errorReset).toBe(null);
  });

  test('AUTH/SIGNED_IN', async () => {
    const state = authReducer({
      user: null,
      errorAuth: { message: 'Error' },
      loadingAuth: true,
    }, {
      type: SIGNED_IN,
      user: {
        email: 'test@example.com',
      },
    });
    expect(state.user.email).toBe('test@example.com');
    expect(state.loadingAuth).toBe(false);
    expect(state.errorAuth).toBe(null);
  });

  test('AUTH/LOADING_RESET', async () => {
    const state = authReducer(
      undefined,
      { type: LOADING_RESET },
    );
    expect(state.loadingReset).toBe(true);
  });

  test('AUTH/RESET_SENT', async () => {
    const state = authReducer(
      { loadingReset: true, errorReset: { message: 'Error' } },
      { type: RESET_SENT },
    );
    expect(state.loadingReset).toBe(false);
    expect(state.errorReset).toBe(null);
  });
});
