import { describe, test } from '@jest/globals';
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    const { container } = render(<Provider store={store}><GlobalModals /></Provider>);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders open options, closing and saving', async () => {
    const user = userEvent.setup();
    let store = mockStore({ ...defaultStore, app: { currentModal: 'options' } });
    const { baseElement, rerender } = render(<Provider store={store}><GlobalModals /></Provider>);

    expect(baseElement).toMatchSnapshot();

    await user.click(within(screen.getByTestId('optionsModal')).getByLabelText('ID'));
    expect(store.getActions()).toContainEqual({ type: UPDATE_SETTING, payload: { key: 'columns', value: ['id'] } });

    await user.click(within(screen.getByTestId('optionsModal')).getByLabelText('Close'));
    expect(store.getActions()).toContainEqual({ type: CHANGE_MODAL, modalName: null });

    store = mockStore({ ...defaultStore, app: { currentModal: 'favourite-series' } });
    rerender(<Provider store={store}><GlobalModals /></Provider>);

    await user.click(within(screen.getByTestId('favouriteSeriesModal')).getByLabelText('13th Week iRacing Figure GR8'));

    expect(store.getActions()).toContainEqual({
      type: UPDATE_SETTING,
      payload: { key: 'favouriteSeries', value: [245] },
    });

    await user.click(within(screen.getByTestId('favouriteSeriesModal')).getByLabelText('Close'));
    expect(store.getActions()).toContainEqual({ type: CHANGE_MODAL, modalName: null });
  });
});
