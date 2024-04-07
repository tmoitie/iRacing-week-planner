import { describe, test } from '@jest/globals';
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import ForgottenPasswordModal from '../ForgottenPasswordModal';
import { ERROR_ACKNOWLEDGE } from '../../../actions/auth';

describe('components/modal/ForgottenPasswordModal', () => {
  const mockStore = configureMockStore([thunk]);

  test('renders closed', async () => {
    const store = mockStore({ auth: { errorReset: null, loadingReset: false } });
    const { baseElement } = render(<Provider store={store}><ForgottenPasswordModal isOpen={false} /></Provider>);
    expect(screen.queryByTestId('forgottenPasswordModal')).not.toBeTruthy();
  });

  test('happy path', async () => {
    const user = userEvent.setup();

    const firebaseAuth = {};
    getAuth.mockReturnValue(firebaseAuth);
    const store = mockStore({ auth: { errorReset: null, loadingReset: false, firebaseApp: {} } });
    const { baseElement, unmount } = render(<Provider store={store}><ForgottenPasswordModal isOpen /></Provider>);

    expect(await screen.findByTestId('forgottenPasswordModal')).toMatchSnapshot();

    await user.type(screen.getByRole('textbox', { name: 'Email address' }), 'tom@example.com');
    await user.click(screen.getByText('Submit'));

    expect(sendPasswordResetEmail).toHaveBeenCalledWith(firebaseAuth, 'tom@example.com');

    expect(await screen.findByTestId('forgottenPasswordModal')).toMatchSnapshot();

    const thanksModal = await screen.findByTestId('forgottenPasswordThanks');
    await user.click(within(thanksModal).getByText('Close'));

    expect(await screen.findByTestId('forgottenPasswordModal')).toMatchSnapshot();
  });

  test('reset error', async () => {
    const user = userEvent.setup();

    const firebaseAuth = {};
    getAuth.mockReturnValue(firebaseAuth);
    sendPasswordResetEmail.mockRejectedValueOnce({ message: 'error' });

    const store = mockStore({ auth: { errorReset: null, loadingReset: false, firebaseApp: {} } });
    const { baseElement } = render(<Provider store={store}><ForgottenPasswordModal isOpen /></Provider>);

    await user.click(screen.getByText('Submit'));

    expect(await screen.findByTestId('forgottenPasswordModal')).toMatchSnapshot();
  });

  test('renders error', async () => {
    const user = userEvent.setup();

    const store = mockStore({ auth: { errorReset: { message: 'Error message' }, loadingReset: false } });
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const { baseElement } = render(<Provider store={store}><ForgottenPasswordModal isOpen /></Provider>);

    expect(await screen.findByTestId('forgottenPasswordModal')).toMatchSnapshot();

    await user.click(within(await screen.findByRole('alert')).getByLabelText('Close'));
    expect(dispatchSpy).toHaveBeenCalledWith({ type: ERROR_ACKNOWLEDGE });
  });

  test('renders loading', async () => {
    const store = mockStore({ auth: { errorReset: null, loadingReset: true } });
    const { baseElement } = render(<Provider store={store}><ForgottenPasswordModal isOpen /></Provider>);

    expect(await screen.findByTestId('forgottenPasswordModal')).toMatchSnapshot();
  });
});
