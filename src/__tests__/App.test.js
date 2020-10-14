import { describe, test, beforeEach, afterEach } from '@jest/globals';
import moment from 'moment';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockDate from 'mockdate';
import { SIGNED_IN } from '../actions/auth';

import App from '../App';

import '../data/season.json';
import { defaultFilters } from '../reducers/settings';

jest.mock('../data/season.json');

const mockStore = configureMockStore([thunk]);

describe('components/App', () => {
  const authSubscribers = [];
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
      firebaseApp: {
        auth: () => ({
          currentUser: null,
          onAuthStateChanged: (callback) => { authSubscribers.push(callback); },
        }),
      },
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
    expect(store.getActions()[0].user).toEqual(null);

    expect(authSubscribers.length).toBe(1);

    const newUser = { id: 123 };
    authSubscribers.forEach((callback) => {
      callback(newUser);
    });
    expect(store.getActions()[1].type).toEqual(SIGNED_IN);
    expect(store.getActions()[1].user).toBe(newUser);
  });
});
