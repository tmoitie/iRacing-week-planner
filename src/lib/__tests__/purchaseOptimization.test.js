import { afterEach, describe, test } from '@jest/globals';
import MockDate from 'mockdate';
import purchaseOptimization from '../purchaseOptimization';

describe('purchaseOptimization', () => {
  afterEach(() => {
    MockDate.reset();
  });

  test('excludes track appearances after their race weeks have ended', () => {
    MockDate.set('2027-01-01T00:00:00Z');

    expect(purchaseOptimization({
      ownedTracks: [],
      favouriteSeries: [],
      ignorePastWeeks: true,
    })).toEqual([]);

    expect(purchaseOptimization({
      ownedTracks: [],
      favouriteSeries: [],
      ignorePastWeeks: false,
    })).not.toEqual([]);
  });
});
