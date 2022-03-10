import debounce from 'lodash.debounce';

export const getSettingsFromFirebase = jest.fn(() => ({ type: 'SETTINGS/LOAD_SETTINGS_FROM_FIREBASE' }));
export const saveSettingsToFirebase = jest.fn(() => ({ type: 'SETTINGS/FIREBASE_SYNCED' }));

const dispatchSaveSettingsToFirebase = (dispatch) => {
  dispatch(saveSettingsToFirebase());
};

export const debouncedDispatcherSaveSettings = debounce(dispatchSaveSettingsToFirebase, 10000);
