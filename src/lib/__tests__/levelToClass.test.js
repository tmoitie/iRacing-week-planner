import { describe, test } from '@jest/globals';

import levelToClass, { levelToClassNumber } from '../levelToClass';

describe('lib/levelToClass', () => {
  test('levelToClass', () => {
    expect(levelToClass(8, false)).toBe('D');
    expect(levelToClass(8, true)).toBe('C');
    expect(levelToClass(14, false)).toBe('B');
    expect(levelToClass(14, true)).toBe('B');
  });

  test('levelToClassNumber', () => {
    expect(levelToClassNumber(8.5)).toBe(2);
    expect(levelToClassNumber(15.5)).toBe(3);
  });
});
