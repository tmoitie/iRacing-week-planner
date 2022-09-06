import { describe, test } from '@jest/globals';
import MockDate from 'mockdate';

import moment from 'moment';
import appReducer from '../app';
import { changeModal, updateDays } from '../../actions/app';
import { SIGNED_IN } from '../../actions/auth';

describe('reducers/app', () => {
  beforeEach(() => {
    MockDate.set('2022-09-07T13:30:00.000Z');
  });

  test('set up default state', () => {
    const state = appReducer(undefined, {});
    expect(state.date.isSame(moment('2022-09-07T00:00:00.000Z'))).toBe(true);
    expect(state.daysSinceSeasonStart).toBe(1);
    expect(state.week).toBe(1);
    expect(state.currentModal).toBe(null);
  });

  test('APP/UPDATE_DAYS', () => {
    const state = appReducer(undefined, updateDays(10));
    expect(state.date.isSame(moment('2022-09-16T00:00:00.000Z'))).toBe(true);
    expect(state.daysSinceSeasonStart).toBe(10);
    expect(state.week).toBe(2);
  });

  test('APP/CHANGE_MODAL', () => {
    const state = appReducer(undefined, changeModal('CarModal'));
    expect(state.currentModal).toBe('CarModal');
  });

  test('AUTH/SIGNED_IN', () => {
    const state1 = appReducer(undefined, changeModal('CarModal'));
    const state2 = appReducer(state1, { type: SIGNED_IN });
    expect(state2.currentModal).toBe(null);
  });
});
