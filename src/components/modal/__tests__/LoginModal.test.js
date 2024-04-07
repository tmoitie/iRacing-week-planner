import { describe, test, expect } from '@jest/globals';
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import LoginModal from '../LoginModal';
import { ERROR_ACKNOWLEDGE } from '../../../actions/auth';

jest.mock('firebase/auth');

describe('components/modal/LoginModal', () => {
  const mockStore = configureMockStore([thunk]);

  test('renders closed', async () => {
    const store = mockStore({ auth: { errorAuth: null, loadingAuth: false } });
    render(<Provider store={store}><LoginModal isOpen={false} /></Provider>);
    expect(screen.queryByTestId('login-modal')).not.toBeTruthy();
  });

  test('happy path login', async () => {
    const user = userEvent.setup();
    const firebaseAuth = {};
    getAuth.mockReturnValue(firebaseAuth);
    const store = mockStore({ auth: { errorAuth: null, loadingAuth: false, firebaseApp: {} } });
    render(<Provider store={store}><LoginModal isOpen onClose={() => {}} /></Provider>);

    expect(await screen.findByTestId('login-modal')).toMatchSnapshot();

    await user.type(screen.getByRole('textbox', { name: 'Email address' }), 'tom@example.com');
    await user.type(screen.getByLabelText('Password'), '12345678');

    await user.click(screen.getByText('Sign in'));

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(firebaseAuth, 'tom@example.com', '12345678');
    expect(await screen.findByTestId('login-modal')).toMatchSnapshot();
  });

  test('login error', async () => {
    const user = userEvent.setup();
    const firebaseAuth = {};
    getAuth.mockReturnValue(firebaseAuth);
    signInWithEmailAndPassword.mockRejectedValueOnce({ message: 'error' });

    const store = mockStore({ auth: { errorAuth: null, loadingAuth: false, firebaseApp: {} } });
    render(<Provider store={store}><LoginModal isOpen onClose={() => {}} /></Provider>);

    await user.click(screen.getByText('Sign in'));
    expect(await screen.findByTestId('login-modal')).toMatchSnapshot();
  });

  test('happy path create account', async () => {
    const user = userEvent.setup();
    const firebaseAuth = {};
    getAuth.mockReturnValue(firebaseAuth);
    const store = mockStore({ auth: { errorAuth: null, loadingAuth: false, firebaseApp: {} } });

    render(<Provider store={store}><LoginModal isOpen onClose={() => {}} /></Provider>);

    expect(await screen.findByTestId('login-modal')).toMatchSnapshot();

    await user.type(screen.getByRole('textbox', { name: 'Email address' }), 'tom@example.com');
    await user.type(screen.getByLabelText('Password'), '12345678');

    await user.click(screen.getByText('Create account'));

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(firebaseAuth, 'tom@example.com', '12345678');
    expect(await screen.findByTestId('login-modal')).toMatchSnapshot();
  });

  test('create account error', async () => {
    const user = userEvent.setup();
    const firebaseAuth = {};
    getAuth.mockReturnValue(firebaseAuth);
    createUserWithEmailAndPassword.mockRejectedValueOnce({ message: 'error' });

    const store = mockStore({ auth: { errorAuth: null, loadingAuth: false, firebaseApp: {} } });
    render(<Provider store={store}><LoginModal isOpen onClose={() => {}} /></Provider>);

    await user.click(screen.getByText('Create account'));

    expect(await screen.findByTestId('login-modal')).toMatchSnapshot();
  });

  test('renders error', async () => {
    const user = userEvent.setup();

    const store = mockStore({ auth: { errorAuth: { message: 'Error message' }, loadingAuth: false } });
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    render(<Provider store={store}><LoginModal isOpen onClose={() => {}} /></Provider>);

    expect(await screen.findByTestId('login-modal')).toMatchSnapshot();

    await user.click(within(await screen.findByRole('alert')).getByLabelText('Close'));

    expect(dispatchSpy).toHaveBeenCalledWith({ type: ERROR_ACKNOWLEDGE });
  });

  test('renders loading', async () => {
    const store = mockStore({ auth: { errorAuth: null, loadingAuth: true } });
    render(<Provider store={store}><LoginModal isOpen onClose={() => {}} /></Provider>);

    expect(await screen.findByTestId('login-modal')).toMatchSnapshot();
  });

  test('forgotten password modal control', async () => {
    const user = userEvent.setup();

    const store = mockStore({ auth: { errorAuth: null, loadingAuth: false } });
    render(<Provider store={store}><LoginModal isOpen onClose={() => {}} /></Provider>);

    await user.click(screen.getByText('Forgotten password?'));

    const forgottenModal = await screen.findByTestId('forgottenPasswordModal');
    await user.click(within(forgottenModal).getByLabelText('Close'));

    expect(await screen.findByTestId('login-modal')).toMatchSnapshot();
  });
});
