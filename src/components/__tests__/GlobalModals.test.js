import { describe, test } from '@jest/globals';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import GlobalModals from '../GlobalModals';
import { CHANGE_MODAL } from '../../actions/app';
import { UPDATE_SETTING } from '../../actions/settings';

describe('components/GlobalModals', () => {
  const mockStore = configureMockStore([thunk]);
  const defaultStore = {
    settings: {
      favouriteSeries: [],
      ownedTracks: [],
      favouriteTracks: [],
      ownedCars: [],
      favouriteCars: [],
      columns: [],
    },
    app: {
      currentModal: null,
    },
    auth: {
      user: null,
      firebaseApp: {},
    },
  };

  test('renders all closed', async () => {
    const store = mockStore(defaultStore);
    let component;

    await act(async () => {
      component = renderer.create(<Provider store={store}><GlobalModals /></Provider>);
    });

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders open options, closing and saving', async () => {
    let store = mockStore({ ...defaultStore, app: { currentModal: 'options' } });
    let component;

    await act(async () => {
      component = renderer.create(<Provider store={store}><GlobalModals /></Provider>);
    });

    expect(component.toJSON()).toMatchSnapshot();

    await act(async () => {
      await component.root
        .findByProps({ id: 'optionsModal' })
        .findByProps({ id: 'options-columns-id' })
        .props.onChange(true);
    });
    expect(store.getActions()).toContainEqual({ type: UPDATE_SETTING, payload: { key: 'columns', value: ['id'] } });

    await act(async () => {
      await component.root
        .findByProps({ id: 'optionsModal' })
        .findByProps({ 'aria-label': 'Close' })
        .props.onClick({ preventDefault: () => {}, stopPropagation: () => {} });
    });
    expect(store.getActions()).toContainEqual({ type: CHANGE_MODAL, modalName: null });

    act(() => {
      store = mockStore({ ...defaultStore, app: { currentModal: 'favourite-series' } });
      component.update(<Provider store={store}><GlobalModals /></Provider>);
    });

    await act(async () => {
      await component.root
        .findByProps({ id: 'favouriteSeriesModal' })
        .findByProps({ id: 'favourite-series-139' })
        .props.onChange(true);
    });

    expect(store.getActions()).toContainEqual({
      type: UPDATE_SETTING,
      payload: { key: 'favouriteSeries', value: [139] },
    });

    await act(async () => {
      await component.root
        .findByProps({ id: 'favouriteSeriesModal' })
        .findByProps({ children: 'Close' })
        .props.onClick({ preventDefault: () => {}, stopPropagation: () => {} });
    });
    expect(store.getActions()).toContainEqual({ type: CHANGE_MODAL, modalName: null });
  });
});
