import { describe, test, beforeEach, afterEach } from '@jest/globals';
import moment from 'moment';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockDate from 'mockdate';
import * as firebaseAuth from 'firebase/auth';
import { SIGNED_IN } from '../actions/auth';

import App from '../App';

import '../data/season.json';
import { defaultFilters } from '../reducers/settings';

jest.mock('firebase/auth');
jest.mock('../data/season.json');
jest.mock('../data/racelengths.json');
jest.mock('../data/racetimes.json');

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
      date: moment('2020-09-23T01:00:00.000Z'),
      daysSinceSeasonStart: 4,
      week: 1,
      currentModal: null,
    },
    auth: {
      user: null,
      firebaseApp: {},
    },
  };

  beforeEach(() => {
    MockDate.set('2020-09-23T13:30:00.000Z');
  });

  afterEach(() => {
    MockDate.reset();
  });

  test('renders correctly', () => {
    const store = mockStore(defaultStore);
    const component = renderer.create(<Provider store={store}><App /></Provider>);

    expect(component.toJSON()).toMatchSnapshot();
    expect(store.getActions()[0].type).toEqual(SIGNED_IN);
    expect(store.getActions()[0].user).not.toBeDefined();

    const newUser = { id: 123 };
    firebaseAuth.testDispatchOnAuthStateChanged(newUser);
    expect(store.getActions()[1].type).toEqual(SIGNED_IN);
    expect(store.getActions()[1].user).toBe(newUser);
  });
});
