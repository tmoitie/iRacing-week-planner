import { describe, test } from '@jest/globals';

import toggleIdInCollection from '../toggleIdInCollection';

describe('lib/toggleIdInCollection', () => {
  test('add new item', () => {
    expect(toggleIdInCollection([17], 15, true)).toEqual([17, 15]);
  });

  test('remove old item', () => {
    expect(toggleIdInCollection([15, 16], 15, false)).toEqual([16]);
  });

  test('add same item', () => {
    expect(toggleIdInCollection([15, 16], 15, true)).toEqual([15, 16]);
  });

  test('remove unseen item', () => {
    expect(toggleIdInCollection([15, 16], 14, false)).toEqual([15, 16]);
  });
});
