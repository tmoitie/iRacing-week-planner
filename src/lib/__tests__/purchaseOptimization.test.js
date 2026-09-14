import { afterEach, describe, test } from '@jest/globals';
import MockDate from 'mockdate';
import season from '../../data/season.json';
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

  test('lists every week when a series uses a track more than once', () => {
    const seriesWithRepeatedTrack = season.find((seriesToFilter) => (
      seriesToFilter.tracks.some((track, index) => (
        seriesToFilter.tracks.findIndex((otherTrack) => otherTrack.pkgid === track.pkgid) !== index
      ))
    ));
    const repeatedTrack = seriesWithRepeatedTrack.tracks.find((track, index) => (
      seriesWithRepeatedTrack.tracks.findIndex((otherTrack) => otherTrack.pkgid === track.pkgid) !== index
    ));
    const expectedSeries = seriesWithRepeatedTrack.tracks
      .filter((track) => track.pkgid === repeatedTrack.pkgid)
      .map((track) => ({
        seriesname: seriesWithRepeatedTrack.seriesname,
        racedOnWeek: track.raceweek,
      }));

    const purchaseItem = purchaseOptimization({
      ownedTracks: [],
      favouriteSeries: [seriesWithRepeatedTrack.seriesid],
    }).find((item) => item.track.pkgid === repeatedTrack.pkgid);

    expect(purchaseItem.series).toEqual(expectedSeries);
  });
});
