import { describe, test } from '@jest/globals';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { act, fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { LOADING_AUTH, SIGNED_OUT } from '../../actions/auth';
import { CHANGE_MODAL } from '../../actions/app';

import Navbar from '../Navbar';

jest.mock('../../actions/auth');
jest.mock('react-i18next', () => ({
  __esModule: true,
  useTranslation: jest.fn(() => ({
    t: (v) => v,
    i18n: {
      changeLanguage: () => {},
      language: 'en',
    },
  })),
  initReactI18next: {
    type: '3rdParty', init: () => {},
  },
}));

const mockStore = configureMockStore([thunk]);

describe('components/Navbar', () => {
  test('renders correctly and links work', async () => {
    const store = mockStore({ auth: { user: { id: 1 } } });
    const component = render(<Provider store={store}><Navbar /></Provider>);

    expect(component.container.firstChild).toMatchSnapshot();

    fireEvent.click(await component.findByText('Purchase guide'));

    expect(store.getActions()[0].type).toEqual(CHANGE_MODAL);
    expect(store.getActions()[0].modalName).toBe('purchase-guide');

    fireEvent.click(await component.findByText('Set my tracks'));

    expect(store.getActions()[1].type).toEqual(CHANGE_MODAL);
    expect(store.getActions()[1].modalName).toBe('my-tracks');

    fireEvent.click(await component.findByText('Set my cars'));

    expect(store.getActions()[2].type).toEqual(CHANGE_MODAL);
    expect(store.getActions()[2].modalName).toBe('my-cars');

    fireEvent.click(await component.findByText('Set favorite series'));

    expect(store.getActions()[3].type).toEqual(CHANGE_MODAL);
    expect(store.getActions()[3].modalName).toBe('favourite-series');

    fireEvent.click(await component.findByText('Options'));

    expect(store.getActions()[4].type).toEqual(CHANGE_MODAL);
    expect(store.getActions()[4].modalName).toBe('options');

    fireEvent.click(await component.findByText('About'));

    expect(store.getActions()[5].type).toEqual(CHANGE_MODAL);
    expect(store.getActions()[5].modalName).toBe('about');

    fireEvent.click(await component.findByText('Sign out'));

    expect(store.getActions()[6].type).toEqual(LOADING_AUTH);
    expect(store.getActions()[7].type).toEqual(SIGNED_OUT);
  });

  test('sign in', async () => {
    const store = mockStore({ auth: { user: null } });
    const component = render(<Provider store={store}><Navbar /></Provider>);

    fireEvent.click(await component.findByText('Sign in'));

    expect(store.getActions()[0].type).toEqual(CHANGE_MODAL);
    expect(store.getActions()[0].modalName).toBe('login');
  });

  test('changes language', async () => {
    const changeLanguage = jest.fn();
    useTranslation.mockImplementation(() => ({
      __esModule: true,
      t: (v) => v,
      i18n: {
        changeLanguage,
        language: 'en',
      },
    }));
    const store = mockStore({ auth: { user: { id: 1 } } });
    let component;
    act(() => {
      component = render(<Provider store={store}><Navbar /></Provider>);
    });
    const firstRender = component.asFragment();

    await act(async () => {
      fireEvent.click(await component.findByText(/^🇺🇸$/));
    });

    const secondRender = component.asFragment();

    expect(firstRender).toMatchDiffSnapshot(secondRender);

    await act(async () => {
      fireEvent.click(await component.findByText(/Deutsch \(DE\)/));
    });

    expect(secondRender).toMatchDiffSnapshot(component.asFragment());
    expect(changeLanguage).toHaveBeenCalledWith('de');
  });

  test('closes dropdown', async () => {
    const store = mockStore({ auth: { user: { id: 1 } } });
    let component;

    act(() => {
      component = render(<Provider store={store}><Navbar /></Provider>);
    });

    await act(async () => {
      fireEvent.click(await component.findByText(/^🇺🇸$/));
    });
    const firstRender = component.asFragment();

    act(() => {
      document.dispatchEvent(new MouseEvent('mousedown'));
    });

    const secondRender = component.asFragment();

    expect(firstRender).toMatchDiffSnapshot(secondRender);

    component.unmount();

    document.dispatchEvent(new MouseEvent('mousedown'));
  });
});
