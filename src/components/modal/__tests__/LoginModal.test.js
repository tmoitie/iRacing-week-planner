import { describe, test } from '@jest/globals';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import flushPromises from 'flush-promises';
import LoginModal from '../LoginModal';
import { ERROR_ACKNOWLEDGE } from '../../../actions/auth';

jest.mock('firebase/auth');
jest.useFakeTimers();

describe('components/modal/LoginModal', () => {
  const mockStore = configureMockStore([thunk]);

  test('renders closed', async () => {
    const store = mockStore({ auth: { errorAuth: null, loadingAuth: false } });
    const component = renderer.create(<Provider store={store}><LoginModal isOpen={false} /></Provider>);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('happy path login', async () => {
    const firebaseAuth = {};
    getAuth.mockReturnValue(firebaseAuth);
    const store = mockStore({ auth: { errorAuth: null, loadingAuth: false, firebaseApp: {} } });
    let component;

    await act(async () => {
      component = renderer.create(<Provider store={store}><LoginModal isOpen /></Provider>);
    });

    expect(component.toJSON()).toMatchSnapshot();

    await act(async () => {
      await component.root.findByProps({ id: 'loginEmail' }).props.onChange({ target: { value: 'tom@example.com' } });
      await component.root.findByProps({ id: 'loginPassword' }).props.onChange({ target: { value: '12345678' } });
    });

    await act(async () => {
      await component.root.findByType('form').props.onSubmit({ preventDefault: () => {} });
    });

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(firebaseAuth, 'tom@example.com', '12345678');
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('login error', async () => {
    const firebaseAuth = {};
    getAuth.mockReturnValue(firebaseAuth);
    signInWithEmailAndPassword.mockRejectedValueOnce({ message: 'error' });

    const store = mockStore({ auth: { errorAuth: null, loadingAuth: false, firebaseApp: {} } });
    let component;

    await act(async () => {
      component = renderer.create(<Provider store={store}><LoginModal isOpen /></Provider>);
    });

    await act(async () => {
      await component.root.findByType('form').props.onSubmit({ preventDefault: () => {} });
    });

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('happy path create account', async () => {
    const firebaseAuth = {};
    getAuth.mockReturnValue(firebaseAuth);
    const store = mockStore({ auth: { errorAuth: null, loadingAuth: false, firebaseApp: {} } });
    let component;

    await act(async () => {
      component = renderer.create(<Provider store={store}><LoginModal isOpen /></Provider>);
    });

    expect(component.toJSON()).toMatchSnapshot();

    await act(async () => {
      await component.root.findByProps({ id: 'loginEmail' }).props.onChange({ target: { value: 'tom@example.com' } });
      await component.root.findByProps({ id: 'loginPassword' }).props.onChange({ target: { value: '12345678' } });
    });

    await act(async () => {
      await component.root
        .findByProps({ id: 'createAccountButton' })
        .props.onClick({ preventDefault: () => {} });
    });

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(firebaseAuth, 'tom@example.com', '12345678');
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('create account error', async () => {
    const firebaseAuth = {};
    getAuth.mockReturnValue(firebaseAuth);
    createUserWithEmailAndPassword.mockRejectedValueOnce({ message: 'error' });

    const store = mockStore({ auth: { errorAuth: null, loadingAuth: false, firebaseApp: {} } });
    let component;

    await act(async () => {
      component = renderer.create(<Provider store={store}><LoginModal isOpen /></Provider>);
    });

    await act(async () => {
      await component.root
        .findByProps({ id: 'createAccountButton' })
        .props.onClick({ preventDefault: () => {} });
    });

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders error', async () => {
    const store = mockStore({ auth: { errorAuth: { message: 'Error message' }, loadingAuth: false } });
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    let component;

    await act(async () => {
      component = renderer.create(<Provider store={store}><LoginModal isOpen /></Provider>);
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
    const store = mockStore({ auth: { errorAuth: null, loadingAuth: true } });
    const component = renderer.create(<Provider store={store}><LoginModal /></Provider>);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('forgotten password modal control', async () => {
    const store = mockStore({ auth: { errorAuth: null, loadingAuth: false } });
    let component;

    await act(async () => {
      component = renderer.create(<Provider store={store}><LoginModal isOpen /></Provider>);
    });

    await act(async () => {
      await component.root
        .findByProps({ id: 'buttonOpenForgottenPassword' }).props.onClick({ preventDefault: () => {} });
    });

    jest.runAllTimers();
    await flushPromises();

    expect(component.toJSON()).toMatchSnapshot();

    await act(async () => {
      await component.root
        .findByProps({ id: 'forgottenPasswordModal' })
        .findByProps({ 'aria-label': 'Close' })
        .props.onClick({ preventDefault: () => {}, stopPropagation: () => {} });
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
