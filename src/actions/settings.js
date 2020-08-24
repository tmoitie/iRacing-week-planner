export const UPDATE_FILTERS = 'SETTINGS/UPDATE_FILTERS';
export const RESET_FILTERS = 'SETTINGS/RESET_FILTERS';
export const RESET_SETTINGS = 'SETTINGS/RESET_SETTINGS';
export const UPDATE_SETTING = 'SETTINGS/UPDATE_SETTING';
export const LOAD_SETTINGS_FROM_FIREBASE = 'SETTINGS/LOAD_SETTINGS_FROM_FIREBASE';

export function updateFilters(newFilters) {
  return async (dispatch) => {
    await dispatch({ type: UPDATE_FILTERS, payload: { filters: newFilters } });
    dispatch(saveSettingsToFirebase());
  };
}

export function resetFilters() {
  return async (dispatch) => {
    await dispatch({ type: RESET_FILTERS });
    dispatch(saveSettingsToFirebase());
  };
}

export function resetSettings() {
  return async (dispatch) => {
    await dispatch({ type: RESET_SETTINGS });
    dispatch(saveSettingsToFirebase());
  };
}

export function updateSetting(key, value) {
  return async (dispatch) => {
    await dispatch({ type: UPDATE_SETTING, payload: { key, value } });
    dispatch(saveSettingsToFirebase());
  };
}

export function getSettingsFromFirebase() {
  return async (dispatch, getState) => {
    const { user, firebaseApp } = getState().auth;
    if (!user) {
      return;
    }

    const db = firebaseApp.firestore();
    const docRef = db.collection('settings').doc(user.uid);
    const doc = await docRef.get();

    if (!doc.exists) {
      dispatch(saveSettingsToFirebase());
      return;
    }

    dispatch({ type: LOAD_SETTINGS_FROM_FIREBASE, payload: doc.data() });
  };
}

export function saveSettingsToFirebase() {
  return async (dispatch, getState) => {
    const { user, firebaseApp } = getState().auth;
    const { settings } = getState();

    if (!user) {
      return;
    }

    const db = firebaseApp.firestore();
    const docRef = db.collection('settings').doc(user.uid);
    await docRef.set(settings);
  };
}
