import { describe, test } from '@jest/globals';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import flushPromises from 'flush-promises';
import ForgottenPasswordModal from '../ForgottenPasswordModal';
import { ERROR_ACKNOWLEDGE } from '../../../actions/auth';

jest.mock('firebase/auth');
jest.useFakeTimers();

describe('components/modal/ForgottenPasswordModal', () => {
  const mockStore = configureMockStore([thunk]);

  test('renders closed', async () => {
    const store = mockStore({ auth: { errorReset: null, loadingReset: false } });
    const component = renderer.create(<Provider store={store}><ForgottenPasswordModal isOpen={false} /></Provider>);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('happy path', async () => {
    const firebaseAuth = {};
    getAuth.mockReturnValue(firebaseAuth);
    const store = mockStore({ auth: { errorReset: null, loadingReset: false, firebaseApp: {} } });
    let component;

    await act(async () => {
      component = renderer.create(<Provider store={store}><ForgottenPasswordModal isOpen /></Provider>);
    });

    expect(component.toJSON()).toMatchSnapshot();

    await act(async () => {
      await component.root.findByProps({ id: 'loginEmail' }).props.onChange({ target: { value: 'tom@example.com' } });
    });

    await act(async () => {
      await component.root.findByType('form').props.onSubmit({ preventDefault: () => {} });
    });

    expect(sendPasswordResetEmail).toHaveBeenCalledWith(firebaseAuth, 'tom@example.com');

    jest.runAllTimers();
    await flushPromises();

    expect(component.toJSON()).toMatchSnapshot();

    await act(async () => {
      await component.root
        .findByProps({ id: 'forgottenPasswordThanks' })
        .findByProps({ 'aria-label': 'Close' })
        .props.onClick({ preventDefault: () => {}, stopPropagation: () => {} });
    });

    jest.runAllTimers();
    await flushPromises();

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('reset error', async () => {
    const firebaseAuth = {};
    getAuth.mockReturnValue(firebaseAuth);
    sendPasswordResetEmail.mockRejectedValueOnce({ message: 'error' });

    const store = mockStore({ auth: { errorReset: null, loadingReset: false, firebaseApp: {} } });
    let component;

    await act(async () => {
      component = renderer.create(<Provider store={store}><ForgottenPasswordModal isOpen /></Provider>);
    });

    await act(async () => {
      await component.root.findByType('form').props.onSubmit({ preventDefault: () => {} });
    });

    jest.runAllTimers();
    await flushPromises();

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders error', async () => {
    const store = mockStore({ auth: { errorReset: { message: 'Error message' }, loadingReset: false } });
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    let component;

    await act(async () => {
      component = renderer.create(<Provider store={store}><ForgottenPasswordModal isOpen /></Provider>);
    });

    expect(component.toJSON()).toMatchSnapshot();

    await act(async () => {
      await component.root
        .findByProps({ role: 'alert' })
        .findByProps({ 'aria-label': 'Close' }).props.onClick();
    });

    expect(dispatchSpy).toHaveBeenCalledWith({ type: ERROR_ACKNOWLEDGE });
  });

  test('renders loading', async () => {
    const store = mockStore({ auth: { errorReset: null, loadingReset: true } });
    const component = renderer.create(<Provider store={store}><ForgottenPasswordModal /></Provider>);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
