import series from '../data/season.json';
import tracks from '../data/tracks.json';

export default function calulatePurchaseOptimization({
  ownedTracks, favouriteSeries,
}) {
  const currentSeries = favouriteSeries.length === 0
    ? series
    : series.filter((seriesToFilter) => favouriteSeries.includes(seriesToFilter.seriesid));

  const allTrackPkgIds = currentSeries
    .flatMap((seriesToFilter) => seriesToFilter.tracks.map((track) => track.pkgid))
    .filter((pkgId) => !ownedTracks.includes(pkgId));

  const countById = Object.values(allTrackPkgIds.reduce((resultMap, trackPkgId) => {
    const originalTrack = tracks.find((track) => track.pkgid === trackPkgId);
    const filteredSeries = currentSeries
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
        count: resultMap[trackPkgId] ? resultMap[trackPkgId].count + 1 : 0,
      },
    };
  }, {}));

  return countById
    .filter((item) => item.count >= 1)
    .sort((a, b) => b.count - a.count);
}
