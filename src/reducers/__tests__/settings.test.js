import { describe, test } from '@jest/globals';

import { actionTypes as localStorageActionTypes } from 'redux-localstorage';
import settingsReducer from '../settings';

import {
  FIREBASE_SYNCED,
  LOAD_SETTINGS_FROM_FIREBASE,
  RESET_FILTERS,
  RESET_SETTINGS,
  UPDATE_FILTERS,
  UPDATE_SETTING,
} from '../../actions/settings';

describe('reducers/settings', () => {
  test('set up default state', () => {
    const state = settingsReducer(undefined, {});
    expect(state.ownedTracks.length).toBe(22);
  });

  test('set up legacy state', () => {
    window.localStorage.setItem('iracing-state', JSON.stringify({ sort: { key: 'class', order: 'desc' } }));
    const state = settingsReducer(undefined, {});
    expect(state.sort).toEqual({ key: 'class', order: 'desc' });
    expect(window.localStorage.getItem('iracing-state')).toEqual(null);
  });

  test('localStorageActionTypes.INIT', async () => {
    const state = settingsReducer(
      undefined,
      {
        type: localStorageActionTypes.INIT,
        payload: {
          settings: {
            ownedCars: [5],
            ownedTracks: [34, 165],
          },
        },
      },
    );
    expect(state.ownedCars.length).toBe(17);
    expect(state.ownedTracks.length).toBe(23);
    const stateNoPayload = settingsReducer(
      undefined,
      {
        type: localStorageActionTypes.INIT,
      },
    );
    expect(stateNoPayload.ownedCars.length).toBe(16);
    expect(stateNoPayload.ownedTracks.length).toBe(22);
  });

  test('settings/UPDATE_FILTERS', async () => {
    const state = settingsReducer(
      { firebaseSynced: true },
      {
        type: UPDATE_FILTERS,
        payload: { filters: { newFilters: true } },
      },
    );
    expect(state.filters.newFilters).toBe(true);
    expect(state.firebaseSynced).toBe(false);
  });

  test('settings/RESET_FILTERS', async () => {
    const state = settingsReducer(
      { firebaseSynced: true, filters: { newFilters: true } },
      {
        type: RESET_FILTERS,
      },
    );
    expect(state.filters.type).toEqual(['Road', 'Oval', 'Dirt', 'RX']);
    expect(state.firebaseSynced).toBe(false);
  });

  test('settings/RESET_SETTINGS', async () => {
    const state = settingsReducer(
      { firebaseSynced: true, sort: { key: 'time', order: 'desc' } },
      {
        type: RESET_SETTINGS,
      },
    );
    expect(state.sort).toEqual({ key: 'licence', order: 'asc' });
    expect(state.firebaseSynced).toBe(false);
  });

  test('settings/UPDATE_SETTING', async () => {
    const state = settingsReducer(
      { firebaseSynced: true, sort: { key: 'time', order: 'desc' } },
      {
        type: UPDATE_SETTING,
        payload: { key: 'sort', value: { key: 'licence', order: 'desc' } },
      },
    );
    expect(state.sort).toEqual({ key: 'licence', order: 'desc' });
    expect(state.firebaseSynced).toBe(false);
  });

  test('settings/LOAD_SETTINGS_FROM_FIREBASE', async () => {
    const state = settingsReducer(
      { firebaseSynced: false },
      {
        type: LOAD_SETTINGS_FROM_FIREBASE,
        payload: { sort: { key: 'time', order: 'desc' } },
      },
    );
    expect(state.sort).toEqual({ key: 'time', order: 'desc' });
    expect(state.firebaseSynced).toBe(true);
  });

  test('settings/FIREBASE_SYNCED', async () => {
    const state = settingsReducer(
      { firebaseSynced: false },
      {
        type: FIREBASE_SYNCED,
      },
    );
    expect(state.firebaseSynced).toBe(true);
  });
});
