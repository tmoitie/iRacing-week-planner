export const UPDATE_DAYS = 'APP/UPDATE_DAYS';
export const CHANGE_MODAL = 'APP/CHANGE_MODAL';

export function updateDays(days) {
  return { type: UPDATE_DAYS, days };
}

export function changeModal(modalName) {
  return { type: CHANGE_MODAL, modalName };
}
