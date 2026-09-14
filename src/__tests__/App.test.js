import { afterEach, beforeEach, describe, test } from '@jest/globals';
import moment from 'moment';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockDate from 'mockdate';
import * as firebaseAuth from 'firebase/auth';
import { SIGNED_IN } from '../actions/auth';
import { debouncedDispatcherSaveSettings } from '../actions/settings';

import App from '../App';

import '../data/season.json';
import { defaultFilters } from '../reducers/settings';

jest.mock('firebase/auth');
jest.mock('../data/season.json');

const mockStore = configureMockStore([thunk]);

describe('components/App', () => {
  const defaultStore = {
    settings: {
      sort: { key: 'id', order: 'asc' },
      filters: defaultFilters,
      favouriteSeries: [],
      ownedTracks: [],
      ownedCars: [],
      favouriteCars: [],
      favouriteTracks: [],
      columns: ['id'],
    },
    app: {
      date: moment('2022-09-10T00:00:00.000Z'),
      daysSinceSeasonStart: 4,
      week: 1,
      currentModal: null,
    },
    auth: {
      user: null,
    },
  };

  beforeEach(() => {
    MockDate.set('2022-09-07T13:30:00.000Z');
  });

  afterEach(() => {
    MockDate.reset();
  });

  test('renders correctly', async () => {
    const store = mockStore(defaultStore);
    const { container } = render(<Provider store={store}><App /></Provider>);

    expect(container.firstChild).toMatchSnapshot();
    await waitFor(() => expect(store.getActions()).toHaveLength(1));
    expect(store.getActions()[0].type).toEqual(SIGNED_IN);
    expect(store.getActions()[0].user).not.toBeDefined();

    const newUser = { id: 123 };
    await firebaseAuth.testDispatchOnAuthStateChanged(newUser);
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[1].type).toEqual(SIGNED_IN);
    expect(store.getActions()[1].user).toBe(newUser);
  });

  test('flushes pending settings when the page is hidden', () => {
    const flush = jest.spyOn(debouncedDispatcherSaveSettings, 'flush');
    const store = mockStore(defaultStore);
    const { unmount } = render(<Provider store={store}><App /></Provider>);

    window.dispatchEvent(new Event('pagehide'));

    expect(flush).toHaveBeenCalledTimes(1);

    unmount();
    expect(flush).toHaveBeenCalledTimes(2);
  });
});
