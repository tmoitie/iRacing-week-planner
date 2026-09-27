import { describe, test } from '@jest/globals';
import { clientGet } from '../iracingClient';
import getTracks from '../getTracks';

jest.mock('../iracingClient');

describe('getTracks', () => {
  test('prefers a non-retired track when configurations share a package', async () => {
    clientGet
      .mockResolvedValueOnce({
        data: [
          {
            track_id: 18,
            package_id: 11,
            track_name: '[Retired] Road America',
            retired: true,
            priority: 1,
            free_with_subscription: false,
            category: 'road',
            price: 14.95,
          },
          {
            track_id: 596,
            package_id: 11,
            track_name: 'Road America',
            retired: false,
            priority: 2,
            free_with_subscription: false,
            category: 'road',
            price: 14.95,
          },
        ],
      })
      .mockResolvedValueOnce({ data: {} });

    await expect(getTracks()).resolves.toEqual([
      expect.objectContaining({
        id: 596,
        ids: [18, 596],
        name: 'Road America',
        pkgid: 11,
      }),
    ]);
  });
});
