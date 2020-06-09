import series from '../data/season.json';
import tracks from '../data/tracks.json';

export default function ({
  ownedTracks, favouriteSeries,
}) {
  const currentSeries = favouriteSeries.length === 0
    ? series
    : series.filter((series) => favouriteSeries.includes(series.seriesid));

  const allTrackPkgIds = currentSeries
    .flatMap((series) => series.tracks.map((track) => track.pkgid))
    .filter((pkgId) => !ownedTracks.includes(pkgId));

  const countById = Object.values(allTrackPkgIds.reduce((resultMap, trackPkgId) => {
    const originalTrack = tracks.find((track) => track.pkgid === trackPkgId);
    const filteredSeries = currentSeries
      .filter((series) => series.tracks.filter((seriesTrack) => seriesTrack.pkgid === trackPkgId).length > 0);

    // Annotate each series noting the week we're racing the target track
    const fromSeries = filteredSeries.map(
      (series) => ({
        seriesname: series.seriesname,
        racedOnWeek: series.tracks.find((seriesTrack) => seriesTrack.pkgid === trackPkgId).raceweek,
      })
    );

    resultMap[trackPkgId] = resultMap[trackPkgId] || {
      track: originalTrack,
      series: fromSeries,
      count: 0,
    };

    resultMap[trackPkgId].count += 1;

    return resultMap;
  }, {}));

  return countById
    .filter((item) => item.count > 1)
    .sort((a, b) => b.count - a.count);
}
