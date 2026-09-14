import series from '../data/season.json';
import tracks from '../data/tracks.json';
import moment from 'moment';
import { seasonStart } from '../config';

export default function calulatePurchaseOptimization({
  ownedTracks, favouriteSeries, ignorePastWeeks = false,
}) {
  const currentSeries = favouriteSeries.length === 0
    ? series
    : series.filter((seriesToFilter) => favouriteSeries.includes(seriesToFilter.seriesid));

  const plannedSeries = ignorePastWeeks
    ? currentSeries.map((seriesToFilter) => ({
      ...seriesToFilter,
      tracks: seriesToFilter.tracks.filter((track) => (
        moment().utc().isBefore(seasonStart.clone().add(track.raceweek + 1, 'weeks'))
      )),
    })).filter((seriesToFilter) => seriesToFilter.tracks.length > 0)
    : currentSeries;

  const allTrackPkgIds = plannedSeries
    .flatMap((seriesToFilter) => seriesToFilter.tracks.map((track) => track.pkgid))
    .filter((pkgId) => !ownedTracks.includes(pkgId));

  const countById = Object.values(allTrackPkgIds.reduce((resultMap, trackPkgId) => {
    const originalTrack = tracks.find((track) => track.pkgid === trackPkgId);
    const filteredSeries = plannedSeries
      .filter(
        (seriesToFilter) => seriesToFilter.tracks.filter((seriesTrack) => seriesTrack.pkgid === trackPkgId).length > 0,
      );

    // Annotate each series noting the week we're racing the target track
    const fromSeries = filteredSeries.map(
      (seriesToFilter) => ({
        seriesname: seriesToFilter.seriesname,
        racedOnWeek: seriesToFilter.tracks.find((seriesTrack) => seriesTrack.pkgid === trackPkgId).raceweek,
      }),
    );

    return {
      ...resultMap,
      [trackPkgId]: {
        track: resultMap[trackPkgId] ? resultMap[trackPkgId].track : originalTrack,
        series: resultMap[trackPkgId] ? resultMap[trackPkgId].series : fromSeries,
        count: resultMap[trackPkgId] ? resultMap[trackPkgId].count + 1 : 1,
      },
    };
  }, {}));

  return countById
    .filter((item) => item.count >= 1)
    .sort((a, b) => b.count - a.count);
}
