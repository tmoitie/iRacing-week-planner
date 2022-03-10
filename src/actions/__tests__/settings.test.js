import { describe, test } from '@jest/globals';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

import flushPromises from 'flush-promises';
import {
  debouncedDispatcherSaveSettings,
  FIREBASE_SYNCED,
  getSettingsFromFirebase,
  LOAD_SETTINGS_FROM_FIREBASE,
  RESET_FILTERS,
  RESET_SETTINGS,
  resetFilters,
  resetSettings,
  saveSettingsToFirebase,
  UPDATE_FILTERS,
  UPDATE_SETTING,
  updateFilters,
  updateSetting,
} from '../settings';

jest.mock('firebase/firestore');
jest.useFakeTimers();

const createMockDispatcher = (getState) => {
  const dispatch = jest.fn(async (action) => {
    if (typeof action === 'function') {
      await action(dispatch, getState);
    }
  });

  return dispatch;
};

describe('settingsActions', () => {
  const firebaseFirestore = {};
  getFirestore.mockReturnValue(firebaseFirestore);

  const settings = { exampleSettings: true };

  const getState = () => ({ auth: { firebaseApp: {}, user: { email: 'example@example.com' } }, settings });
  const getStateNoUser = () => ({ auth: { firebaseApp: {}, user: null }, settings });

  describe('saveSettingsToFirebase', () => {
    const saveSettingsToFirebaseThunk = saveSettingsToFirebase();

    test('with user', async () => {
      const docRef = '345';
      doc.mockReturnValueOnce(docRef);
      const dispatch = jest.fn(async () => {});

      await saveSettingsToFirebaseThunk(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({ type: FIREBASE_SYNCED });
      expect(setDoc).toHaveBeenCalledWith(docRef, settings);
    });

    test('without user', async () => {
      const dispatch = jest.fn(async () => {});

      await saveSettingsToFirebaseThunk(dispatch, getStateNoUser);

      expect(dispatch).not.toHaveBeenCalledWith({ type: FIREBASE_SYNCED });
      expect(setDoc).not.toHaveBeenCalled();
    });

    test('through debounce', async () => {
      const docRef = '345';
      doc.mockReturnValueOnce(docRef);
      const dispatch = createMockDispatcher(getState);

      debouncedDispatcherSaveSettings(dispatch);

      jest.runAllTimers();
      await flushPromises();

      expect(dispatch).toHaveBeenCalledWith({ type: FIREBASE_SYNCED });
    });
  });

  describe('getSettingsFromFirebase', () => {
    const getSettingsFromFirebaseThunk = getSettingsFromFirebase();

    test('document exists', async () => {
      const docRef = '345';
      doc.mockReturnValueOnce(docRef);
      const newSettings = { filters: [] };
      getDoc.mockResolvedValueOnce({ exists: true, data: () => newSettings });
      const dispatch = jest.fn(async () => {});

      await getSettingsFromFirebaseThunk(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_SETTINGS_FROM_FIREBASE, payload: newSettings });
    });

    test('without user', async () => {
      await getSettingsFromFirebaseThunk(async () => {}, getStateNoUser);
      expect(getDoc).not.toHaveBeenCalled();
    });

    test('document doesn\'t exist', async () => {
      const docRef = '345';
      doc.mockReturnValueOnce(docRef);
      getDoc.mockResolvedValueOnce({ exists: false });
      const dispatch = createMockDispatcher(getState);

      await getSettingsFromFirebaseThunk(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({ type: FIREBASE_SYNCED });
    });
  });

  test('resetSettings', async () => {
    const resetSettingsThunk = resetSettings();
    const dispatch = createMockDispatcher(getState);

    await resetSettingsThunk(dispatch);

    jest.runAllTimers();
    await flushPromises();

    expect(dispatch).toHaveBeenCalledWith({ type: RESET_SETTINGS });
    expect(dispatch).toHaveBeenCalledWith({ type: FIREBASE_SYNCED });
  });

  test('updateSetting', async () => {
    const updateSettingThunk = updateSetting('jonHamm', true);
    const dispatch = createMockDispatcher(getState);

    await updateSettingThunk(dispatch);

    jest.runAllTimers();
    await flushPromises();

    expect(dispatch).toHaveBeenCalledWith({ type: UPDATE_SETTING, payload: { key: 'jonHamm', value: true } });
    expect(dispatch).toHaveBeenCalledWith({ type: FIREBASE_SYNCED });
  });

  test('resetFilters', async () => {
    const resetFiltersThunk = resetFilters();
    const dispatch = createMockDispatcher(getState);

    await resetFiltersThunk(dispatch);

    jest.runAllTimers();
    await flushPromises();

    expect(dispatch).toHaveBeenCalledWith({ type: RESET_FILTERS });
    expect(dispatch).toHaveBeenCalledWith({ type: FIREBASE_SYNCED });
  });

  test('updateFilters', async () => {
    const updateFiltersThunk = updateFilters({ road: true });
    const dispatch = createMockDispatcher(getState);

    await updateFiltersThunk(dispatch);

    jest.runAllTimers();
    await flushPromises();

    expect(dispatch).toHaveBeenCalledWith({ type: UPDATE_FILTERS, payload: { filters: { road: true } } });
    expect(dispatch).toHaveBeenCalledWith({ type: FIREBASE_SYNCED });
  });
});
