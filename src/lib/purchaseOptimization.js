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

  const trackAppearances = plannedSeries
    .flatMap((seriesToFilter) => seriesToFilter.tracks.map((track) => ({
      ...track,
      seriesname: seriesToFilter.seriesname,
    })))
    .filter((track) => !ownedTracks.includes(track.pkgid));

  const countById = Object.values(trackAppearances.reduce((resultMap, track) => {
    const existingItem = resultMap[track.pkgid];

    return {
      ...resultMap,
      [track.pkgid]: {
        track: existingItem ? existingItem.track : tracks.find((item) => item.pkgid === track.pkgid),
        series: [
          ...(existingItem ? existingItem.series : []),
          { seriesname: track.seriesname, racedOnWeek: track.raceweek },
        ],
        count: existingItem ? existingItem.count + 1 : 1,
      },
    };
  }, {}));

  return countById
    .filter((item) => item.count >= 1)
    .sort((a, b) => b.count - a.count);
}
