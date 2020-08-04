export const UPDATE_FILTERS = 'SETTINGS/UPDATE_FILTERS';
export const RESET_FILTERS = 'SETTINGS/RESET_FILTERS';
export const RESET_SETTINGS = 'SETTINGS/RESET_SETTINGS';
export const UPDATE_SETTING = 'SETTINGS/UPDATE_SETTING';

export function updateFilters(newFilters) {
  return { type: UPDATE_FILTERS, filters: newFilters };
}

export function resetFilters() {
  return { type: RESET_FILTERS };
}

export function resetSettings() {
  return { type: RESET_SETTINGS };
}

export function updateSetting(key, value) {
  return { type: UPDATE_SETTING, key, value };
}
